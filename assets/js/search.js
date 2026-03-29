// ===== SITE-WIDE SEARCH INDEX =====
const SEARCH_INDEX = [
  // Python page
  { title: "Connect to ONTAP REST API", page: "python.html", section: "Python Automation", snippet: "Using netapp-ontap Python library to establish a connection to ONTAP cluster." },
  { title: "List All Volumes", page: "python.html", section: "Python Automation", snippet: "Retrieve all volumes from a SVM using the ONTAP REST API Python client." },
  { title: "Create a Volume", page: "python.html", section: "Python Automation", snippet: "Provision a new FlexVol using the Volume resource class in netapp-ontap." },
  { title: "Snapshot Management", page: "python.html", section: "Python Automation", snippet: "Create, list, and delete snapshots programmatically using Python." },
  { title: "Monitor Aggregate Usage", page: "python.html", section: "Python Automation", snippet: "Fetch aggregate capacity and usage stats via REST API." },
  { title: "Direct REST API Call with requests", page: "python.html", section: "Python Automation", snippet: "Use Python requests library to make raw ONTAP REST API calls." },
  { title: "Ansible na_ontap_volume", page: "python.html", section: "Python Automation", snippet: "Declarative volume management using NetApp Ansible collections." },
  { title: "Error Handling in Python Scripts", page: "python.html", section: "Python Automation", snippet: "Handle NetRestApiError and connection exceptions in netapp-ontap." },

  // PowerShell page
  { title: "Connect to ONTAP with PowerShell", page: "powershell.html", section: "PowerShell Automation", snippet: "Use Connect-NcController to establish a PSTK session to the cluster." },
  { title: "Get All Volumes via PSTK", page: "powershell.html", section: "PowerShell Automation", snippet: "Retrieve volumes using Get-NcVol from the NetApp PowerShell Toolkit." },
  { title: "Create Volume with PowerShell", page: "powershell.html", section: "PowerShell Automation", snippet: "Provision a new volume using New-NcVol cmdlet." },
  { title: "Snapshot Operations in PowerShell", page: "powershell.html", section: "PowerShell Automation", snippet: "Create and manage snapshots with New-NcSnapshot and Remove-NcSnapshot." },
  { title: "Export Volume Data to CSV", page: "powershell.html", section: "PowerShell Automation", snippet: "Pipe PSTK output through Export-Csv for reporting and auditing." },
  { title: "Invoke-RestMethod for ONTAP API", page: "powershell.html", section: "PowerShell Automation", snippet: "Call ONTAP REST endpoints directly from PowerShell without PSTK." },
  { title: "PowerShell Error Handling", page: "powershell.html", section: "PowerShell Automation", snippet: "Using try/catch blocks with PSTK cmdlets." },
  { title: "Scheduled Automation with Task Scheduler", page: "powershell.html", section: "PowerShell Automation", snippet: "Automate nightly PowerShell scripts against ONTAP clusters." },

  // Commands page
  { title: "volume show", page: "commands.html", section: "Commands Reference", snippet: "Display volume information. Use -fields to select specific fields." },
  { title: "volume create", page: "commands.html", section: "Commands Reference", snippet: "Create a new FlexVol volume in a specified aggregate and SVM." },
  { title: "volume snapshot create", page: "commands.html", section: "Commands Reference", snippet: "Create a snapshot of a volume for point-in-time recovery." },
  { title: "volume snapshot restore-file", page: "commands.html", section: "Commands Reference", snippet: "Restore a single file from a snapshot without full restore." },
  { title: "storage aggregate show", page: "commands.html", section: "Commands Reference", snippet: "Show aggregate status, usable size, and disk info." },
  { title: "network interface show", page: "commands.html", section: "Commands Reference", snippet: "List all logical interfaces (LIFs) and their status, port, and IP." },
  { title: "vserver show", page: "commands.html", section: "Commands Reference", snippet: "Display all SVMs (vservers) in the cluster." },
  { title: "system node show", page: "commands.html", section: "Commands Reference", snippet: "Show node health, model, OS version, and uptime." },
  { title: "cluster show", page: "commands.html", section: "Commands Reference", snippet: "Display cluster nodes and their health status." },
  { title: "snapmirror show", page: "commands.html", section: "Commands Reference", snippet: "Display SnapMirror relationships, status, and lag time." },
  { title: "snapmirror update", page: "commands.html", section: "Commands Reference", snippet: "Trigger a manual SnapMirror update for a specific relationship." },
  { title: "qos policy-group show", page: "commands.html", section: "Commands Reference", snippet: "View QoS policy groups and their throughput limits." },
  { title: "event log show", page: "commands.html", section: "Commands Reference", snippet: "Display cluster event messages filtered by time or severity." },
  { title: "security audit log show", page: "commands.html", section: "Commands Reference", snippet: "View admin activity audit trail for security compliance." },

  // Tips page
  { title: "Use -fields to reduce API payload", page: "tips.html", section: "Tips & Tricks", snippet: "Always specify -fields in REST API calls to return only what you need — drastically reduces response size." },
  { title: "Avoid ZAPI — migrate to REST", page: "tips.html", section: "Tips & Tricks", snippet: "ZAPI is deprecated. All new automation should use the ONTAP REST API." },
  { title: "Test in sim before prod", page: "tips.html", section: "Tips & Tricks", snippet: "Use ONTAP Select or the ONTAP Simulator for all script testing." },
  { title: "Use service accounts, not admin", page: "tips.html", section: "Tips & Tricks", snippet: "Create a dedicated read-only or scoped service account for automation." },
  { title: "Pagination for large result sets", page: "tips.html", section: "Tips & Tricks", snippet: "ONTAP REST API limits records per call. Handle next: links for pagination." },
  { title: "Store credentials securely", page: "tips.html", section: "Tips & Tricks", snippet: "Never hardcode passwords. Use environment variables or a secrets manager." },
  { title: "Check job status after async operations", page: "tips.html", section: "Tips & Tricks", snippet: "POST/PATCH operations may return a job object. Poll /api/cluster/jobs/{uuid} for completion." },
  { title: "Use verify=False carefully in HTTPS", page: "tips.html", section: "Tips & Tricks", snippet: "Disable SSL verification only in dev. Use proper certs in production." },
];

function liveSearch(query) {
  const resultsEl = document.getElementById('searchResults');
  if (!resultsEl) return;
  
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    resultsEl.classList.remove('active');
    resultsEl.innerHTML = '';
    return;
  }

  const matched = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.snippet.toLowerCase().includes(q) ||
    item.section.toLowerCase().includes(q)
  ).slice(0, 8);

  if (matched.length === 0) {
    resultsEl.innerHTML = '<div class="search-result-item"><div class="search-result-title" style="color:var(--text-dim)">No results found</div></div>';
  } else {
    resultsEl.innerHTML = matched.map(item => `
      <div class="search-result-item" onclick="window.location='${item.page}?q=${encodeURIComponent(query)}'">
        <div class="search-result-title">${highlight(item.title, q)}</div>
        <div class="search-result-page">${item.section}</div>
        <div class="search-result-snippet">${highlight(item.snippet, q)}</div>
      </div>
    `).join('');
  }

  resultsEl.classList.add('active');
}

function highlight(text, q) {
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

// Close search on outside click
document.addEventListener('click', (e) => {
  const sr = document.getElementById('searchResults');
  const si = document.getElementById('globalSearch');
  if (sr && si && !sr.contains(e.target) && e.target !== si) {
    sr.classList.remove('active');
  }
});

// Copy button logic
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

// Command table filter
function filterTable(query, category = null) {
  const rows = document.querySelectorAll('#cmdTableBody tr');
  const q = query.toLowerCase();
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchesQuery = q === '' || text.includes(q);
    const matchesCat = !category || row.dataset.cat === category;
    row.style.display = matchesQuery && matchesCat ? '' : 'none';
  });
}

let activeCategory = null;

function setCategory(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (activeCategory === cat) {
    activeCategory = null;
  } else {
    activeCategory = cat;
    btn.classList.add('active');
  }
  const q = document.getElementById('cmdFilter') ? document.getElementById('cmdFilter').value : '';
  filterTable(q, activeCategory);
}
