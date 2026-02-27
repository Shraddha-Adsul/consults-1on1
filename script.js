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

// Nav scroll transition — transparent over hero, solid after
(function() {
  const nav = document.querySelector('.nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  function updateNav() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    // Switch when hero bottom passes below the nav height
    if (heroBottom <= nav.offsetHeight) {
      nav.classList.remove('nav-transparent');
    } else {
      nav.classList.add('nav-transparent');
    }
  }

  // Set initial state
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
})();

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
    // Skip provider-cta links (handled by modal)
    if (this.classList.contains('provider-cta')) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Booking Modal
(function() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const formState = document.getElementById('modal-form-state');
  const thanksState = document.getElementById('modal-thanks-state');
  const form = document.getElementById('booking-form');
  const providerNameEl = document.getElementById('modal-provider-name');
  const formProviderInput = document.getElementById('form-provider');
  const closeBtn = document.getElementById('modal-close');
  const doneBtn = document.getElementById('modal-done');
  const locationHidden = document.getElementById('form-location-hidden');
  const durationHidden = document.getElementById('form-duration-hidden');

  // Toggle button groups
  document.querySelectorAll('.toggle-group').forEach(group => {
    group.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Deselect siblings
        group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Update corresponding hidden input
        if (group.id === 'location-toggle') {
          locationHidden.value = btn.getAttribute('data-value');
        } else if (group.id === 'duration-toggle') {
          durationHidden.value = btn.getAttribute('data-value');
        }
      });
    });
  });

  function openModal(providerName) {
    providerNameEl.textContent = providerName;
    formProviderInput.value = providerName;
    formState.style.display = '';
    thanksState.style.display = 'none';
    form.reset();
    formProviderInput.value = providerName;
    locationHidden.value = '';
    durationHidden.value = '';
    // Clear toggle selections
    modal.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('selected'));
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open modal when any provider CTA is clicked
  document.querySelectorAll('.provider-cta').forEach(cta => {
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      const providerName = cta.getAttribute('data-provider');
      if (providerName) {
        openModal(providerName);
      }
    });
  });

  // Close modal
  closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submission via Formspree
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate toggle selections
    if (!locationHidden.value) {
      alert('Please select your location.');
      return;
    }
    if (!durationHidden.value) {
      alert('Please select a consultation duration.');
      return;
    }

    const submitBtn = form.querySelector('.modal-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formState.style.display = 'none';
        thanksState.style.display = '';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirm Interest';
  });
})();

// Feedback Widget
function toggleFeedback() {
  const fab = document.getElementById('feedback-fab');
  const panel = document.getElementById('feedback-panel');
  if (!fab || !panel) return;

  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    fab.classList.remove('hidden');
    // Reset to form state when closing
    const formState = document.getElementById('feedback-form-state');
    const thanksState = document.getElementById('feedback-thanks-state');
    if (formState) formState.style.display = '';
    if (thanksState) thanksState.style.display = 'none';
  } else {
    panel.classList.add('open');
    fab.classList.add('hidden');
  }
}

// Feedback toggle buttons & form submission
(function() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  const locationHidden = document.getElementById('feedback-location-hidden');
  const ageHidden = document.getElementById('feedback-age-hidden');

  // Wire up feedback toggle groups
  document.querySelectorAll('#feedback-location-toggle .toggle-btn, #feedback-age-toggle .toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.toggle-group');
      group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      if (group.id === 'feedback-location-toggle') {
        locationHidden.value = btn.getAttribute('data-value');
      } else if (group.id === 'feedback-age-toggle') {
        ageHidden.value = btn.getAttribute('data-value');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!locationHidden.value) {
      alert('Please select your location.');
      return;
    }
    if (!ageHidden.value) {
      alert('Please select your age range.');
      return;
    }

    const submitBtn = form.querySelector('.feedback-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        document.getElementById('feedback-form-state').style.display = 'none';
        document.getElementById('feedback-thanks-state').style.display = '';
        form.reset();
        locationHidden.value = '';
        ageHidden.value = '';
        // Clear toggle selections
        document.querySelectorAll('#feedback-location-toggle .toggle-btn, #feedback-age-toggle .toggle-btn').forEach(b => b.classList.remove('selected'));
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Feedback';
  });
})();
