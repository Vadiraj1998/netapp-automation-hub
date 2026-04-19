import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  doc, getDoc, setDoc, updateDoc, increment,
  collection, addDoc, query, where, orderBy, getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import SEO from '../components/SEO'

// ── Firebase singleton ────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyAozsRXTtidH65UhWv2bqFk3J2fZ2iOtsw',
  authDomain:        'netapp-hub.firebaseapp.com',
  projectId:         'netapp-hub',
  storageBucket:     'netapp-hub.firebasestorage.app',
  messagingSenderId: '599153057916',
  appId:             '1:599153057916:web:b9030d0a2d5d2563a1a9f9',
}
const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)
const db  = getFirestore(app)

// ── Syntax highlighter ────────────────────────────────────────
const TOKENS = [
  { re: /(`[^`]*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,  color: '#f1fa8c' },
  { re: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g,           color: '#6272a4' },
  { re: /\b(import|from|as|with|for|while|if|elif|else|try|except|catch|finally|return|in|not|and|or|is|None|True|False|pass|def|class|raise|yield|lambda|global|nonlocal|del|assert|break|continue)\b/g, color: '#ff79c6' },
  { re: /\b([A-Z][A-Za-z0-9]+)\b/g,                         color: '#ffb86c' },
  { re: /(\$[\w]+)/g,                                        color: '#8be9fd' },
  { re: /\b(print|len|range|list|dict|set|str|int|float|bool|open|type|zip|map|filter|sorted|enumerate|sum|min|max|abs|round)\b(?=\s*\()/g, color: '#50fa7b' },
  { re: /\b(\d+(?:\.\d+)?)\b/g,                             color: '#bd93f9' },
]

function escHtml(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function highlight(code) {
  const len    = code.length
  const colors = new Array(len).fill(null)
  for (const { re, color } of TOKENS) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(code)) !== null) {
      const s = m.index, e = s + m[0].length
      if (colors[s] === null) for (let i = s; i < e; i++) colors[i] = color
    }
  }
  const spans = []
  let i = 0
  while (i < len) {
    const col = colors[i]
    let j = i + 1
    while (j < len && colors[j] === col) j++
    const chunk = escHtml(code.slice(i, j))
    spans.push(col ? `<span style="color:${col}">${chunk}</span>` : chunk)
    i = j
  }
  return spans.join('')
}

function processPostHtml(raw) {
  const parser  = new DOMParser()
  const doc     = parser.parseFromString(raw, 'text/html')
  const article = doc.querySelector('article.post-content')
  if (!article) return '<p>Could not parse post content.</p>'

  article.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || ''
    img.setAttribute('src', src.replace(/\.\.\//g, '/'))
    img.style.maxWidth = '100%'
    img.style.height   = 'auto'
  })

  article.querySelectorAll('.code-block').forEach(block => {
    const codeEl = block.querySelector('pre code')
    if (!codeEl) return
    const rawText = codeEl.textContent || ''
    codeEl.innerHTML = highlight(rawText)
    const btn = block.querySelector('.copy-btn')
    if (btn) {
      btn.removeAttribute('onclick')
      btn.setAttribute('data-copy', rawText)
      btn.textContent = 'Copy'
    }
  })

  return article.innerHTML
}

// ── Toast ─────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 999,
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '12px 20px',
      fontFamily: 'var(--font-mono)', fontSize: 13,
      color: 'var(--text-bright)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    }}>
      {msg}
    </div>
  )
}

// ── Article renderer ──────────────────────────────────────────
function PostArticle({ html }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('button[data-copy]').forEach(btn => {
      const fresh = btn.cloneNode(true)
      fresh.addEventListener('click', () => {
        const text = fresh.getAttribute('data-copy') || ''
        navigator.clipboard.writeText(text).then(() => {
          const orig = fresh.textContent
          fresh.textContent = '✓ Copied'
          setTimeout(() => { fresh.textContent = orig }, 1800)
        }).catch(() => {})
      })
      btn.parentNode.replaceChild(fresh, btn)
    })
  }, [html])

  return (
    <article
      ref={ref}
      className="post-content"
      style={{ maxWidth: '100%', overflowX: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// ── Vote bar ──────────────────────────────────────────────────
function VoteBar({ postId }) {
  const [likes, setLikes]       = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [voted, setVoted]       = useState(null)
  const [toast, setToast]       = useState('')

  const refreshCounts = useCallback(async () => {
    const postRef = doc(db, 'posts', postId)
    const snap = await getDoc(postRef)
    if (snap.exists()) {
      setLikes(snap.data().likes || 0)
      setDislikes(snap.data().dislikes || 0)
    }
  }, [postId])

  useEffect(() => {
    refreshCounts()
    const v = localStorage.getItem(`vote_${postId}`)
    if (v) setVoted(v)
  }, [postId, refreshCounts])

  const handleVote = async (type) => {
    if (voted === type) { setToast("You've already voted on this post."); return }
    const postRef = doc(db, 'posts', postId)
    const update  = { [type]: increment(1) }
    if (voted) update[voted] = increment(-1)
    try {
      const snap = await getDoc(postRef)
      snap.exists()
        ? await updateDoc(postRef, update)
        : await setDoc(postRef, { likes: 0, dislikes: 0, [type]: 1 })
      localStorage.setItem(`vote_${postId}`, type)
      setVoted(type)
      await refreshCounts()
      setToast(type === 'likes' ? '👍 Thanks for the like!' : '👎 Feedback noted.')
    } catch { setToast('Something went wrong. Try again.') }
  }

  const btnStyle = (type, color) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
    border: `1px solid ${voted === type ? color : 'var(--border)'}`,
    background: voted === type ? `${color}20` : 'transparent',
    color: voted === type ? color : 'var(--text-dim)',
    transition: 'all 0.15s',
  })

  return (
    <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--text-dim)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          Was this helpful?
        </span>
        <button onClick={() => handleVote('likes')}    style={btnStyle('likes',    '#3dc8a0')}>👍 {likes}</button>
        <button onClick={() => handleVote('dislikes')} style={btnStyle('dislikes', '#ff6b6b')}>👎 {dislikes}</button>
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  )
}

// ── Comments ──────────────────────────────────────────────────
function CommentsSection({ postId }) {
  const [comments, setComments]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [name, setName]             = useState('')
  const [text, setText]             = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast]           = useState('')

  const loadComments = useCallback(async () => {
    setLoading(true)
    try {
      const commentsRef = collection(db, 'posts', postId, 'comments')
      const q    = query(commentsRef, where('approved', '==', true), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const list = []
      snap.forEach(d => {
        const c    = d.data()
        const date = c.createdAt?.toDate
          ? c.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : 'Just now'
        list.push({ id: d.id, ...c, date })
      })
      setComments(list)
    } catch { setComments([]) }
    finally { setLoading(false) }
  }, [postId])

  useEffect(() => { loadComments() }, [loadComments])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimName = name.trim(), trimText = text.trim()
    if (!trimName || !trimText) return
    if (localStorage.getItem(`commented_${postId}`)) { setToast("You've already commented on this post."); return }
    const urlCount = (trimText.match(/https?:\/\//g) || []).length
    if (trimText.length < 10 || urlCount > 2) { setToast('Comment looks like spam.'); return }
    setSubmitting(true)
    try {
      const commentsRef = collection(db, 'posts', postId, 'comments')
      await addDoc(commentsRef, {
        name: trimName, comment: trimText,
        approved: false, createdAt: serverTimestamp(), postId,
      })
      localStorage.setItem(`commented_${postId}`, 'true')
      setName(''); setText('')
      setToast("✅ Comment submitted! It'll appear after review.")
    } catch { setToast('Failed to submit. Please try again.') }
    finally { setSubmitting(false) }
  }

  const inputStyle = {
    width: '100%', background: 'var(--bg)',
    border: '1px solid var(--border)', borderRadius: 6,
    padding: '10px 14px', color: 'var(--text-bright)',
    fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none',
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
        💬 Comments
      </h3>

      {loading ? (
        <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>Loading comments…</p>
      ) : comments.length === 0 ? (
        <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 28 }}>No comments yet. Be the first!</p>
      ) : (
        <div style={{ marginBottom: 28 }}>
          {comments.map(c => (
            <div key={c.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 6 }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-py)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{c.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{c.date}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 24 }}>
        <h4 style={{ fontSize: 14, color: 'var(--text-bright)', marginBottom: 14 }}>Leave a Comment</h4>
        <div style={{ marginBottom: 10 }}>
          <input type="text" placeholder="Your name or handle" value={name} onChange={e => setName(e.target.value)} maxLength={60} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <textarea placeholder="Share your thoughts, questions, or suggestions..." value={text} onChange={e => setText(e.target.value)} rows={4} maxLength={1000} required style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>💬 Comments are reviewed before appearing.</span>
          <button type="submit" disabled={submitting} className="btn btn-primary" style={{ opacity: submitting ? 0.6 : 1 }}>
            {submitting ? 'Submitting…' : 'Post Comment'}
          </button>
        </div>
      </form>

      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  )
}

// ── Main BlogPost ─────────────────────────────────────────────
export default function BlogPost() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const [post, setPost]     = useState(null)
  const [html, setHtml]     = useState('')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!slug) return
    fetch('/assets/data/posts-index.json')
      .then(r => r.json())
      .then(data => {
        const match = data.posts.find(p =>
          p.file.replace('posts/', '').replace('.html', '') === slug
        )
        if (!match) { setStatus('notfound'); return }
        setPost(match)
        return fetch(`/${match.file}`)
      })
      .then(r => { if (!r?.ok) { setStatus('error'); return } return r.text() })
      .then(raw => {
        if (!raw) return
        setHtml(processPostHtml(raw))
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [slug])

  if (status === 'loading') return (
    <main className="main-content">
      <p style={{ padding: 48, color: 'var(--text-dim)' }}>Loading…</p>
    </main>
  )

  if (status === 'notfound' || status === 'error') return (
    <main className="main-content">
      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <p style={{ color: 'var(--accent-tips)', fontSize: 18, marginBottom: 16 }}>
          {status === 'notfound' ? 'Post not found.' : 'Failed to load post.'}
        </p>
        <Link to="/blog" className="btn btn-secondary">← Back to Blog</Link>
      </div>
    </main>
  )

  const tags          = Array.isArray(post?.tags) ? post.tags : (post?.tags || '').split(',').map(t => t.trim())
  const [y, m, d]     = (post?.date || '').split('-').map(Number)
  const formattedDate = post?.date
    ? new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <main className="main-content">
      <SEO
        title={`${post.title} | NetApp Hub`}
        description={post.excerpt}
        canonical={`/blog/${slug}`}
        ogTitle={post.title}
        ogDescription={post.excerpt}
        ogType="article"
        keywords={tags.join(', ')}
      />

      <div style={{ marginBottom: 24 }}>
        <button onClick={() => navigate('/blog')} className="post-back-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          ← Back to Blog
        </button>
      </div>

      <header className="post-header">
        <div className="post-meta-top">
          {tags.map(tag => <span className="blog-tag" key={tag}>{tag}</span>)}
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="blog-author">{post.author}</span>
          <span className="blog-dot">•</span>
          <span className="blog-date">{formattedDate}</span>
        </div>
      </header>

      {post.image && (
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: 8, marginBottom: 32, boxSizing: 'border-box' }}>
          <img
            src={`/assets/images/blog/${post.image}`}
            alt={post.title}
            onError={e => { e.target.style.display = 'none' }}
            style={{ display: 'block', width: '100%', maxWidth: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', objectPosition: 'center top', borderRadius: 8 }}
          />
        </div>
      )}

      <PostArticle html={html} />
      <VoteBar postId={slug} />
      <CommentsSection postId={slug} />

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <Link to="/blog" className="btn btn-secondary">← All Articles</Link>
      </div>
    </main>
  )
}