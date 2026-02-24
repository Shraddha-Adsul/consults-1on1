// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  const isOpen = menu.classList.contains('open');
  
  menu.classList.toggle('open');
  hamburger.innerHTML = isOpen 
    ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('hamburger').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });
});

// Provider card accordion
document.querySelectorAll('.provider-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.provider-card');
    const wasOpen = card.classList.contains('open');
    
    // Close all cards
    document.querySelectorAll('.provider-card').forEach(c => c.classList.remove('open'));
    
    // Open clicked card if it wasn't already open
    if (!wasOpen) {
      card.classList.add('open');
    }
  });
});

// Pill navigation - scroll to section and update active state
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = pill.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    // Update active pill immediately for responsiveness
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    
    if (targetSection) {
      // Calculate offset: nav height + pill nav height + a small buffer
      const nav = document.querySelector('.nav');
      const pillNav = document.querySelector('.pill-nav');
      const offset = (nav ? nav.offsetHeight : 0) + (pillNav ? pillNav.offsetHeight : 0) + 24;
      const top = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Update active pill on scroll
function updateActivePill() {
  const sections = document.querySelectorAll('.concern-section');
  const pills = document.querySelectorAll('.pill');
  
  if (sections.length === 0) return;
  
  let currentSection = sections[0].id;
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 180) {
      currentSection = section.id;
    }
  });
  
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-target') === currentSection);
  });
}

// Only add scroll listener if pill nav exists
if (document.querySelector('.pill-nav')) {
  window.addEventListener('scroll', updateActivePill);
  updateActivePill();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
