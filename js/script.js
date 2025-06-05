// Austin Harshberger Contact Page - Interactive Enhancements
// Adding delightful interactions and animations with team.js style typing

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAnimations();
    initializeInteractiveElements();
    initializeBioToggle();
    initializeEasterEggs();
    initializePerformanceOptimizations();
    initializeBeverageAnimations();
});

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
            } else {
                bioContent.classList.add('expanded');
            }
        });
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
    // Enhanced hover effects for profile image
    const profileImage = document.querySelector('.profile-image');
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
    
    // Add a subtle bounce animation
    icon.style.animation = 'bounce 0.6s ease, iconFloat 3s ease-in-out infinite';
    
    // Create ripple effect
    createRippleEffect(card, e);
}

function handleCardLeave(e) {
    const card = e.currentTarget;
    const icon = card.querySelector('.link-icon');
    
    // Reset animation to just the floating
    setTimeout(() => {
        icon.style.animation = 'iconFloat 3s ease-in-out infinite';
    }, 600);
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
    // Add special feedback for email clicks
    const emailCard = e.currentTarget;
    const originalBg = emailCard.style.background;
    
    emailCard.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
    
    setTimeout(() => {
        emailCard.style.background = originalBg;
    }, 200);
    
    // Show a subtle notification
    showNotification('Email client opening... 📧');
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
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
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
    // Disco mode
    showNotification('🕺 Disco mode activated! Austin\'s feeling groovy...');
    document.body.classList.add('disco-mode');
    
    setTimeout(() => {
        document.body.classList.remove('disco-mode');
    }, 5000);
    
    // Add disco styles
    if (!document.querySelector('#disco-styles')) {
        const discoStyles = document.createElement('style');
        discoStyles.id = 'disco-styles';
        discoStyles.textContent = `
            .disco-mode {
                animation: disco 0.5s ease-in-out infinite alternate;
            }
            
            @keyframes disco {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(discoStyles);
    }
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