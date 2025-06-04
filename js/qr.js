// QR Code Generator with Animation Effects
// Austin Harshberger Contact Page QR Code

document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
    initializeInteractiveEffects();
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
    }
}

function animateQRCode(canvas) {
    // Create a subtle shimmer effect over the QR code
    const ctx = canvas.getContext('2d');
    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    let animationFrame;
    let startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed % 4000) / 4000; // 4 second cycle
        
        // Reset to original
        ctx.putImageData(originalImageData, 0, 0);
        
        // Add subtle color variations to simulate movement
        if (progress > 0.3 && progress < 0.7) {
            const intensity = Math.sin((progress - 0.3) * Math.PI / 0.4) * 0.1;
            
            // Create subtle overlay effect
            ctx.globalCompositeOperation = 'overlay';
            ctx.globalAlpha = intensity;
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(255, 107, 157, 0.1)');
            gradient.addColorStop(0.5, 'rgba(75, 207, 250, 0.1)');
            gradient.addColorStop(1, 'rgba(165, 94, 234, 0.1)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }
        
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

function initializeInteractiveEffects() {
    // Add click effect to URL display
    const urlDisplay = document.querySelector('.url-display');
    if (urlDisplay) {
        urlDisplay.addEventListener('click', () => {
            // Copy URL to clipboard if possible
            if (navigator.clipboard) {
                navigator.clipboard.writeText('https://97104.xyz').then(() => {
                    showNotification('URL copied to clipboard! 📋');
                });
            } else {
                showNotification('97104.xyz - Austin\'s contact page 🌐');
            }
        });
        
        // Add cursor pointer to indicate clickability
        urlDisplay.style.cursor = 'pointer';
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

function showNotification(message) {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 1000;
        font-weight: 500;
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Fade out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Easter egg: Konami code for fun effect
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

function triggerRainbowExplosion() {
    showNotification('🌈 Rainbow mode activated! Extra fabulous QR code! ✨');
    
    // Add temporary rainbow effect to QR code
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.1)';
        canvas.style.animation = 'qrRainbow 2s ease-in-out';
        
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
        }, 2000);
    }
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