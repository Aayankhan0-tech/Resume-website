document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.toggle('open');
      if (content) {
        content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
      }
    });
  });

  // Newsletter modal
  const openModalBtn = document.getElementById('openNewsletter');
  const closeModalBtn = document.getElementById('closeNewsletter');
  const modalBackdrop = document.getElementById('newsletterModal');
  const modalForm = document.getElementById('newsletterForm');
  if (openModalBtn && modalBackdrop) {
    openModalBtn.addEventListener('click', () => modalBackdrop.classList.add('open'));
  }
  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => modalBackdrop.classList.remove('open'));
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = modalForm.querySelector('input[type="email"]');
      if (email && email.value) {
        alert('Subscribed: ' + email.value);
        modalBackdrop?.classList.remove('open');
      }
    });
  }

  // Project filters on projects.html
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || 'all';
        card.style.display = !filter || filter === 'all' || tags.includes(filter) ? '' : 'none';
      });
    }));
  }
});


