/* ═══════════════════════════════════════════════
   IGREJA EVANGÉLICA SUBINDO PARA JESUS — SPJ
   main.js  |  v2
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── MENU MOBILE ── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');

  window.toggleMenu = () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  };
  window.closeMenu = () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !mob.contains(e.target)) closeMenu();
  });

  /* ── REVEAL ON SCROLL ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('up'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ── LINK ATIVO NA NAV ── */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.style.color = l.getAttribute('href') === `#${e.target.id}` ? 'var(--ouro3)' : '');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => secObs.observe(s));

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  /* ── DESTAQUE CULTO DO DIA ── */
  const dia = new Date().getDay();
  const mapa = { 5: 'sexta', 6: 'sabado', 0: 'domingo' };
  if (mapa[dia]) {
    const card = document.querySelector(`.hora-card[data-dia="${mapa[dia]}"]`);
    if (card) {
      card.style.borderColor = 'rgba(200,150,10,.5)';
      card.style.background = 'rgba(200,150,10,.07)';
      const pill = document.createElement('div');
      pill.textContent = 'HOJE';
      pill.style.cssText = 'font-family:var(--fn);font-size:9px;font-weight:700;color:var(--ouro3);letter-spacing:2px;margin-bottom:8px;';
      card.insertBefore(pill, card.firstChild);
    }
  }

  /* ── PIX COPIAR ── */
  window.copiarPix = () => {
    const chave = document.getElementById('pix-val').textContent.trim();
    navigator.clipboard.writeText(chave).catch(() => {
      const el = document.createElement('textarea');
      el.value = chave; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    });
    const ok = document.getElementById('pix-ok');
    ok.style.display = 'block';
    setTimeout(() => ok.style.display = 'none', 3000);
  };

  /* ── FORMULÁRIO ── */
  window.enviarForm = () => {
    const nome = document.getElementById('f-nome');
    const contato = document.getElementById('f-contato-info');
    const assunto = document.getElementById('f-assunto');
    const mensagem = document.getElementById('f-mensagem');
    
    let ok = true;
    [nome, contato, mensagem].forEach(i => {
      if (!i.value.trim()) { i.style.borderColor = '#c0392b'; ok = false; setTimeout(() => i.style.borderColor = '', 2000); }
    });
    
    if (!ok) return;

    // 👇 COLOQUE O NÚMERO DO WHATSAPP DA IGREJA AQUI (Apenas números, com DDD)
    const numeroWhatsApp = "5511900000000"; 

    let texto = `Olá! Nova mensagem enviada pelo site:%0A%0A`;
    texto += `*Nome:* ${nome.value.trim()}%0A`;
    texto += `*Contato:* ${contato.value.trim()}%0A`;
    texto += `*Assunto:* ${assunto.value}%0A`;
    texto += `*Mensagem:* ${mensagem.value.trim()}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
    
    const btn = document.getElementById('btn-enviar');
    btn.textContent = 'Redirecionando...'; btn.disabled = true;
    
    setTimeout(() => {
      window.open(url, '_blank');
      btn.innerHTML = btn.dataset.original; btn.disabled = false;
      document.getElementById('form-success').style.display = 'block';
      [nome, contato, mensagem].forEach(i => i.value = '');
      setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
    }, 800);
  };

  /* ── ANO NO FOOTER ── */
  const y = document.getElementById('footer-year');
  if (y) y.textContent = new Date().getFullYear();

  /* salva texto original do botão */
  const btnEnviar = document.getElementById('btn-enviar');
  if (btnEnviar) btnEnviar.dataset.original = btnEnviar.innerHTML;

  /* ── CARROSSEL SOBRE ── */
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsNav = document.querySelector('.carousel-dots');
    
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);
    let currentIndex = 0;

    const moveToSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active-slide'));
      slides[index].classList.add('active-slide');
      
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentIndex = index;
    };

    nextBtn.addEventListener('click', () => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      moveToSlide(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      moveToSlide(prevIndex);
    });

    // Auto play
    setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      moveToSlide(nextIndex);
    }, 4500);
  }

});
