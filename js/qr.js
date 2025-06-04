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

function drawCornerMarkers(ctx, width, height) {
    // Draw the three corner position detection patterns (keep them stable)
    const markerSize = Math.floor(width / 25) * 7; // 7x7 modules
    const markerPositions = [
        { x: 0, y: 0 }, // Top-left
        { x: width - markerSize, y: 0 }, // Top-right
        { x: 0, y: height - markerSize } // Bottom-left
    ];
    
    ctx.fillStyle = '#2d3748';
    
    markerPositions.forEach(pos => {
        // Outer border
        ctx.fillRect(pos.x, pos.y, markerSize, markerSize);
        
        // Inner white square
        ctx.fillStyle = 'white';
        const innerMargin = Math.floor(markerSize / 7);
        ctx.fillRect(
            pos.x + innerMargin, 
            pos.y + innerMargin, 
            markerSize - 2 * innerMargin, 
            markerSize - 2 * innerMargin
        );
        
        // Center black square
        ctx.fillStyle = '#2d3748';
        const centerMargin = Math.floor(markerSize / 7) * 2;
        ctx.fillRect(
            pos.x + centerMargin, 
            pos.y + centerMargin, 
            markerSize - 4 * centerMargin, 
            markerSize - 4 * centerMargin
        );
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
    
    // Add temporary rainbow filter effect instead of breaking the QR code
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        canvas.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.1)';
        canvas.style.animation = 'qrRainbow 3s ease-in-out';
        
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