// ===== FIREBASE BLOG ENGAGEMENT =====
// Handles likes, dislikes, and comments with manual moderation

// ── Firebase Config ──────────────────────────────────────────
// Replace these values with your own from Firebase Console
// (Project Settings → Your Apps → Firebase SDK snippet)
const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyAozsRXTtidH65UhWv2bqFk3J2fZ2iOtsw",
    authDomain:        "netapp-hub.firebaseapp.com",
    projectId:         "netapp-hub",
    storageBucket:     "netapp-hub.firebasestorage.app",
    messagingSenderId: "599153057916",
    appId:             "1:599153057916:web:b9030d0a2d5d2563a1a9f9"
  };
  
  // ── Post ID ───────────────────────────────────────────────────
  // Derived from the filename so every post has a unique ID
  // e.g. "20241215-snapmirror-failover"
  const POST_ID = window.location.pathname
    .split('/').pop()
    .replace('.html', '');
  
  // ── Rate limiting (localStorage) ─────────────────────────────
  const VOTE_KEY   = `vote_${POST_ID}`;
  const COMMENT_KEY = `commented_${POST_ID}`;
  
  // ── Init Firebase ─────────────────────────────────────────────
  import { initializeApp }                          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, doc, getDoc, setDoc,
           updateDoc, increment, collection,
           addDoc, query, where, orderBy,
           getDocs, serverTimestamp }               from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
  
  const app = initializeApp(FIREBASE_CONFIG);
  const db  = getFirestore(app);
  
  // ── References ────────────────────────────────────────────────
  const postRef     = doc(db, "posts", POST_ID);
  const commentsRef = collection(db, "posts", POST_ID, "comments");
  
  // ─────────────────────────────────────────────────────────────
  // LIKES / DISLIKES
  // ─────────────────────────────────────────────────────────────
  async function loadVotes() {
    try {
      const snap = await getDoc(postRef);
      const data = snap.exists() ? snap.data() : { likes: 0, dislikes: 0 };
      document.getElementById('likeCount').textContent    = data.likes    || 0;
      document.getElementById('dislikeCount').textContent = data.dislikes || 0;
    } catch (e) {
      console.error("Failed to load votes:", e);
    }
  }
  
  async function vote(type) {
    const existing = localStorage.getItem(VOTE_KEY);
  
    if (existing === type) {
      showToast("You've already voted on this post.");
      return;
    }
  
    // If switching vote, undo previous
    const update = { [type]: increment(1) };
    if (existing) update[existing] = increment(-1);
  
    try {
      const snap = await getDoc(postRef);
      if (snap.exists()) {
        await updateDoc(postRef, update);
      } else {
        await setDoc(postRef, { likes: 0, dislikes: 0, ...{ [type]: 1 } });
      }
  
      localStorage.setItem(VOTE_KEY, type);
      loadVotes();
  
      // Update button states
      document.getElementById('likeBtn').classList.toggle('voted',    type === 'likes');
      document.getElementById('dislikeBtn').classList.toggle('voted', type === 'dislikes');
      showToast(type === 'likes' ? '👍 Thanks for the like!' : '👎 Feedback noted.');
    } catch (e) {
      console.error("Vote failed:", e);
      showToast("Something went wrong. Try again.");
    }
  }
  
  function updateVoteButtons() {
    const existing = localStorage.getItem(VOTE_KEY);
    if (existing) {
      document.getElementById('likeBtn').classList.toggle('voted',    existing === 'likes');
      document.getElementById('dislikeBtn').classList.toggle('voted', existing === 'dislikes');
    }
  }
  
  // ─────────────────────────────────────────────────────────────
  // COMMENTS
  // ─────────────────────────────────────────────────────────────
  async function loadComments() {
    const container = document.getElementById('commentsList');
    container.innerHTML = '<p class="comments-loading">Loading comments...</p>';
  
    try {
      const q    = query(commentsRef, where("approved", "==", true), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
  
      if (snap.empty) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first!</p>';
        return;
      }
  
      container.innerHTML = '';
      snap.forEach(docSnap => {
        const c   = docSnap.data();
        const div = document.createElement('div');
        div.className = 'comment-item';
  
        const date = c.createdAt?.toDate
          ? c.createdAt.toDate().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
          : 'Just now';
  
        div.innerHTML = `
          <div class="comment-header">
            <span class="comment-author">${escapeHtml(c.name)}</span>
            <span class="comment-date">${date}</span>
          </div>
          <p class="comment-body">${escapeHtml(c.comment)}</p>
        `;
        container.appendChild(div);
      });
    } catch (e) {
      console.error("Failed to load comments:", e);
      container.innerHTML = '<p class="no-comments">Could not load comments.</p>';
    }
  }
  
  async function submitComment(e) {
    e.preventDefault();
  
    const name    = document.getElementById('commentName').value.trim();
    const comment = document.getElementById('commentText').value.trim();
    const submitBtn = document.getElementById('commentSubmitBtn');
  
    if (!name || !comment) return;
  
    // Basic rate limit — 1 comment per session per post
    if (localStorage.getItem(COMMENT_KEY)) {
      showToast("You've already commented on this post.");
      return;
    }
  
    // Spam guard — reject very short or URL-heavy comments
    const urlCount = (comment.match(/https?:\/\//g) || []).length;
    if (comment.length < 10 || urlCount > 2) {
      showToast("Comment looks like spam. Please write something meaningful.");
      return;
    }
  
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Submitting...';
  
    try {
      await addDoc(commentsRef, {
        name,
        comment,
        approved:  false,   // Needs manual approval — won't show until you approve
        createdAt: serverTimestamp(),
        postId:    POST_ID
      });
  
      localStorage.setItem(COMMENT_KEY, 'true');
      document.getElementById('commentForm').reset();
      showToast("✅ Comment submitted! It'll appear after review.");
    } catch (err) {
      console.error("Comment submit failed:", err);
      showToast("Failed to submit. Please try again.");
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Post Comment';
    }
  }
  
  // ─────────────────────────────────────────────────────────────
  // UTILS
  // ─────────────────────────────────────────────────────────────
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  
  function showToast(msg) {
    const existing = document.querySelector('.engagement-toast');
    if (existing) existing.remove();
  
    const toast = document.createElement('div');
    toast.className   = 'engagement-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  
  // ─────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    loadVotes();
    loadComments();
    updateVoteButtons();
  
    document.getElementById('likeBtn')?.addEventListener('click',    () => vote('likes'));
    document.getElementById('dislikeBtn')?.addEventListener('click', () => vote('dislikes'));
    document.getElementById('commentForm')?.addEventListener('submit', submitComment);
  });