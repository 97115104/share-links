// Enhanced QR Code Generator with Interactive Features
// Austin Harshberger Contact Page QR Code

document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
    initializeInteractiveEffects();
    initializeEasterEggs();
    setupActionButtons();
});

function generateQRCode() {
    // Generate QR code with mobile-optimized size
    const qr = new QRious({
        element: document.createElement('canvas'),
        value: 'https://97104.xyz',
        size: window.innerWidth < 480 ? 200 : 220,
        background: 'white',
        foreground: '#2d3748',
        level: 'M'
    });
    
    // Add the canvas to the container
    const qrContainer = document.getElementById('qrcode');
    qrContainer.appendChild(qr.canvas);
    
    // Style the canvas
    qr.canvas.style.borderRadius = '12px';
    qr.canvas.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    
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
    // Scan button functionality
    const scanBtn = document.getElementById('scan-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            // Add click animation
            scanBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                scanBtn.style.transform = '';
            }, 150);
            
            // Try to open camera if supported
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                showNotification('📸 Open your camera app and point it at the QR code!');
            } else {
                showNotification('📱 Use your phone\'s camera app to scan the QR code!');
            }
        });
    }
    
    // Share button functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            // Add click animation
            shareBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                shareBtn.style.transform = '';
            }, 150);
            
            // Try to use Web Share API
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Austin Harshberger - Contact',
                        text: 'Connect with Austin Harshberger',
                        url: 'https://97104.xyz'
                    });
                    showNotification('📤 Thanks for sharing!');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        copyToClipboard();
                    }
                }
            } else {
                copyToClipboard();
            }
        });
    }
}

function copyToClipboard() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText('https://97104.xyz').then(() => {
            showNotification('📋 URL copied to clipboard!');
        });
    } else {
        showNotification('🌐 97104.xyz - Share this link!');
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
    
    // Add hover effects to instruction items
    const instructionItems = document.querySelectorAll('.instruction-item');
    instructionItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
        
        // Stagger the initial animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
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
    
    // QR Code easter egg trigger
    const easterEggTrigger = document.getElementById('qr-easter-egg');
    if (easterEggTrigger) {
        let clickCount = 0;
        easterEggTrigger.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 3) {
                triggerQRPartyMode();
                clickCount = 0;
            } else {
                // Add bounce animation
                easterEggTrigger.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    easterEggTrigger.style.transform = '';
                }, 200);
                
                showNotification(`🎯 ${3 - clickCount} more clicks for a surprise!`);
            }
        });
    }
    
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

function triggerQRPartyMode() {
    showNotification('🎉 QR Party Mode! The code is dancing! 💃');
    
    const qrFrame = document.querySelector('.qr-frame');
    const canvas = document.querySelector('#qrcode canvas');
    
    if (qrFrame && canvas) {
        // Add party class for special styling
        qrFrame.classList.add('party-mode');
        
        // Create disco balls
        createDiscoBalls();
        
        // Enhance corner dots animation
        const cornerDots = document.querySelectorAll('.corner-dot');
        cornerDots.forEach((dot, index) => {
            dot.style.animation = `cornerPulse 0.3s ease-in-out infinite, partyRotate 1s linear infinite`;
            dot.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Enhanced scan line
        const scanLine = document.querySelector('.scan-line');
        if (scanLine) {
            scanLine.style.background = 'linear-gradient(90deg, transparent 0%, #ff6b9d 20%, #4bcffa 40%, #a55eea 60%, #26de81 80%, transparent 100%)';
            scanLine.style.animation = 'scanAnimation 1s ease-in-out infinite';
        }
        
        // Add party styles
        const partyStyle = document.createElement('style');
        partyStyle.textContent = `
            .party-mode {
                animation: partyShake 0.5s ease-in-out infinite;
            }
            
            @keyframes partyShake {
                0%, 100% { transform: translateX(0) rotate(0deg); }
                25% { transform: translateX(-2px) rotate(-1deg); }
                75% { transform: translateX(2px) rotate(1deg); }
            }
            
            @keyframes partyRotate {
                from { transform: rotate(0deg) scale(1); }
                to { transform: rotate(360deg) scale(1.2); }
            }
        `;
        document.head.appendChild(partyStyle);
        
        // Revert after 5 seconds
        setTimeout(() => {
            qrFrame.classList.remove('party-mode');
            cornerDots.forEach(dot => {
                dot.style.animation = '';
            });
            if (scanLine) {
                scanLine.style.background = '';
                scanLine.style.animation = '';
            }
            document.querySelectorAll('.disco-ball').forEach(ball => ball.remove());
            partyStyle.remove();
        }, 5000);
    }
}

function createDiscoBalls() {
    const container = document.querySelector('.qr-container');
    
    for (let i = 0; i < 6; i++) {
        const discoBall = document.createElement('div');
        discoBall.className = 'disco-ball';
        discoBall.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
            border-radius: 50%;
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            animation: discoBallFloat 2s ease-in-out infinite;
            animation-delay: ${i * 0.3}s;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
            z-index: 10;
            pointer-events: none;
        `;
        
        container.appendChild(discoBall);
    }
    
    // Add disco ball animation
    const discoStyle = document.createElement('style');
    discoStyle.textContent = `
        @keyframes discoBallFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-20px) scale(1.2) rotate(180deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(discoStyle);
    
    setTimeout(() => {
        discoStyle.remove();
    }, 5000);
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