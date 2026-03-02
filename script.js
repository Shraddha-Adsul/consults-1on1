// Mobile menu toggle — attached via JS instead of inline onclick
(function() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  const ICON_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';
  const ICON_CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

  function toggleMobileMenu() {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    hamburger.innerHTML = isOpen ? ICON_OPEN : ICON_CLOSE;
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.innerHTML = ICON_OPEN;
    });
  });
})();

// Provider card accordion — expand/collapse About section
document.querySelectorAll('.provider-about-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.provider-card');
    const wasOpen = card.classList.contains('open');

    // Close all cards and reset aria
    document.querySelectorAll('.provider-card').forEach(c => {
      c.classList.remove('open');
      const t = c.querySelector('.provider-about-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });

    // Open clicked card if it wasn't already open
    if (!wasOpen) {
      card.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// Pill navigation - scroll to section, update active state, and highlight
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = pill.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    // Update active pill immediately for responsiveness
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    if (targetSection) {
      // Calculate offset: nav height + a small buffer
      const nav = document.querySelector('.nav');
      const offset = (nav ? nav.offsetHeight : 0) + 24;
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
    formState.classList.remove('hidden');
    thanksState.classList.add('hidden');
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

  // Open modal when any Book Consult button is clicked
  document.querySelectorAll('.provider-book-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const providerName = btn.getAttribute('data-provider');
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
    submitBtn.textContent = 'Submitting\u2026';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formState.classList.add('hidden');
        thanksState.classList.remove('hidden');
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

// Feedback Widget — attached via JS instead of inline onclick
(function() {
  const fab = document.getElementById('feedback-fab');
  const panel = document.getElementById('feedback-panel');
  const closeBtn = document.getElementById('feedback-close');
  const doneBtn = document.getElementById('feedback-done');
  if (!fab || !panel) return;

  function toggleFeedback() {
    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      panel.classList.remove('open');
      fab.classList.remove('hidden');
      // Reset to form state when closing
      const formState = document.getElementById('feedback-form-state');
      const thanksState = document.getElementById('feedback-thanks-state');
      if (formState) formState.classList.remove('hidden');
      if (thanksState) thanksState.classList.add('hidden');
    } else {
      panel.classList.add('open');
      fab.classList.add('hidden');
    }
  }

  fab.addEventListener('click', toggleFeedback);
  if (closeBtn) closeBtn.addEventListener('click', toggleFeedback);
  if (doneBtn) doneBtn.addEventListener('click', toggleFeedback);

  // Feedback form submission
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
    submitBtn.textContent = 'Sending\u2026';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        document.getElementById('feedback-form-state').classList.add('hidden');
        document.getElementById('feedback-thanks-state').classList.remove('hidden');
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
