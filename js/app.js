document.addEventListener('DOMContentLoaded', () => {
  const distroPills = document.querySelectorAll('.distro-pill');
  distroPills.forEach((pill) => {
    requestAnimationFrame(() => {
      pill.classList.add('visible');
    });
  });

  const trackedSections = ['omnitrix', 'about', 'watch-video']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navItems = document.querySelectorAll('.side-nav-item');

  if (trackedSections.length && navItems.length) {
    const visibleRatios = new Map();

    const setActiveNav = (activeId) => {
      navItems.forEach((item) => {
        item.classList.toggle('active', item.dataset.target === activeId);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visibleRatios.set(entry.target.id, entry.intersectionRatio);
      });

      let bestId = trackedSections[0].id;
      let bestRatio = -1;
      trackedSections.forEach((section) => {
        const ratio = visibleRatios.get(section.id) || 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = section.id;
        }
      });

      setActiveNav(bestId);
    }, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    });

    trackedSections.forEach((section) => {
      visibleRatios.set(section.id, 0);
      observer.observe(section);
    });

    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const target = document.getElementById(item.dataset.target);
        if (target) {
          if (item.dataset.target === 'about') {
            const rect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const desiredTop = rect.top + scrollTop + 330;
            const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: Math.min(desiredTop, maxScrollTop), behavior: 'smooth' });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // --- Login Page Logic ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate simple authentication by redirecting to dashboard
      window.location.href = 'dashboard.html';
    });
  }

  // --- Dashboard Logic ---
  const distroForm = document.getElementById('distroForm');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const dashboardHeading = document.getElementById('dashboardHeading');
  const dashboardDesc = document.getElementById('dashboardDesc');

  if (distroForm && dashboardScreen) {
    distroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selectedDistro = document.getElementById('distroSelect').value;
      const useCase = document.getElementById('useCase').value;

      // Reset existing theme classes
      dashboardScreen.className = 'dashboard-panel animate-fade-up';
      
      // Force a slight reflow to allow animation to re-trigger
      void dashboardScreen.offsetWidth;
      
      switch (selectedDistro) {
        case 'arch':
          dashboardScreen.classList.add('env-arch');
          dashboardHeading.textContent = 'Arch Linux';
          dashboardDesc.textContent = `Environment configured for: ${useCase}. By the way, you use Arch.`;
          break;
        case 'fedora':
          dashboardScreen.classList.add('env-fedora');
          dashboardHeading.textContent = 'Fedora';
          dashboardDesc.textContent = `Environment configured for: ${useCase}. Bleeding edge activated.`;
          break;
        case 'ubuntu':
          dashboardScreen.classList.add('env-ubuntu');
          dashboardHeading.textContent = 'Ubuntu';
          dashboardDesc.textContent = `Environment configured for: ${useCase}. Welcome to stability.`;
          break;
        case 'mint':
          dashboardScreen.classList.add('env-mint');
          dashboardHeading.textContent = 'Linux Mint';
          dashboardDesc.textContent = `Environment configured for: ${useCase}. Perfect for daily driving.`;
          break;
        case 'popos':
          dashboardScreen.classList.add('env-popos');
          dashboardHeading.textContent = 'Pop!_OS';
          dashboardDesc.textContent = `Environment configured for: ${useCase}. Creator mode online.`;
          break;
        default:
          dashboardHeading.textContent = 'System Ready';
          dashboardDesc.textContent = 'Select an environment to begin.';
      }
    });
  }
});
