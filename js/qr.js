// QR page — minimal interactions
(function () {
  'use strict';

  var photos = ['assets/p3.png','assets/p4.png','assets/p5.png','assets/p6.png'];
  var photoIdx = 0;
  var avatar = document.querySelector('.mini-avatar');

  // Photo rotation
  if (avatar && photos.length > 1) {
    setInterval(function () {
      avatar.style.opacity = '0';
      setTimeout(function () {
        photoIdx = (photoIdx + 1) % photos.length;
        avatar.src = photos[photoIdx];
        avatar.style.opacity = '1';
      }, 400);
    }, 4000);
  }

  // Detect theme from CSS (prefers-color-scheme drives --bg and --text-bright)
  function isDark() {
    return window.matchMedia && !window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    return {
      bg: style.getPropertyValue('--surface-solid').trim() || (isDark() ? '#111320' : '#eceae6'),
      fg: style.getPropertyValue('--text-bright').trim() || (isDark() ? '#dee2f0' : '#1a1e28')
    };
  }

  // Generate QR code with rounded dots matching theme
  function generateQR() {
    var container = document.getElementById('qrcode');
    if (!container) return;
    container.innerHTML = '';

    var colors = getThemeColors();
    var size = 400;

    var qr = new QRious({
      element: document.createElement('canvas'),
      value: 'https://links.97115104.com',
      size: size,
      background: colors.bg,
      foreground: colors.fg,
      level: 'M',
      padding: 8
    });

    qr.canvas.style.width = '100%';
    qr.canvas.style.height = 'auto';
    qr.canvas.style.display = 'block';
    container.appendChild(qr.canvas);
  }

  generateQR();

  // Regenerate on theme change
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', generateQR);
  }

  // URL copy
  var urlDisplay = document.getElementById('url-display');
  if (urlDisplay) {
    urlDisplay.addEventListener('click', function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('https://links.97115104.com').then(function () {
          var hint = urlDisplay.querySelector('.copy-hint');
          if (hint) {
            hint.textContent = 'Copied!';
            setTimeout(function () { hint.textContent = 'Tap to copy'; }, 2000);
          }
        });
      }
    });
  }

  // Keyboard shortcuts: L = light, D = dark
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'l' || e.key === 'L') {
      document.documentElement.setAttribute('data-theme', 'light');
      generateQR();
    } else if (e.key === 'd' || e.key === 'D') {
      document.documentElement.setAttribute('data-theme', 'dark');
      generateQR();
    }
  });
})();
