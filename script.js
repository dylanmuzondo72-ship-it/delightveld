document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.getElementById('year').textContent = new Date().getFullYear();

  const floating = document.querySelector('.floating-wa');
  const floatingButton = document.querySelector('.floating-main');
  floatingButton?.addEventListener('click', () => {
    const open = floating.classList.toggle('open');
    floatingButton.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (floating && !floating.contains(event.target)) {
      floating.classList.remove('open');
      floatingButton?.setAttribute('aria-expanded', 'false');
    }
  });

  const quoteForm = document.getElementById('quoteForm');
  quoteForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const message = [
      'Hello Delight Veld, I would like to request a consultation.',
      '',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Project location: ${data.get('location') || 'Not specified'}`,
      `Service required: ${data.get('service')}`,
      `Project details: ${data.get('details')}`
    ].join('\n');
    const recipient = data.get('recipient');
    window.open(`https://wa.me/${recipient}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });

  // Development film: keep the 49 MB file out of the initial page load,
  // but explicitly request it when the visitor presses Play. Surface a direct
  // link if the browser cannot fetch or decode the MP4.
  document.querySelectorAll('.development-video').forEach(video => {
    const fallback = video.closest('.development-video-wrap')?.nextElementSibling;
    video.preload = 'metadata';
    video.playsInline = true;
    video.addEventListener('waiting', () => {
      if (fallback) fallback.classList.add('video-error');
    });
    video.addEventListener('error', () => {
      if (fallback) fallback.classList.add('video-error');
    });
    video.addEventListener('playing', () => {
      if (fallback) fallback.classList.remove('video-error');
    });
    video.addEventListener('stalled', () => {
      if (fallback) fallback.classList.add('video-error');
    });
  });

  // Mobile browsers sometimes defer muted autoplay until the page is ready.
  // Retry once after metadata is available; never unmute a background video.
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    const attemptHeroPlayback = () => {
      const attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {
        // The poster remains visible if the browser or data-saver blocks autoplay.
      });
    };
    if (heroVideo.readyState >= 2) attemptHeroPlayback();
    else heroVideo.addEventListener('loadeddata', attemptHeroPlayback, { once: true });
  }

  const modal = document.getElementById('imageModal');
  const modalImage = modal?.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!modal || !modalImage) return;
      modalImage.src = item.dataset.image;
      modal.showModal();
    });
  });
  modal?.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
  });
});
