// ============================================
// BIOINFORMATICS PORTFOLIO 2025
// Interactive Animations & Effects
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // LOADING ANIMATION
  // ============================================
  
  window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 800);
    }
  });
  
  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  
  const revealElements = document.querySelectorAll('.problem-card, .service-card, .skill-category, .pub-card');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('reveal', 'active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // ============================================
  // STATS COUNTER ANIMATION
  // ============================================
  
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (element.dataset.suffix || '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
      }
    }, 16);
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statItems = entry.target.querySelectorAll('.stat-item strong');
        statItems.forEach(item => {
          const target = parseInt(item.textContent);
          item.dataset.suffix = item.textContent.replace(/[0-9]/g, '');
          animateCounter(item, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
  
  // ============================================
  // BADGE HOVER TOOLTIPS
  // ============================================
  
  document.querySelectorAll('.skill-category img[alt]').forEach(badge => {
    badge.style.cursor = 'help';
    badge.title = badge.alt;
  });
  
  // ============================================
  // DYNAMIC YEAR IN FOOTER
  // ============================================
  
  const currentYear = new Date().getFullYear();
  const footerYear = document.querySelector('.page-footer');
  if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
  }
  
  // ============================================
  // COPY EMAIL ON CLICK
  // ============================================
  
  document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', function(e) {
      const email = this.getAttribute('href').replace('mailto:', '');
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          // Create temporary notification
          const notification = document.createElement('div');
          notification.textContent = '✓ Email copied to clipboard!';
          notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--accent-green);
            color: var(--bg-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
          `;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
          }, 2000);
        });
      }
    });
  });
  
  // ============================================
  // PARTICLE BACKGROUND (OPTIONAL - DNA THEME)
  // ============================================
  
  const createParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
    `;
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(166, 206, 57, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(88, 166, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };
  
  // Uncomment to enable particles:
  // createParticles();
  
  // ============================================
  // CONSOLE EASTER EGG
  // ============================================
  
  console.log(`
  %c🧬 Bioinformatics Portfolio 2025 🧬
  
  %cLooking for a bioinformatics expert?
  %cLet's collaborate: szymon.myrta@gmail.com
  
  %cSkills: RNA-seq | scRNA-seq | CRISPR screens | ML pipelines
  %cTools: R/Bioconductor | Seurat | Snakemake | Quarto
  
  %c🚀 Check out my work at https://actn3.pl
  `,
  'color: #a6ce39; font-size: 16px; font-weight: bold;',
  'color: #58a6ff; font-size: 14px;',
  'color: #ff6b6b; font-size: 14px; font-weight: bold;',
  'color: #c9d1d9; font-size: 12px;',
  'color: #8b949e; font-size: 12px;',
  'color: #a6ce39; font-size: 12px; font-weight: bold;'
  );
  
});

// ============================================
// ADDITIONAL CSS ANIMATIONS (inject dynamically)
// ============================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);