document.addEventListener('DOMContentLoaded', () => {
  // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
  lucide.createIcons();

  // 2. МОБИЛЬНОЕ МЕНЮ
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const body = document.body;

  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      if (mobileMenu.classList.contains('active')) {
          body.style.overflow = 'hidden';
      } else {
          body.style.overflow = '';
      }
  });

  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
          body.style.overflow = '';
      });
  });

  // 3. THREE.JS HERO ANIMATION
  const initHeroScene = () => {
      const container = document.getElementById('hero-canvas');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const count = 1500;
      const positions = new Float32Array(count * 3);
      for(let i=0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 6;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({ size: 0.015, color: 0x22d3ee, transparent: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 3;

      let mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX - window.innerWidth/2) * 0.0005;
          mouseY = (e.clientY - window.innerHeight/2) * 0.0005;
      });

      const animate = () => {
          requestAnimationFrame(animate);
          points.rotation.y += 0.001 + mouseX;
          points.rotation.x += 0.0005 + mouseY;
          renderer.render(scene, camera);
      };
      animate();

      window.addEventListener('resize', () => {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
      });
  };
  initHeroScene();

  // 4. SWIPER (ИННОВАЦИИ)
  new Swiper('.innovations-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.next', prevEl: '.prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });

  // 5. ФОРМА КОНТАКТОВ + КАПЧА
  const contactForm = document.getElementById('contact-form');
  if(contactForm) {
      const phoneInput = document.getElementById('phone-input');
      const captchaLabel = document.getElementById('captcha-label');
      const captchaInput = document.getElementById('captcha-input');
      const successMsg = document.getElementById('form-success');

      let a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10);
      let result = a + b;
      captchaLabel.innerText = `Решите пример: ${a} + ${b} = ?`;

      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9+]/g, '');
      });

      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== result) {
              alert('Ошибка в примере!');
              return;
          }
          contactForm.querySelector('button').innerText = 'Отправка...';
          setTimeout(() => {
              successMsg.classList.add('active');
              lucide.createIcons();
          }, 1000);
      });
  }

  // 6. COOKIE POPUP
  const cookiePopup = document.getElementById('cookie-popup');
  if(cookiePopup) {
      const acceptBtn = document.getElementById('cookie-accept');
      const declineBtn = document.getElementById('cookie-decline');

      if (!localStorage.getItem('cookieConsent')) {
          setTimeout(() => cookiePopup.classList.add('visible'), 2000);
      }

      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookieConsent', 'true');
          cookiePopup.classList.remove('visible');
      });

      declineBtn.addEventListener('click', () => {
          cookiePopup.classList.remove('visible');
      });
  }
});