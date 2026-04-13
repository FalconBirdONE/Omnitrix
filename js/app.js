document.addEventListener('DOMContentLoaded', () => {
  const distroPills = document.querySelectorAll('.distro-pill');
  distroPills.forEach((pill) => {
    requestAnimationFrame(() => {
      pill.classList.add('visible');
    });
  });

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
