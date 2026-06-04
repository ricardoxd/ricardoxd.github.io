/* ==========================================
   CAFÉ CALIENTE — 3D Effects
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // ======== CUSTOM CURSOR ========
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  if (!isTouchDevice() && cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .menu-card, .gallery-item, .social-link, .navbar-brand, input, textarea, .contact-info-item, .tilt-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); cursorFollower.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); cursorFollower.classList.remove('hovering'); });
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorFollower.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorFollower.style.opacity = '1'; });
  }

  // ======== SCROLL PROGRESS ========
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    if (!progressBar) return;
    const p = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (p > 0 ? (window.scrollY / p) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ======== NAVBAR ========
  const navbar = document.getElementById('mainNavbar');
  const updateNavbar = () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80); };
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ======== ACTIVE NAV LINK ========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(s => { const t = s.offsetTop - 150, b = t + s.offsetHeight; if (window.scrollY >= t && window.scrollY < b) current = s.getAttribute('id'); });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ======== MOBILE COLLAPSE ========
  const navbarCollapse = document.getElementById('navbarNav');
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => { if (navbarCollapse.classList.contains('show')) new bootstrap.Collapse(navbarCollapse).hide(); });
  });

  // ======== TYPING EFFECT ========
  (() => {
    const el = document.getElementById('heroSubtitle');
    if (!el) return;
    const text = 'El arte del café de especialidad en cada taza';
    let i = 0;
    el.textContent = '';
    const type = () => { if (i < text.length) { el.textContent += text.charAt(i++); setTimeout(type, 35 + Math.random() * 25); } };
    setTimeout(type, 600);
  })();

  // ======== HERO 3D MOUSE PARALLAX ========
  (() => {
    const hero = document.getElementById('hero');
    const layers = hero ? hero.querySelectorAll('.hero-depth-layer[data-depth]') : [];
    if (!hero || layers.length === 0) return;

    const centerX = () => window.innerWidth / 2;
    const centerY = () => window.innerHeight / 2;

    const onMouseMove = (e) => {
      const x = (e.clientX - centerX()) / centerX();
      const y = (e.clientY - centerY()) / centerY();
      layers.forEach(layer => {
        const d = parseFloat(layer.getAttribute('data-depth')) || 0;
        const moveX = x * d * 50;
        const moveY = y * d * 50;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => { onMouseMove(e); ticking = false; });
        ticking = true;
      }
    });
  })();

  // ======== HERO PARTICLES ========
  (() => {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    const n = Math.min(25, Math.floor(window.innerWidth / 50));
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      const s = 3 + Math.random() * 5;
      p.style.width = s + 'px'; p.style.height = s + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = 0.3 + Math.random() * 0.5;
      container.appendChild(p);
    }
  })();

  // ======== 3D FLOATING BEANS ========
  const createBeans = (containerId, count) => {
    const container = document.getElementById(containerId);
    if (!container || isTouchDevice()) return;
    for (let i = 0; i < count; i++) {
      const bean = document.createElement('div');
      bean.className = 'bean-3d';
      const size = 12 + Math.random() * 10;
      bean.style.width = (size * 0.66) + 'px';
      bean.style.height = size + 'px';
      bean.style.left = (5 + Math.random() * 90) + '%';
      bean.style.bottom = '-30px';
      bean.style.opacity = 0.2 + Math.random() * 0.3;
      bean.style.animationDuration = (18 + Math.random() * 22) + 's';
      bean.style.animationDelay = (Math.random() * 15) + 's';
      bean.style.animationName = i % 2 === 0 ? 'beanFloat1' : 'beanFloat2';
      bean.style.animationTimingFunction = 'linear';
      bean.style.animationIterationCount = 'infinite';
      container.appendChild(bean);
    }
  };
  createBeans('heroBeans', 8);
  createBeans('menuBeans', 6);

  // ======== SCROLL REVEAL ========
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ======== COUNTER ANIMATION ========
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target')) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1500;
          const start = performance.now();
          const anim = (now) => {
            const t = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target) + suffix;
            if (t < 1) requestAnimationFrame(anim);
            else el.textContent = target + suffix;
          };
          requestAnimationFrame(anim);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ======== ENHANCED 3D TILT CARDS (with inner depth) ========
  (() => {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      const innerItems = card.querySelectorAll('.tilt-item');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;

        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;

        innerItems.forEach(item => {
          const factor = parseFloat(item.getAttribute('data-tilt-factor')) || 1;
          const irx = rx * factor;
          const iry = ry * factor;
          item.style.transform = `translateZ(${10 * factor}px) rotateX(${irx * 0.2}deg) rotateY(${iry * 0.2}deg)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        innerItems.forEach(item => { item.style.transform = ''; });
      });
    });
  })();

  // ======== MAGNETIC BUTTONS ========
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (isTouchDevice()) return;
      const rect = btn.getBoundingClientRect();
      const strength = parseInt(btn.getAttribute('data-strength')) || 30;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 150) {
        const f = (1 - dist / 150) * strength;
        btn.style.transform = `translate(${x * f / 100}px, ${y * f / 100}px)`;
      }
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ======== BUTTON RIPPLE ========
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const s = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = s + 'px';
      ripple.style.left = (e.clientX - rect.left - s / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - s / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ======== BACK TO TOP ========
  const backToTop = document.getElementById('backToTop');
  const updateBackToTop = () => { if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500); };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ======== FORM VALIDATION ========
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('was-validated');
      if (contactForm.checkValidity()) {
        formFeedback.className = 'alert alert-success d-block';
        formFeedback.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        setTimeout(() => { formFeedback.className = 'alert d-none'; }, 5000);
      } else {
        formFeedback.className = 'alert alert-danger d-block';
        formFeedback.textContent = 'Por favor completa todos los campos requeridos.';
      }
    });
  }

  // ======== SCROLL PARALLAX ON HERO BG ========
  const heroSection = document.getElementById('hero');
  const heroBg = heroSection ? heroSection.querySelector('.hero-bg-layer') : null;
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        heroBg.style.transform = `translate3d(0, ${sy * 0.15}px, -50px) scale(1.1)`;
      }
    }, { passive: true });
  }

});
