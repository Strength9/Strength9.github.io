/* ==========================================================================
   Strength 9 Design — Main JavaScript
   Vanilla JS — No dependencies
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  const navToggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav__overlay');
  const navLinks = document.querySelectorAll('.nav__link');

  function openNav() {
    nav.classList.add('nav--open');
    if (navOverlay) navOverlay.classList.add('nav__overlay--visible');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    if (navOverlay) navOverlay.classList.remove('nav__overlay--visible');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav.classList.contains('nav--open')) {
        closeNav();
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeNav();
      navToggle.focus();
    }
  });

  /* ---------- Sticky Header Shadow ---------- */
  var header = document.querySelector('.header');

  if (header) {
    var lastScrollY = 0;

    function onScroll() {
      var scrollY = window.scrollY;
      if (scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll Animations (IntersectionObserver) ---------- */
  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      fadeElements.forEach(function (el) {
        el.classList.add('fade-in--visible');
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in--visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      fadeElements.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ---------- Contact Form (Formspree) ---------- */
  var form = document.querySelector('.form[data-formspree]');

  if (form) {
    var statusEl = form.querySelector('.form__status');
    var submitBtn = form.querySelector('button[type="submit"]');
    var endpoint = form.getAttribute('data-formspree');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      var formData = new FormData(form);

      fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            statusEl.textContent = 'Message sent successfully. We\'ll be in touch shortly.';
            statusEl.className = 'form__status form__status--success';
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
          statusEl.className = 'form__status form__status--error';
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  /* ---------- Portfolio Filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('filter-btn--active');
        });
        btn.classList.add('filter-btn--active');

        portfolioItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  var currentPath = window.location.pathname;

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || href === currentPath + '/' || href + '/' === currentPath) {
      link.classList.add('nav__link--active');
    }
  });
})();
