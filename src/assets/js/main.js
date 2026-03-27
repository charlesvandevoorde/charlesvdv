/* ============================================================
   CHARLES VAN DE VOORDE — main.js
   Vanilla JS uniquement, zéro librairie
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Scroll: nav shadow ──────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile nav burger ───────────────────────────────────────
  const burger = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      // Animate spans
      const spans = burger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Intersection Observer: fade-in & timeline ──────────────
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Skill bars
        entry.target.querySelectorAll('.skill-item__fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .fade-in-children, .timeline__item').forEach(el => io.observe(el));

  // Skill bars init
  document.querySelectorAll('.skill-item__fill').forEach(bar => {
    const w = bar.dataset.width;
    bar.style.width = '0';
    bar.dataset.width = w;
  });

  // ── Portfolio filter + voir plus ────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const VISIBLE_MAX = 6;
  let showAll = false;

  function applyFilter(filter) {
    const matching = projectCards.filter(card =>
      filter === 'all' || card.dataset.category === filter
    );
    const hidden = projectCards.filter(card =>
      filter !== 'all' && card.dataset.category !== filter
    );
    // Masquer les non-correspondants
    hidden.forEach(card => { card.style.display = 'none'; card.dataset.hiddenByFilter = '1'; });
    matching.forEach(card => { delete card.dataset.hiddenByFilter; });
    // Appliquer la limite visible
    applyLimit(matching);
  }

  function applyLimit(visible) {
    visible = visible || projectCards.filter(c => !c.dataset.hiddenByFilter);
    visible.forEach((card, i) => {
      card.style.display = (!showAll && i >= VISIBLE_MAX) ? 'none' : '';
    });
    // Bouton voir plus
    const btn = document.getElementById('portfolio-voir-plus');
    if (btn) btn.style.display = visible.length > VISIBLE_MAX ? '' : 'none';
  }

  // Init : afficher les 6 premiers
  applyFilter('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showAll = false;
      applyFilter(btn.dataset.filter);
    });
  });

  const voirPlusBtn = document.getElementById('portfolio-voir-plus');
  if (voirPlusBtn) {
    voirPlusBtn.addEventListener('click', () => {
      showAll = true;
      applyLimit();
      voirPlusBtn.style.display = 'none';
    });
  }

  // ── Testimonials Slider ────────────────────────────────────
  const slider = document.querySelector('.slider');
  if (slider) {
    const track = slider.querySelector('.slider__track');
    const slides = slider.querySelectorAll('.slider__slide');
    const dotsContainer = slider.querySelector('.slider__dots');
    const btnPrev = slider.querySelector('.slider__btn--prev');
    const btnNext = slider.querySelector('.slider__btn--next');
    let current = 0;
    let autoplayTimer;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider__dot');
      dot.setAttribute('aria-label', `Témoignage ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      slider.querySelectorAll('.slider__dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    btnNext && btnNext.addEventListener('click', () => { next(); resetAutoplay(); });
    btnPrev && btnPrev.addEventListener('click', () => { prev(); resetAutoplay(); });

    function startAutoplay() {
      autoplayTimer = setInterval(next, 5000);
    }
    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    slider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    slider.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // ── Contact form — Netlify Forms inline confirmation ───────
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });
        if (res.ok) {
          form.style.display = 'none';
          document.querySelector('.form__success').classList.add('show');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  // ── Active nav link ────────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPath) link.classList.add('active');
  });

});
