// Austin Harshberger Contact Page - Interactive Enhancements
// Adding delightful interactions and animations with team.js style typing

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeTheme();
    initializeAnimations();
    initializeInteractiveElements();
    initializeBioToggle();
    initializeEasterEggs();
    initializePerformanceOptimizations();
    initializeBeverageAnimations();
    initializeEmailModal();
});

// Theme toggle functionality with automatic detection
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Determine the appropriate theme based on user preference, system preference, and time
    function getAutoTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        // If user has manually set a theme, use that
        if (savedTheme && savedTheme !== 'auto') {
            return savedTheme;
        }
        
        // Check system preference first
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Fall back to time-based detection
        const hour = new Date().getHours();
        // Dark mode from 7 PM to 7 AM
        return (hour >= 19 || hour < 7) ? 'dark' : 'light';
    }
    
    // Apply the determined theme
    const currentTheme = getAutoTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle button aria-label
    const updateAriaLabel = (theme) => {
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggle.setAttribute('aria-label', label);
    };
    
    updateAriaLabel(currentTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-update if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme || savedTheme === 'auto') {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateAriaLabel(newTheme);
                applyThemeTransition();
            }
        });
    }
    
    // Check time-based theme change every hour
    setInterval(() => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme || savedTheme === 'auto') {
            const newTheme = getAutoTheme();
            const currentAppliedTheme = document.documentElement.getAttribute('data-theme');
            if (newTheme !== currentAppliedTheme) {
                document.documentElement.setAttribute('data-theme', newTheme);
                updateAriaLabel(newTheme);
                applyThemeTransition();
            }
        }
    }, 3600000); // Check every hour
    
    // Apply smooth transition animation
    function applyThemeTransition() {
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme and save user preference
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateAriaLabel(newTheme);
        applyThemeTransition();
    });
}

// Bio toggle functionality
function initializeBioToggle() {
    const bioToggle = document.querySelector('.bio-toggle');
    const bioContent = document.querySelector('.bio-content');
    
    if (bioToggle && bioContent) {
        bioToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                bioContent.classList.remove('expanded');
                // Remove waving emoji
                const wavingEmoji = bioContent.querySelector('.waving-emoji');
                if (wavingEmoji) {
                    wavingEmoji.remove();
                }
            } else {
                bioContent.classList.add('expanded');
                // Add waving emoji after "Product leader"
                addWavingEmoji();
            }
        });
    }
}

function addWavingEmoji() {
    const bioText = document.querySelector('.bio-text');
    if (bioText && !bioText.querySelector('.waving-emoji')) {
        // Add emoji inline with the text, right before "Product leader"
        const textContent = bioText.innerHTML;
        const updatedContent = textContent.replace(
            'Product leader',
            '<span class="waving-emoji" style="display: inline-block; font-size: 1.1rem; margin-right: 0.2rem; animation: wave 1.5s ease-in-out infinite; transform-origin: 70% 70%; vertical-align: baseline; filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));">👋</span> Product leader'
        );
        bioText.innerHTML = updatedContent;
        
        // Add wave animation if not already present
        if (!document.querySelector('#wave-animation')) {
            const style = document.createElement('style');
            style.id = 'wave-animation';
            style.textContent = `
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60%, 100% { transform: rotate(0deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Random rotation for beverage emojis - from team.js
function initializeBeverageAnimations() {
    const beverageEmojis = document.querySelectorAll('.beverage-emoji');
    beverageEmojis.forEach(emoji => {
        const randomDelay = Math.random() * 2;
        emoji.style.animationDelay = `${randomDelay}s`;
    });
}

// Animation and interaction handlers
function initializeAnimations() {
    // Stagger animation for link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Company links stagger animation
    const companyLinks = document.querySelectorAll('.company-link');
    companyLinks.forEach((link, index) => {
        link.style.animationDelay = `${(linkCards.length + index) * 0.1}s`;
        link.classList.add('fade-in-up');
    });

    // Add CSS for fade-in-up animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function initializeInteractiveElements() {
    // Profile image rotation setup
    const profileImages = ['p1.png', 'p2.png', 'p3.png', 'p4.png', 'p5.png'];
    let currentProfileIndex = 0;
    const profileImage = document.querySelector('.profile-image');
    
    // Function to rotate profile image
    function rotateProfileImage() {
        if (profileImage) {
            currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
            profileImage.src = `assets/${profileImages[currentProfileIndex]}`;
        }
    }
    
    // Rotate profile image every 5 seconds
    setInterval(rotateProfileImage, 5000);
    
    // Enhanced hover effects for profile image
    const profileGlow = document.querySelector('.profile-glow');
    
    profileImage.addEventListener('mouseenter', () => {
        profileGlow.style.opacity = '1';
        profileGlow.style.filter = 'blur(15px)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileGlow.style.opacity = '0.6';
        profileGlow.style.filter = 'blur(20px)';
    });

    // Interactive link cards with sound effects (visual feedback)
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
        card.addEventListener('click', handleCardClick);
    });

    // Company links interactive effects
    const companyLinks = document.querySelectorAll('.company-link');
    companyLinks.forEach(link => {
        link.addEventListener('mouseenter', handleCompanyHover);
        link.addEventListener('mouseleave', handleCompanyLeave);
    });

    // Email link special behavior
    const emailLink = document.querySelector('.email');
    if (emailLink) {
        emailLink.addEventListener('click', handleEmailClick);
    }
}

function handleCardHover(e) {
    const card = e.currentTarget;
    const icon = card.querySelector('.link-icon');
    
    // Simple scale effect on hover
    icon.style.transform = 'scale(1.1)';
}

function handleCardLeave(e) {
    const card = e.currentTarget;
    const icon = card.querySelector('.link-icon');
    
    // Reset transform
    icon.style.transform = '';
}

function handleCardClick(e) {
    const card = e.currentTarget;
    
    // Add click animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Analytics or tracking could go here
    trackLinkClick(card);
}

function handleCompanyHover(e) {
    const link = e.currentTarget;
    const icon = link.querySelector('i');
    
    // Rotate the external link icon
    icon.style.transform = 'rotate(45deg) scale(1.2)';
}

function handleCompanyLeave(e) {
    const link = e.currentTarget;
    const icon = link.querySelector('i');
    
    // Reset icon transform
    icon.style.transform = '';
}

function handleEmailClick(e) {
    e.preventDefault();
    
    // Open email modal
    const modal = document.getElementById('email-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Add click animation to email card
        const emailCard = e.currentTarget;
        emailCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            emailCard.style.transform = '';
        }, 150);
    }
}

function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeEasterEggs() {
    // Konami code easter egg (up, up, down, down, left, right, left, right, b, a)
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            triggerEasterEgg();
            konamiCode = [];
        }
    });
    
    // Click counter easter egg on profile image
    let clickCount = 0;
    const profileImageContainer = document.querySelector('.profile-image-container');
    if (profileImageContainer) {
        profileImageContainer.style.cursor = 'pointer';
        profileImageContainer.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;
            if (clickCount === 4) {
                triggerProfileEasterEgg();
                clickCount = 0;
            }
        });
    }
    
    // Pride badge unicorn easter egg
    const prideBadge = document.querySelector('.pride-badge');
    if (prideBadge) {
        let unicornClickCount = 0;
        prideBadge.addEventListener('click', () => {
            unicornClickCount++;
            if (unicornClickCount === 3) {
                triggerUnicornMode();
                unicornClickCount = 0;
            }
        });
    }
}

function triggerEasterEgg() {
    // Matrix-style rain effect
    showNotification('🎉 Konami Code Activated! Welcome to the Matrix...');
    createMatrixRain();
}

function triggerUnicornMode() {
    const prideBadge = document.querySelector('.pride-badge');
    const prideText = document.querySelector('.pride-text');
    
    // Add unicorn mode class
    prideBadge.classList.add('unicorn-mode');
    
    // Change text temporarily
    const originalText = prideText.textContent;
    prideText.textContent = '🦄 Magical & Fabulous 🦄';
    
    // Create sparkles container
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'unicorn-sparkles';
    prideBadge.appendChild(sparklesContainer);
    
    // Create sparkles
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🔮'];
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparklesContainer.appendChild(sparkle);
    }
    
    // Create floating unicorns
    createFloatingUnicorns();
    
    // Revert after 8 seconds
    setTimeout(() => {
        prideBadge.classList.remove('unicorn-mode');
        prideText.textContent = originalText;
        sparklesContainer.remove();
    }, 8000);
}

function triggerProfileEasterEgg() {
    const quote = "silent waiting on the truth, pure sitting and breathing in the presence of the question mark.";
    
    // Create quote overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
        padding: 1rem;
    `;
    
    const quoteContainer = document.createElement('div');
    quoteContainer.style.cssText = `
        max-width: 90%;
        text-align: center;
        padding: 2rem;
    `;
    
    const quoteText = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    quoteText.style.cssText = `
        font-size: ${isMobile ? '1.2rem' : '2rem'};
        color: white;
        font-family: 'Georgia', serif;
        font-style: italic;
        line-height: 1.8;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease;
        white-space: normal;
        word-wrap: break-word;
    `;
    
    // Create sparkle emojis around the quote
    const createSparkle = () => {
        const sparkle = document.createElement('div');
        const emojis = ['✨', '⭐', '🌟', '💫', '🌠'];
        sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatAndFade 4s ease-out forwards;
            pointer-events: none;
        `;
        overlay.appendChild(sparkle);
    };
    
    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatAndFade {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0);
            }
            20% {
                opacity: 1;
                transform: translateY(-10px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.5);
            }
        }
        
        @keyframes typewriter {
            from {
                width: 0;
            }
            to {
                width: 100%;
            }
        }
        
        .typewriter-text {
            display: inline-block;
            overflow: hidden;
            white-space: ${isMobile ? 'normal' : 'nowrap'};
            ${isMobile ? '' : 'border-right: 3px solid white;'}
            animation: ${isMobile ? 'fadeIn 2s ease forwards' : `typewriter 4s steps(${quote.length}) forwards, blink 0.75s step-end infinite`};
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes blink {
            50% {
                border-color: transparent;
            }
        }
    `;
    document.head.appendChild(style);
    
    quoteContainer.appendChild(quoteText);
    overlay.appendChild(quoteContainer);
    document.body.appendChild(overlay);
    
    // Trigger animations
    setTimeout(() => {
        overlay.style.opacity = '1';
        
        // Create sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(createSparkle, i * 200);
        }
        
        // Animate quote
        setTimeout(() => {
            quoteText.style.opacity = '1';
            quoteText.style.transform = 'translateY(0)';
            // For mobile, just show the text; for desktop, use typewriter effect
            if (isMobile) {
                quoteText.innerHTML = `<div class="typewriter-text">"${quote}"</div>`;
            } else {
                quoteText.innerHTML = `<span class="typewriter-text">"${quote}"</span>`;
            }
        }, 500);
    }, 100);
    
    // Remove overlay on click or after delay
    const removeOverlay = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 500);
    };
    
    overlay.addEventListener('click', removeOverlay);
    setTimeout(removeOverlay, 8000);
}

function showStartupInterpretation() {
    // Removed - easter egg no longer needed
}

function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
        drop.style.cssText = `
            position: absolute;
            color: #0f0;
            font-family: monospace;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            animation: matrix-fall ${Math.random() * 3 + 2}s linear infinite;
            opacity: 0.8;
        `;
        matrixContainer.appendChild(drop);
    }
    
    document.body.appendChild(matrixContainer);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-fall {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        matrixContainer.remove();
        style.remove();
    }, 5000);
}

function createChampagneBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    
    // Create multiple waves of bubbles
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                const bubble = document.createElement('div');
                const size = Math.random() * 25 + 8;
                const delay = Math.random() * 1000;
                
                bubble.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle at 30% 30%, 
                        rgba(255,215,0,0.9) 0%, 
                        rgba(255,193,7,0.7) 30%, 
                        rgba(255,152,0,0.5) 60%,
                        rgba(255,87,34,0.3) 100%);
                    border-radius: 50%;
                    bottom: -50px;
                    left: ${Math.random() * 100}%;
                    animation: champagneBubble ${Math.random() * 4 + 4}s ease-out ${delay}ms forwards;
                    box-shadow: 
                        inset -2px -2px 4px rgba(255,215,0,0.3),
                        0 0 10px rgba(255,215,0,0.2);
                `;
                
                // Add sparkle effect
                if (Math.random() > 0.7) {
                    bubble.style.boxShadow += ', 0 0 20px rgba(255,255,255,0.8)';
                }
                
                bubbleContainer.appendChild(bubble);
            }
        }, wave * 500);
    }
    
    document.body.appendChild(bubbleContainer);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes champagneBubble {
            0% { 
                transform: translateY(0) translateX(0) scale(0) rotate(0deg); 
                opacity: 1; 
            }
            10% {
                transform: translateY(-10vh) translateX(${Math.random() * 20 - 10}px) scale(1) rotate(45deg);
                opacity: 0.9;
            }
            30% { 
                transform: translateY(-30vh) translateX(${Math.random() * 40 - 20}px) scale(1.2) rotate(180deg); 
                opacity: 0.8; 
            }
            60% {
                transform: translateY(-60vh) translateX(${Math.random() * 30 - 15}px) scale(0.8) rotate(270deg);
                opacity: 0.6;
            }
            100% { 
                transform: translateY(-110vh) translateX(${Math.random() * 50 - 25}px) scale(0.3) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        bubbleContainer.remove();
        style.remove();
    }, 10000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(102, 126, 234, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function trackLinkClick(card) {
    const linkType = card.classList[1]; // Get the second class (email, linkedin, etc.)
    console.log(`Link clicked: ${linkType}`);
    
    // Here you could send analytics to your preferred service
    // Example: gtag('event', 'click', { 'event_category': 'contact', 'event_label': linkType });
}

function initializePerformanceOptimizations() {
    // Lazy load animations for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.bio-section, .links-section, .companies-section').forEach(el => {
        observer.observe(el);
    });
    
    // Preload critical animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        .animate-in {
            animation: slideInFromBottom 0.8s ease-out;
        }
        
        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}


// Utility function to detect if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Disable animations for users who prefer reduced motion
if (prefersReducedMotion()) {
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Email modal functionality
function initializeEmailModal() {
    const modal = document.getElementById('email-modal');
    const closeButton = modal?.querySelector('.modal-close');
    const copyButton = modal?.querySelector('.copy-button');
    
    // Close modal functionality
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close on background click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
    
    // Copy email functionality
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const email = copyButton.dataset.email;
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Visual feedback
                copyButton.classList.add('copied');
                const originalText = copyButton.querySelector('span:last-child').textContent;
                copyButton.querySelector('span:last-child').textContent = 'Copied!';
                copyButton.querySelector('.copy-icon').textContent = '✅';
                
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.querySelector('span:last-child').textContent = originalText;
                    copyButton.querySelector('.copy-icon').textContent = '📋';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'absolute';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyButton.classList.add('copied');
                    const originalText = copyButton.querySelector('span:last-child').textContent;
                    copyButton.querySelector('span:last-child').textContent = 'Copied!';
                    copyButton.querySelector('.copy-icon').textContent = '✅';
                    
                    setTimeout(() => {
                        copyButton.classList.remove('copied');
                        copyButton.querySelector('span:last-child').textContent = originalText;
                        copyButton.querySelector('.copy-icon').textContent = '📋';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy email:', err);
                    showNotification('Failed to copy email 😕');
                }
                
                document.body.removeChild(textArea);
            }
        });
    }
}