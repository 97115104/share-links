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
    
    // Easter egg dropdown functionality
    const easterEggBtn = document.getElementById('easter-egg-btn');
    const easterEggDropdown = document.getElementById('easter-egg-dropdown');
    
    if (easterEggBtn && easterEggDropdown) {
        easterEggBtn.addEventListener('click', () => {
            const isOpen = easterEggBtn.getAttribute('aria-expanded') === 'true';
            
            if (!isOpen) {
                // Open dropdown
                easterEggBtn.setAttribute('aria-expanded', 'true');
                easterEggDropdown.classList.add('open');
                
                // Add bounce animation to egg
                easterEggBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    easterEggBtn.style.transform = '';
                }, 200);
                
                showNotification('🥚 Hidden wisdom awaits your discovery...');
            } else {
                // Close dropdown
                easterEggBtn.setAttribute('aria-expanded', 'false');
                easterEggDropdown.classList.remove('open');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!easterEggBtn.contains(e.target) && !easterEggDropdown.contains(e.target)) {
                easterEggBtn.setAttribute('aria-expanded', 'false');
                easterEggDropdown.classList.remove('open');
            }
        });
    }
    
    // Enhanced easter egg quote with typing animation like team.js
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
        let currentPhase = 0; // 0: initial egg, 1: egg clicked, 2: typing, 3: final
        let isTyping = false;
        
        // Initialize with golden egg
        easterEgg.innerHTML = '🥚';
        easterEgg.classList.add('golden-egg');
        
        easterEgg.addEventListener('click', (e) => {
            if (currentPhase === 0 && !isTyping) {
                // First click - show hint to click again
                showClickAgainHint(easterEgg);
                currentPhase = 1;
                e.stopPropagation();
            } else if (currentPhase === 1 && !isTyping) {
                // Second click - start typing quote and show zen animation
                startTypingAnimation(easterEgg, '"silent waiting on the truth, pure sitting and breathing in the presence of the question mark."');
                showZenBookAnimation();
                currentPhase = 2;
                e.stopPropagation();
            } else if (currentPhase === 2 && !isTyping) {
                // Hidden third click - show startup interpretation (user has to find this)
                showStartupInterpretation();
                e.stopPropagation();
            }
        });
        
        // Hover effects for the golden egg
        easterEgg.addEventListener('mouseenter', () => {
            if (currentPhase === 0) {
                easterEgg.style.transform = 'scale(1.1)';
            }
        });
        
        easterEgg.addEventListener('mouseleave', () => {
            if (currentPhase === 0) {
                easterEgg.style.transform = '';
            }
        });
        
        // Function to show click again hint
        function showClickAgainHint(element) {
            element.innerHTML = '✨ Click again for a moment of startup bliss via quotation ✨';
            element.classList.remove('golden-egg');
            element.classList.add('hint-mode');
            element.style.background = 'rgba(255, 215, 0, 0.1)';
            element.style.borderLeftColor = '#ffd700';
            element.style.color = '#b8860b';
            element.style.fontSize = '0.95rem';
            
            showNotification('🥇 The golden wisdom awaits your second touch...');
        }
        
        // Function to show zen book animation across screen
        function showZenBookAnimation() {
            const zenContainer = document.createElement('div');
            zenContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(123, 104, 238, 0.1);
                backdrop-filter: blur(2px);
                animation: zenFadeIn 1s ease-out;
            `;
            
            // Create book with zen emojis
            const bookElement = document.createElement('div');
            bookElement.style.cssText = `
                font-size: 4rem;
                animation: zenBookFloat 1s ease-out;
                display: flex;
                align-items: center;
                gap: 1rem;
            `;
            bookElement.innerHTML = '🧘‍♂️ 📖 🧘‍♀️';
            
            // Add floating zen elements around the book
            const zenEmojis = ['🧘‍♂️', '🧘‍♀️', '🕯️', '🌸', '☯️', '🍃', '💫'];
            for (let i = 0; i < 12; i++) {
                const zenElement = document.createElement('div');
                zenElement.textContent = zenEmojis[Math.floor(Math.random() * zenEmojis.length)];
                zenElement.style.cssText = `
                    position: absolute;
                    font-size: 2rem;
                    left: ${20 + Math.random() * 60}%;
                    top: ${20 + Math.random() * 60}%;
                    animation: zenFloat ${1 + Math.random() * 0.5}s ease-out;
                    opacity: 0.8;
                `;
                zenContainer.appendChild(zenElement);
            }
            
            zenContainer.appendChild(bookElement);
            document.body.appendChild(zenContainer);
            
            // Add zen animation styles
            const zenStyle = document.createElement('style');
            zenStyle.textContent = `
                @keyframes zenFadeIn {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
                
                @keyframes zenBookFloat {
                    0% { 
                        transform: scale(0.5) translateY(50px);
                        opacity: 0;
                    }
                    50% { 
                        transform: scale(1.2) translateY(0px);
                        opacity: 1;
                    }
                    100% { 
                        transform: scale(1) translateY(-20px);
                        opacity: 0.8;
                    }
                }
                
                @keyframes zenFloat {
                    0% { 
                        transform: scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    50% { 
                        transform: scale(1.2) rotate(180deg);
                        opacity: 1;
                    }
                    100% { 
                        transform: scale(0.8) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(zenStyle);
            
            // Remove after 1 second
            setTimeout(() => {
                zenContainer.remove();
                zenStyle.remove();
            }, 1000);
        }
        
        // Function to start typing animation - based on team.js (without cursor)
        function startTypingAnimation(element, text) {
            isTyping = true;
            
            // Clear the element and add typing class
            element.innerHTML = '';
            element.classList.add('typing');
            element.classList.add('revealed');
            element.classList.remove('hint-mode');
            
            // Parse text and tags
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const textAndTags = extractTextAndTags(doc.body);
            
            let currentIndex = 0;
            let currentString = '';
            
            // Function to type one character at a time
            function typeNextChar() {
                if (currentIndex < textAndTags.length) {
                    const item = textAndTags[currentIndex];
                    
                    if (item.type === 'text') {
                        // Add one character at a time for text
                        if (item.content.length > 0) {
                            currentString += item.content.charAt(0);
                            item.content = item.content.substring(1);
                            element.innerHTML = currentString;
                            
                            // Continue typing after a short delay
                            setTimeout(typeNextChar, 40 + Math.random() * 20);
                        } else {
                            currentIndex++;
                            typeNextChar();
                        }
                    } else if (item.type === 'tag') {
                        // Add entire tag at once
                        currentString += item.content;
                        element.innerHTML = currentString;
                        currentIndex++;
                        
                        // Continue immediately to the next item
                        typeNextChar();
                    }
                } else {
                    // Typing completed
                    setTimeout(() => {
                        element.classList.remove('typing');
                        isTyping = false;
                        showNotification('💭 The deepest truths require the most searching...');
                        
                        // Add subtle hint for the final easter egg
                        setTimeout(() => {
                            element.style.cursor = 'pointer';
                            element.title = 'There may be more to discover...';
                        }, 3000);
                    }, 1000);
                }
            }
            
            // Start typing
            typeNextChar();
        }
        
        // Extract HTML structure (text vs tags) - from team.js
        function extractTextAndTags(node) {
            const items = [];
            
            Array.from(node.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    // Text node
                    items.push({
                        type: 'text',
                        content: child.textContent
                    });
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    // Element node (tags)
                    const outerHTML = child.outerHTML;
                    const innerHTML = child.innerHTML;
                    
                    // Get opening tag
                    const openingTag = outerHTML.substring(0, outerHTML.indexOf(innerHTML));
                    items.push({
                        type: 'tag',
                        content: openingTag
                    });
                    
                    // Process children recursively
                    items.push(...extractTextAndTags(child));
                    
                    // Get closing tag
                    const closingTag = outerHTML.substring(outerHTML.indexOf(innerHTML) + innerHTML.length);
                    items.push({
                        type: 'tag',
                        content: closingTag
                    });
                }
            });
            
            return items;
        }
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
    
    // Show notification
    showNotification('🦄 Unicorn magic activated! You\'ve unlocked fabulous mode! ✨');
    
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
    const interpretationContent = `
        <div style="text-align: left; line-height: 1.6; font-size: 0.95rem;">
            <h3 style="color: #667eea; margin-bottom: 1rem; text-align: center;">🍰 The Startup Zen of Silent Waiting</h3>
            
            <div style="background: rgba(255, 107, 157, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border-left: 4px solid #ff6b9d;">
                <strong>Silent Waiting on the Truth</strong><br>
                Every startup founder knows this feeling—that 3am moment when you're staring at metrics, wondering if your hypothesis is right. The silence between launching a feature and seeing if users actually want it. The truth reveals itself slowly, not through force or frantic pivoting, but through patient observation.
            </div>
            
            <div style="background: rgba(102, 126, 234, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border-left: 4px solid #667eea;">
                <strong>Pure Sitting and Breathing</strong><br>
                In a world of "move fast and break things," there's profound power in stillness. The best product decisions come not from panic-building every feature request, but from sitting with the problem until the elegant solution emerges. Sometimes the most productive thing a founder can do is... nothing.
            </div>
            
            <div style="background: rgba(123, 104, 238, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem; border-left: 4px solid #7b68ee;">
                <strong>In the Presence of the Question Mark</strong><br>
                Startups are fundamentally exercises in sitting comfortably with massive uncertainty. Will this work? Will people pay? Will we run out of money? The question mark isn't the enemy—it's the space where innovation lives. It's where "what if" becomes "why not."
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; padding: 1rem; background: rgba(0, 0, 0, 0.02); border-radius: 8px;">
                <em style="color: #4a5568;">"The best startups aren't built in the noise of certainty,<br>but in the quiet confidence of questions worth asking."</em>
            </div>
        </div>
    `;
    
    // Create beautiful modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        animation: modalFadeIn 0.3s ease-out;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2.5rem;
        border-radius: 20px;
        max-width: 700px;
        width: 100%;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        position: relative;
        max-height: 85vh;
        overflow-y: auto;
        animation: modalSlideUp 0.4s ease-out;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #9ca3af;
        padding: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = '#f3f4f6';
        closeButton.style.color = '#374151';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'none';
        closeButton.style.color = '#9ca3af';
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes modalSlideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    content.innerHTML = interpretationContent;
    content.appendChild(closeButton);
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close handlers
    closeButton.addEventListener('click', () => {
        modal.style.animation = 'modalFadeIn 0.2s ease-out reverse';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 200);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'modalFadeIn 0.2s ease-out reverse';
            setTimeout(() => {
                modal.remove();
                style.remove();
            }, 200);
        }
    });
    
    // Close on escape
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            modal.style.animation = 'modalFadeIn 0.2s ease-out reverse';
            setTimeout(() => {
                modal.remove();
                style.remove();
            }, 200);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    showNotification('🎂 The deeper layer of startup philosophy revealed!');
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