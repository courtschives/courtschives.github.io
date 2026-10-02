// Change this to update the "last watered" date in every page's footer.
const LAST_WATERED = 'oct 2026';

document.querySelectorAll('[data-last-watered]').forEach((el) => {
  el.textContent = LAST_WATERED;
});

// Carousels: advance only on click (arrows, thumbnails, or left/right keys).
// Slides can be <img> or <video>; a video pauses when you move away from it.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const thumbs = carousel.querySelectorAll('.carousel-thumb');
  const count = carousel.querySelector('.carousel-count');
  const caption = carousel.querySelector('.carousel-caption');
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      if (i !== current && slide.tagName === 'VIDEO') slide.pause();
    });
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === current);
      if (i === current) thumb.setAttribute('aria-current', 'true');
      else thumb.removeAttribute('aria-current');
    });
    if (count) count.textContent = `${current + 1} / ${slides.length}`;
    if (caption) caption.textContent = slides[current].alt || '';
  }

  carousel.querySelector('.carousel-btn.prev')?.addEventListener('click', () => show(current - 1));
  carousel.querySelector('.carousel-btn.next')?.addEventListener('click', () => show(current + 1));
  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));
  carousel.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'VIDEO') return; // let arrow keys seek the video
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});

// Many phones can't show a PDF inside the page, so add a plain link under each
// embedded PDF (hidden on desktop by project-template.css).
document.querySelectorAll('.pdf-card object[data]').forEach((pdf) => {
  const link = document.createElement('a');
  link.className = 'btn pdf-open';
  link.href = pdf.getAttribute('data').split('#')[0];
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'open pdf ↗';
  pdf.closest('.pdf-card').after(link);
});
