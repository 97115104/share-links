// Enhanced QR Code Generator with Interactive Features
// Austin Harshberger Contact Page QR Code

// Initialize theme on page load with automatic detection
function initializeTheme() {
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
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Update aria-label based on current theme
        const updateAriaLabel = (theme) => {
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            );
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
                    regenerateQRCode();
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
                    regenerateQRCode();
                }
            }
        }, 3600000); // Check every hour
        
        // Apply smooth transition animation
        function applyThemeTransition() {
            document.body.classList.add('theme-transitioning');
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        }
        
        // Regenerate QR code with new theme colors
        function regenerateQRCode() {
            const qrContainer = document.getElementById('qrcode');
            if (qrContainer) {
                qrContainer.innerHTML = '';
                generateQRCode();
            }
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme and save user preference
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateAriaLabel(newTheme);
            applyThemeTransition();
            regenerateQRCode();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first
    initializeTheme();
    generateQRCode();
    initializeInteractiveEffects();
    initializeEasterEggs();
    setupActionButtons();
});

function generateQRCode() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Generate QR code with mobile-optimized size and theme-aware colors
    const qr = new QRious({
        element: document.createElement('canvas'),
        value: 'https://links.97115104.com',
        size: window.innerWidth < 480 ? 160 : 180,
        background: isDarkMode ? '#1a202c' : 'white',
        foreground: isDarkMode ? '#e2e8f0' : '#2d3748',
        level: 'M'
    });
    
    // Add the canvas to the container
    const qrContainer = document.getElementById('qrcode');
    qrContainer.appendChild(qr.canvas);
    
    // Style the canvas
    qr.canvas.style.borderRadius = '12px';
    qr.canvas.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    qr.canvas.style.maxWidth = '100%';
    qr.canvas.style.height = 'auto';
    
    // Add interactive hover effect
    qr.canvas.addEventListener('mouseenter', handleQRHover);
    qr.canvas.addEventListener('mouseleave', handleQRLeave);
    qr.canvas.addEventListener('click', handleQRClick);
    
    // Add subtle movement to QR code pixels (visual effect only)
    animateQRCode(qr.canvas);
}

function handleQRHover() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.transform = 'scale(1.05) translateY(-2px)';
        canvas.style.boxShadow = '0 8px 30px rgba(255, 107, 157, 0.3), 0 0 20px rgba(75, 207, 250, 0.2)';
    }
}

function handleQRLeave() {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.transform = '';
        canvas.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
}

function handleQRClick() {
    // Add a fun click effect
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.transform = 'scale(0.95)';
        setTimeout(() => {
            canvas.style.transform = '';
        }, 150);
        
        // Show a brief success message
        showNotification('QR Code ready to scan! 📱');
        
        // Add ripple effect
        createRippleEffect(canvas.parentElement, { 
            clientX: canvas.offsetLeft + canvas.offsetWidth / 2,
            clientY: canvas.offsetTop + canvas.offsetHeight / 2
        });
    }
}

function animateQRCode(canvas) {
    // Create a subtle sand-like animation that keeps pixels close to original positions
    const ctx = canvas.getContext('2d');
    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = originalImageData.data;
    
    // Store original pixel positions and create movement data
    const pixels = [];
    
    // Identify black pixels (QR code data) with higher precision
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            
            // If pixel is dark (part of QR code)
            if (r < 128 && g < 128 && b < 128) {
                pixels.push({
                    x: x,
                    y: y,
                    originalX: x,
                    originalY: y,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.005 + Math.random() * 0.005, // Much slower
                    amplitude: 0.3 + Math.random() * 0.4  // Much smaller movement
                });
            }
        }
    }
    
    let animationFrame;
    let startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated pixels with very tight movement
        ctx.fillStyle = '#2d3748';
        
        pixels.forEach(pixel => {
            const time = elapsed * 0.001;
            
            // Create very subtle wave-like movement (sand-like effect)
            const offsetX = Math.sin(time * pixel.speed + pixel.phase) * pixel.amplitude;
            const offsetY = Math.cos(time * pixel.speed * 0.8 + pixel.phase * 1.2) * pixel.amplitude * 0.7;
            
            // Keep pixels very close to original position
            const newX = pixel.originalX + offsetX;
            const newY = pixel.originalY + offsetY;
            
            // Draw single pixel (no size variation to maintain QR integrity)
            ctx.fillRect(Math.round(newX), Math.round(newY), 1, 1);
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
}

function setupActionButtons() {
    // Contact page button functionality
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            // Add click animation
            contactBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                contactBtn.style.transform = '';
            }, 150);
        });
    }
}

function copyToClipboard() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText('https://links.97115104.com').then(() => {
            showNotification('📋 URL copied to clipboard!');
        });
    } else {
        showNotification('🌐 links.97115104.com - Share this link!');
    }
}

function initializeInteractiveEffects() {
    // Enhanced URL display click functionality
    const urlDisplay = document.getElementById('url-display');
    if (urlDisplay) {
        urlDisplay.addEventListener('click', () => {
            copyToClipboard();
            
            // Add click animation
            urlDisplay.style.transform = 'scale(0.98)';
            setTimeout(() => {
                urlDisplay.style.transform = '';
            }, 150);
        });
    }
    
    // Add floating animation to background shapes with random delays
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 2000;
        setTimeout(() => {
            shape.style.animationPlayState = 'running';
        }, randomDelay);
    });
    
    // Add entrance animation to container
    const container = document.querySelector('.qr-container');
    if (container) {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 200);
    }
}

function initializeEasterEggs() {
    // Enhanced Konami code easter egg
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
            triggerRainbowExplosion();
            konamiCode = [];
        }
    });
    
    // Mini avatar click easter egg
    const miniAvatar = document.querySelector('.mini-avatar');
    if (miniAvatar) {
        let avatarClicks = 0;
        miniAvatar.addEventListener('click', () => {
            avatarClicks++;
            
            if (avatarClicks === 5) {
                triggerAvatarDance();
                avatarClicks = 0;
            } else {
                // Bounce effect
                miniAvatar.style.transform = 'scale(1.2) rotate(10deg)';
                setTimeout(() => {
                    miniAvatar.style.transform = '';
                }, 300);
            }
        });
    }
}

function triggerRainbowExplosion() {
    showNotification('🌈 Rainbow QR mode activated! Extra fabulous scanning! ✨');
    
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.1)';
        canvas.style.animation = 'qrRainbow 3s ease-in-out, qrPulse 4s ease-in-out infinite, qrFloat 6s ease-in-out infinite';
        
        // Add CSS for rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes qrRainbow {
                0%, 100% { filter: hue-rotate(0deg) saturate(1.5) brightness(1.1); }
                25% { filter: hue-rotate(90deg) saturate(2) brightness(1.2); }
                50% { filter: hue-rotate(180deg) saturate(2) brightness(1.3); }
                75% { filter: hue-rotate(270deg) saturate(2) brightness(1.2); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            canvas.style.filter = '';
            canvas.style.animation = 'qrPulse 4s ease-in-out infinite, qrFloat 6s ease-in-out infinite';
            style.remove();
        }, 3000);
    }
}

function triggerAvatarDance() {
    showNotification('🕺 Austin is feeling the rhythm! 💃');
    
    const avatar = document.querySelector('.mini-avatar');
    const pulse = document.querySelector('.profile-pulse');
    
    if (avatar) {
        avatar.style.animation = 'avatarDance 2s ease-in-out';
        
        if (pulse) {
            pulse.style.animation = 'profilePulse 0.3s ease-in-out infinite';
        }
        
        const danceStyle = document.createElement('style');
        danceStyle.textContent = `
            @keyframes avatarDance {
                0%, 100% { transform: rotate(0deg) scale(1); }
                12.5% { transform: rotate(15deg) scale(1.1); }
                25% { transform: rotate(-10deg) scale(0.9); }
                37.5% { transform: rotate(20deg) scale(1.2); }
                50% { transform: rotate(-15deg) scale(0.8); }
                62.5% { transform: rotate(10deg) scale(1.1); }
                75% { transform: rotate(-5deg) scale(1.05); }
                87.5% { transform: rotate(5deg) scale(0.95); }
            }
        `;
        document.head.appendChild(danceStyle);
        
        setTimeout(() => {
            avatar.style.animation = '';
            if (pulse) {
                pulse.style.animation = 'profilePulse 3s ease-in-out infinite';
            }
            danceStyle.remove();
        }, 2000);
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
        background: radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%);
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
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    setTimeout(() => {
        ripple.remove();
        rippleStyle.remove();
    }, 600);
}

function showNotification(message) {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(165, 94, 234, 0.95));
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 1000;
        font-weight: 500;
        font-size: 0.9rem;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 90vw;
        text-align: center;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade in with bounce
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(5px)';
    }, 100);
    
    // Bounce back
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0px)';
    }, 200);
    
    // Fade out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Accessibility: Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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