// links.97115104.com — minimal interactions
(function () {
  'use strict';

  // Year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Bio toggle
  const bioToggle = document.querySelector('.bio-toggle');
  const bioPanel = document.getElementById('bio-panel');
  if (bioToggle && bioPanel) {
    bioToggle.addEventListener('click', function () {
      const open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!open));
      bioPanel.classList.toggle('open', !open);
    });
  }

  // Email modal
  const emailCard = document.querySelector('.link-card[data-email]');
  const modal = document.getElementById('email-modal');
  const modalClose = document.getElementById('modal-close');

  if (emailCard && modal) {
    emailCard.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('show');
    });

    modalClose && modalClose.addEventListener('click', function () {
      modal.classList.remove('show');
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  // Copy button
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText('x@97115104.com').then(function () {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // Easter egg
  var easterEggs = [
    "The code is more what you'd call 'guidelines' than actual rules.",
    "There are 10 types of people in the world...",
    "I don't always test my code, but when I do, I do it in production.",
    "It works on my machine. ¯\\_(ツ)_/¯",
    "sudo make me a sandwich.",
    "There's no place like 127.0.0.1",
    "!false — it's funny because it's true.",
    "A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "// TODO: write better easter eggs",
    "git commit -m 'fixed bug' (narrator: he did not fix the bug)",
    "Mass adoption is mass adoption. Making it weird makes it weird.",
    "Console.log('hello world') — where it all began",
    "My mass adoption strategy was just... making something people actually wanted.",
    "Always bet on the builder who ships on weekends.",
  ];

  var section = document.getElementById('easter-section');
  var eggBtn = document.getElementById('egg-btn');
  var dropdown = document.getElementById('egg-dropdown');
  var quote = document.getElementById('egg-quote');

  if (section && eggBtn) {
    // Show section after short delay
    setTimeout(function () {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    }, 1500);

    var dropdownOpen = false;

    function showQuote() {
      quote.textContent = easterEggs[Math.floor(Math.random() * easterEggs.length)];
    }

    eggBtn.addEventListener('click', function () {
      dropdownOpen = !dropdownOpen;
      if (dropdownOpen) {
        showQuote();
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    });

    quote.addEventListener('click', showQuote);
  }

  // Profile photo cycling
  var photos = ['assets/p3.png','assets/p4.png','assets/p5.png','assets/p6.png'];
  var photoIdx = 0;
  var profileImg = document.querySelector('.profile-photo');
  if (profileImg && photos.length > 1) {
    setInterval(function () {
      profileImg.classList.add('fade');
      setTimeout(function () {
        photoIdx = (photoIdx + 1) % photos.length;
        profileImg.src = photos[photoIdx];
        profileImg.classList.remove('fade');
      }, 600);
    }, 4000);
  }

  // Keyboard shortcuts: L = light, D = dark
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'l' || e.key === 'L') document.documentElement.setAttribute('data-theme', 'light');
    else if (e.key === 'd' || e.key === 'D') document.documentElement.setAttribute('data-theme', 'dark');
  });
})();
