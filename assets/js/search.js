// ===== LOAD COMMANDS FROM JSON =====
let commandsData = [];

function getCommandsDataSync() {
  if (window.COMMANDS_DATA && Array.isArray(window.COMMANDS_DATA.commands)) {
    return window.COMMANDS_DATA;
  }
  throw new Error("COMMANDS_DATA not loaded");
}

async function getCommandsData() {
  try {
    const response = await fetch('assets/data/commands.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('Fetch failed for commands.json, using inline fallback:', error);

    const inline = document.getElementById('commandsDataInline');
    if (!inline) {
      throw new Error('Inline commands fallback not found');
    }

    return JSON.parse(inline.textContent);
  }
}

async function loadCommandsData() {
  try {
    const data = getCommandsDataSync();

    commandsData = data.commands.sort((a, b) => {
      if (a.name !== b.name) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

    populateTable(commandsData);
    updateResultCount(commandsData.length);
  } catch (error) {
    console.error('Failed to load commands:', error);
    const tbody = document.getElementById('cmdTableBody');
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Failed to load commands. Check console.</td></tr>';
    }
  }
}

function populateTable(commands) {
  const tbody = document.getElementById('cmdTableBody');
  if (!tbody) return;
  
  // Group commands by category
  const groupedByCategory = {};
  commands.forEach(cmd => {
    if (!groupedByCategory[cmd.category]) {
      groupedByCategory[cmd.category] = [];
    }
    groupedByCategory[cmd.category].push(cmd);
  });
  
  // Sort each category's commands by name
  Object.keys(groupedByCategory).forEach(cat => {
    groupedByCategory[cat].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  // Build HTML
  let html = '';
  Object.keys(groupedByCategory).sort().forEach(category => {
    const categoryCommands = groupedByCategory[category];
    
    categoryCommands.forEach((cmd) => {
      html += `
    <tr data-cat="${cmd.category}">
      <td>
        <span class="category-badge tag-${cmd.category}">${cmd.tag}</span>
      </td>
      <td>
        <div class="cmd-cell">
          <code>${cmd.name}</code>
          <button class="copy-btn" onclick="copyToClipboard('${cmd.name.replace(/'/g, "\\'")}')">📋</button>
        </div>
      </td>
      <td>${cmd.description}</td>
      <td>
        <div class="example-cell">
          <code>${cmd.example.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
          <button class="copy-btn" onclick="copyToClipboard('${cmd.example.replace(/'/g, "\\'")}')">📋</button>
        </div>
      </td>
    </tr>
      `;
    });
  });
  
  tbody.innerHTML = html;
  updateResultCount(commands.length);
  loadFavoriteStars();
}

function updateResultCount(total) {
  const resultCount = document.getElementById('resultCount');
  if (resultCount) {
    resultCount.textContent = `${total} command${total !== 1 ? 's' : ''}`;
  }
}

// ===== SITE-WIDE SEARCH INDEX =====
let SEARCH_INDEX = [
  // Python page
  { title: "Installation & Setup", page: "python.html", anchorId: "installation-setup", section: "Python Automation", snippet: "Install the official NetApp ONTAP Python client library and dependencies." },
  { title: "Connect to ONTAP", page: "python.html", anchorId: "connect-to-ontap", section: "Python Automation", snippet: "Using netapp-ontap Python library to establish a connection to ONTAP cluster." },
  { title: "Volume Operations", page: "python.html", anchorId: "volume-operations", section: "Python Automation", snippet: "Create, list, and manage volumes using Python." },
  { title: "Snapshot Management", page: "python.html", anchorId: "snapshot-management", section: "Python Automation", snippet: "Create, list, and delete snapshots programmatically using Python." },
  { title: "Direct REST API", page: "python.html", anchorId: "direct-rest-api", section: "Python Automation", snippet: "Use Python requests library to make raw ONTAP REST API calls." },
  { title: "Aggregate Capacity Report", page: "python.html", anchorId: "aggregate-capacity-report", section: "Python Automation", snippet: "Fetch aggregate capacity and usage stats via REST API." },

  // PowerShell page
  { title: "Install NetApp PowerShell Toolkit", page: "powershell.html", anchorId: "install-netapp-powershell-toolkit", section: "PowerShell Automation", snippet: "Install and configure the NetApp PowerShell Toolkit (PSTK)." },
  { title: "Connect to ONTAP Cluster", page: "powershell.html", anchorId: "connect-to-ontap-cluster", section: "PowerShell Automation", snippet: "Use Connect-NcController to establish a PSTK session to the cluster." },
  { title: "Volume Operations", page: "powershell.html", anchorId: "volume-operations", section: "PowerShell Automation", snippet: "Create and manage volumes using PowerShell cmdlets." },
  { title: "Snapshot Management", page: "powershell.html", anchorId: "snapshot-management", section: "PowerShell Automation", snippet: "Create and manage snapshots with New-NcSnapshot and Remove-NcSnapshot." },
  { title: "Invoke-RestMethod Direct API", page: "powershell.html", anchorId: "invoke-restmethod-direct-api", section: "PowerShell Automation", snippet: "Call ONTAP REST endpoints directly from PowerShell without PSTK." },
  { title: "Error Handling", page: "powershell.html", anchorId: "error-handling", section: "PowerShell Automation", snippet: "Using try/catch blocks with PSTK cmdlets and REST calls." },

  // Commands page
  { title: "Commands Reference", page: "commands.html", anchorId: "commands-reference", section: "Commands Reference", snippet: "Complete reference of ONTAP CLI commands organized by category." },

  // Tips page
  { title: "ONTAP CLI Tips", page: "tips.html", anchorId: "ontap-cli-tips", section: "Tips & Tricks", snippet: "CLI tips and tricks for working with ONTAP." },
  { title: "REST API Tips", page: "tips.html", anchorId: "rest-api-tips", section: "Tips & Tricks", snippet: "Best practices for working with the ONTAP REST API." },
  { title: "Python-Specific Tips", page: "tips.html", anchorId: "python-specific-tips", section: "Tips & Tricks", snippet: "Tips specific to Python automation with netapp-ontap." },
  { title: "PowerShell-Specific Tips", page: "tips.html", anchorId: "powershell-specific-tips", section: "Tips & Tricks", snippet: "Tips specific to PowerShell and PSTK." },
  { title: "Quick Environment Checklist", page: "tips.html", anchorId: "quick-environment-checklist", section: "Tips & Tricks", snippet: "Verify ONTAP version, library versions, and connectivity." },
];

// ===== LOAD COMMANDS INTO SEARCH INDEX =====
async function loadCommandsIntoSearchIndex() {
  try {
    const data = getCommandsDataSync();

    data.commands.forEach(cmd => {
      SEARCH_INDEX.push({
        title: cmd.name,
        page: "commands.html",
        anchorId: "commands-reference",
        section: `Commands Reference · ${cmd.tag}`,
        snippet: cmd.description
      });
    });
  } catch (error) {
    console.error('Failed to load commands into search index:', error);
  }
}

// Load commands into search index immediately
loadCommandsIntoSearchIndex();

// ===== GLOBAL SEARCH (Sidebar) =====
function liveSearch(query) {
  const searchResults = document.getElementById('searchResults');
  
  // Only proceed if searchResults element exists
  if (!searchResults) return;
  
  if (!query.trim()) {
    searchResults.classList.remove('active');
    return;
  }

  // Search through SEARCH_INDEX
  const results = [];
  const query_lower = query.toLowerCase();
  
  if (SEARCH_INDEX && SEARCH_INDEX.length > 0) {
    SEARCH_INDEX.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(query_lower);
      const snippetMatch = item.snippet.toLowerCase().includes(query_lower);
      const sectionMatch = item.section.toLowerCase().includes(query_lower);
      
      if (titleMatch || snippetMatch || sectionMatch) {
        results.push(item);
      }
    });
  }

  // Display results
  if (results.length > 0) {
    searchResults.innerHTML = results.slice(0, 8).map(r => `
      <div class="search-result-item" onclick="handleSearchClick('${r.anchorId}', '${r.page}')">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-page">${r.page}</div>
        <div class="search-result-snippet">${r.snippet}</div>
      </div>
    `).join('');
    searchResults.classList.add('active');
  } else {
    searchResults.innerHTML = '<div style="padding: 12px 16px; color: var(--text-muted);">No results found</div>';
    searchResults.classList.add('active');
  }
}

// ===== HERO SEARCH (Separate from sidebar) =====
function heroSearch(query) {
  const searchResults = document.querySelector('.hero-search .search-results');
  
  // Only proceed if searchResults element exists
  if (!searchResults) return;
  
  if (!query.trim()) {
    searchResults.classList.remove('active');
    return;
  }

  // Search through SEARCH_INDEX
  const results = [];
  const query_lower = query.toLowerCase();
  
  if (SEARCH_INDEX && SEARCH_INDEX.length > 0) {
    SEARCH_INDEX.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(query_lower);
      const snippetMatch = item.snippet.toLowerCase().includes(query_lower);
      const sectionMatch = item.section.toLowerCase().includes(query_lower);
      
      if (titleMatch || snippetMatch || sectionMatch) {
        results.push(item);
      }
    });
  }

  // Display results ONLY in hero search
  if (results.length > 0) {
    searchResults.innerHTML = results.slice(0, 8).map(r => `
      <div class="search-result-item" onclick="handleSearchClick('${r.anchorId}', '${r.page}')">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-page">${r.page}</div>
        <div class="search-result-snippet">${r.snippet}</div>
      </div>
    `).join('');
    searchResults.classList.add('active');
  } else {
    searchResults.innerHTML = '<div style="padding: 12px 16px; color: var(--text-muted);">No results found</div>';
    searchResults.classList.add('active');
  }
}

// ===== HANDLE SEARCH CLICK =====
function handleSearchClick(sectionId, page) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Close search results
  const sidebarResults = document.getElementById('searchResults');
  if (sidebarResults) sidebarResults.classList.remove('active');
  
  const heroResults = document.querySelector('.hero-search .search-results');
  if (heroResults) heroResults.classList.remove('active');
  
  // Clear search inputs
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) globalSearch.value = '';
  
  const heroSearchInput = document.querySelector('.hero-search input');
  if (heroSearchInput) heroSearchInput.value = '';
  
  // If on different page, navigate to that page with anchor
  if (page && page !== currentPage) {
    window.location.href = `${page}#${sectionId}`;
  } else {
    // Jump to section on current page
    jumpToSection(sectionId);
  }
}

// ===== JUMP TO SECTION =====
function jumpToSection(sectionId) {
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Remove previous highlight
    document.querySelectorAll('.highlight-section').forEach(el => {
      el.classList.remove('highlight-section');
    });
    
    // Add highlight to new element
    element.classList.add('highlight-section');
    
    // Smooth scroll
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Remove highlight after animation
    setTimeout(() => {
      element.classList.remove('highlight-section');
    }, 2000);
    
    // Close search
    const searchResults = document.getElementById('searchResults');
    if (searchResults) searchResults.classList.remove('active');
    
    const heroResults = document.querySelector('.hero-search .search-results');
    if (heroResults) heroResults.classList.remove('active');
  }
}

// ===== CLOSE SEARCH ON CLICK OUTSIDE =====
document.addEventListener('click', (e) => {
  const sidebarSearch = document.querySelector('.sidebar-search');
  if (sidebarSearch && !sidebarSearch.contains(e.target)) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) searchResults.classList.remove('active');
  }
  
  const heroSearch = document.querySelector('.hero-search');
  if (heroSearch && !heroSearch.contains(e.target)) {
    const heroResults = document.querySelector('.hero-search .search-results');
    if (heroResults) heroResults.classList.remove('active');
  }
});

// ===== SCROLL TO ANCHOR =====
function scrollToAnchor(event, anchorId, page) {
  // If navigating to different page, let the link work normally
  if (!window.location.pathname.includes(page)) {
    return;
  }
  
  event.preventDefault();
  
  setTimeout(() => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.classList.add('highlight-section');
      
      setTimeout(() => {
        element.classList.remove('highlight-section');
      }, 3000);
    }
  }, 100);
}

// ===== COMMAND TABLE FILTERING & FAVORITES =====
const FAVORITES_KEY = 'ontap_cmd_favorites';
let activeCategory = null;
let showFavoritesOnly = false;

function setCategory(category, buttonElement) {
  activeCategory = category;
  
  // Update active button styling
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  buttonElement.classList.add('active');
  
  // Re-filter with current search text
  const filterInput = document.getElementById('cmdFilter');
  if (filterInput) {
    filterTable(filterInput.value, category);
  }
}

function filterTable(searchText, category) {
  const rows = document.querySelectorAll('#cmdTableBody tr');
  if (rows.length === 0) return;
  
  const searchLower = searchText.toLowerCase();
  let visibleCount = 0;
  
  rows.forEach(row => {
    const cmdCode = row.querySelector('td:nth-child(2) code');
    const commandText = cmdCode ? cmdCode.textContent : '';
    
    const categoryMatch = !category || row.dataset.cat === category;
    
    const cmdName = row.querySelector('td:nth-child(2)') ? row.querySelector('td:nth-child(2)').textContent.toLowerCase() : '';
    const descText = row.querySelector('td:nth-child(3)') ? row.querySelector('td:nth-child(3)').textContent.toLowerCase() : '';
    const exampleText = row.querySelector('td:nth-child(4)') ? row.querySelector('td:nth-child(4)').textContent.toLowerCase() : '';
    
    const searchMatch = !searchText || 
      cmdName.includes(searchLower) || 
      descText.includes(searchLower) || 
      exampleText.includes(searchLower);
    
    const favMatch = !showFavoritesOnly || isFavorite(commandText);
    
    const isVisible = (categoryMatch && searchMatch && favMatch);
    row.style.display = isVisible ? '' : 'none';
    
    if (isVisible) visibleCount++;
  });
  
  const countBadge = document.getElementById('resultCount');
  if (countBadge) {
    countBadge.textContent = `${visibleCount} command${visibleCount !== 1 ? 's' : ''}`;
  }
}

function toggleFavorite(command, buttonElement) {
  let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  
  if (favorites.includes(command)) {
    favorites = favorites.filter(fav => fav !== command);
    buttonElement.style.opacity = '0.5';
  } else {
    favorites.push(command);
    buttonElement.style.opacity = '1';
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(command) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  return favorites.includes(command);
}

function loadFavoriteStars() {
  const buttons = document.querySelectorAll('.favorite-btn');
  buttons.forEach(btn => {
    const row = btn.closest('tr');
    if (!row) return;
    const cmdCode = row.querySelector('td:nth-child(2) code');
    const command = cmdCode ? cmdCode.textContent : '';
    
    if (isFavorite(command)) {
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0.5';
    }
  });
}

function toggleFavorites(buttonElement) {
  showFavoritesOnly = !showFavoritesOnly;
  buttonElement.classList.toggle('active');
  const filterInput = document.getElementById('cmdFilter');
  filterTable(filterInput ? filterInput.value : '', activeCategory);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #3dc8a0;
      color: #0a0e27;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = '✓ Copied to clipboard!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 1800);
  });
}

// Load commands on page load
document.addEventListener('DOMContentLoaded', loadCommandsData);

// ===== HANDLE HASH ON PAGE LOAD =====
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    setTimeout(() => {
      jumpToSection(hash);
    }, 100);
  }
});