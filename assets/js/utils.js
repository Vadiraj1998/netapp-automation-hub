// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Close sidebar if user clicks outside of it on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  }
});

// ===== DYNAMICALLY LOAD FOOTER =====
function loadFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  // Fetch the footer HTML
  fetch('assets/includes/footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load footer');
      }
      return response.text();
    })
    .then(html => {
      footerContainer.innerHTML = html;
    })
    .catch(err => {
      console.error('Error loading footer:', err);
    });
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadFooter();
  // ... any other init functions you already have here
});