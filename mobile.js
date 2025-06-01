(function() {
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  if (!isMobileDevice()) return;

  const fontLink = document.createElement('link');
  fontLink.rel  = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
  document.head.appendChild(fontLink);

  const style = document.createElement('style');
  style.innerHTML = `
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family:'Inter',sans-serif;
      height:100vh; margin:0; padding:0;
      position:relative; background:#fff; overflow:hidden;
    }
    .button-container {
      position:absolute; top:50%; left:50%;
      transform:translate(-50%,-50%);
      display:flex; flex-direction:column;
      align-items:center; text-align:center;
      z-index:1001; padding:0 20px;
    }
    .mobile-button {
      position:relative; overflow:hidden; z-index:1;
      display:inline-block; padding:20px 40px; margin:15px;
      font-size:18px; border:none; border-radius:25px;
      cursor:pointer; transition:transform .2s ease;
      min-width:200px; max-width:90%;
      background-color:#4CAF50;
    }
    .mobile-button::before,
    .mobile-button::after {
      content:''; position:absolute; top:0; left:0;
      width:100%; height:100%; border-radius:25px;
      z-index:-1; transition:opacity .5s ease;
    }
    .mobile-button::before {
      animation: rainbowButton 10s ease infinite;
      opacity:1;
    }
    .mobile-button::after {
      animation: rainbowButtonLight 10s ease infinite;
      opacity:0;
    }

  @keyframes rainbowButtonDark {
  0%   { color:white}
  10%  { color:white}
  20%  { color:black}
  30%  { color:white}
  40%  { color:black}
  50%  { color:black}
  60%  { color:white}
  70%  { color:white}
  80%  { color:black}
  90%  { color:black}
  100% { color:white}
}

    @keyframes rainbowButton {
    0%   { background:rgb(255, 0, 0); }
    10%  { background:rgb(1, 162, 226); }
    20%  { background:rgb(0, 247, 255); }
    30%  { background:rgb(93, 0, 165); }
    40%  { background:rgb(21, 255, 0); }
    50%  { background:rgb(255, 145, 0); }
    60%  { background:rgb(255, 0, 179); }
    70%  { background:rgb(195, 0, 255); }
    80%  { background:rgb(251, 255, 0); }
    90%  { background:rgb(0, 255, 149); }
    100% { background:rgb(255, 0, 0); }
   }


    @keyframes rainbowButtonLight {
    0%   { background-color:rgb(255, 100, 100); }
    10%  { background-color:rgb(190, 255, 255); }  
    20%  { background-color:rgb(255, 120, 255); } 
    30%  { background-color:rgb(220, 255, 149); } 
    40%  { background-color:rgb(253, 165, 49); }
    50%  { background-color:rgb(255, 190, 106) }  
    60%  { background-color:rgb(210, 255, 86); } 
    70%  { background-color:rgb(210, 255, 86); } 
    80%  { background-color:rgb(255, 255, 0); } 
    90%  { background-color:rgb(210, 197, 255); } 
    100% { background-color:rgb(255, 100, 100); } 
   }

    body.dark-mode .mobile-button {
      animation: rainbowButtonDark 10s ease infinite;
    }
    body.dark-mode .mobile-button::before { opacity:1 }
    body.dark-mode .mobile-button::after  { opacity:0 }

    body.light-mode .mobile-button {
      color:black;
      animation: none;
    }
    body.light-mode .mobile-button::before { opacity:0 }
    body.light-mode .mobile-button::after  { opacity:1 }

    .mobile-button:hover  { transform:scale(1.1) }
    .mobile-button:active { transform:scale(0.95) }

    .overlay {
      position:fixed; top:0; left:0;
      width:100%; height:100%;
      background:rgba(0,0,0,1);
      z-index:1000; pointer-events:none;
    }
    .theme-switcher {
      position:absolute; top:20px; right:20px;
      background:none; border:none; cursor:pointer;
      font-size:30px; color:white;
      z-index:2000; width:40px; height:40px;
      display:flex; justify-content:center; align-items:center;
    }
    .theme-switcher.dark { color:yellow }
  `;
  document.head.appendChild(style);

  const metaTag = document.createElement('meta');
  metaTag.name    = 'viewport';
  metaTag.content = 'width=device-width,initial-scale=1';
  document.head.appendChild(metaTag);

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  const modeSwitcherButton = document.createElement('button');
  modeSwitcherButton.className = 'theme-switcher';
  modeSwitcherButton.addEventListener('click', toggleTheme);
  document.body.appendChild(modeSwitcherButton);

  const container = document.createElement('div');
  container.className = 'button-container';
  ['View Releases Tab','Continue'].forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'mobile-button';
    btn.textContent = text;
    btn.onclick = () => window.location.href = i===0
      ? 'https://github.com/EuroSzymon/ModelViewerTest/releases'
      : 'https://euroszymon.github.io/ModelViewerTest/';
    container.appendChild(btn);
  });
  document.body.appendChild(container);
  document.querySelectorAll('.pc-buttons').forEach(b => b.style.display='none');

  function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme==='dark');
    document.body.classList.toggle('light-mode', theme==='light');
    overlay.style.backgroundColor = theme==='dark'
      ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    modeSwitcherButton.classList.toggle('dark', theme==='dark');
    modeSwitcherButton.textContent = theme==='dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const curr = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const next = curr==='dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved==='dark' || saved==='light') {
      applyTheme(saved);
    } else {
      const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(osDark ? 'dark' : 'light');
    }
    modeSwitcherButton.textContent =
      document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }

  initTheme();

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (!localStorage.getItem('theme')) location.reload();
    });

})();