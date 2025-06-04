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
    // Create a more dynamic animation that makes the black pixels move
    const ctx = canvas.getContext('2d');
    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = originalImageData.data;
    
    // Store original pixel positions and create movement data
    const pixels = [];
    const moduleSize = Math.floor(canvas.width / 25); // Approximate QR module size
    
    // Identify black pixels (QR code data)
    for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
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
                    speed: 0.02 + Math.random() * 0.01,
                    amplitude: 1 + Math.random() * 1.5
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
        
        // Draw animated pixels
        ctx.fillStyle = '#2d3748';
        
        pixels.forEach(pixel => {
            const time = elapsed * 0.001;
            
            // Create wave-like movement
            const offsetX = Math.sin(time * pixel.speed + pixel.phase) * pixel.amplitude;
            const offsetY = Math.cos(time * pixel.speed * 0.7 + pixel.phase * 1.3) * pixel.amplitude * 0.8;
            
            // Add some breathing effect
            const breathe = Math.sin(time * 0.5 + pixel.phase) * 0.3;
            
            const newX = pixel.originalX + offsetX;
            const newY = pixel.originalY + offsetY;
            
            // Draw pixel with slight size variation
            const size = 2 + breathe;
            ctx.fillRect(Math.round(newX), Math.round(newY), Math.ceil(size), Math.ceil(size));
        });
        
        // Add scanline effect every few seconds
        const scanProgress = (elapsed % 4000) / 4000;
        if (scanProgress > 0.1 && scanProgress < 0.9) {
            const scanY = (scanProgress - 0.1) * canvas.height / 0.8;
            
            // Create scanning gradient
            const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
            gradient.addColorStop(0, 'rgba(255, 107, 157, 0)');
            gradient.addColorStop(0.3, 'rgba(255, 107, 157, 0.1)');
            gradient.addColorStop(0.5, 'rgba(75, 207, 250, 0.2)');
            gradient.addColorStop(0.7, 'rgba(165, 94, 234, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 107, 157, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 20, canvas.width, 40);
        }
        
        // Add corner position markers (they should stay stable)
        drawCornerMarkers(ctx, canvas.width, canvas.height);
        
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
    
    // Temporarily replace the animated QR with a rainbow version
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Create rainbow QR effect
        let rainbowFrame;
        let startTime = Date.now();
        
        function rainbowAnimate() {
            const elapsed = Date.now() - startTime;
            const hue = (elapsed * 0.1) % 360;
            
            // Clear and redraw with rainbow effect
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Create rainbow gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsl(${hue}, 80%, 40%)`);
            gradient.addColorStop(0.2, `hsl(${(hue + 60) % 360}, 80%, 40%)`);
            gradient.addColorStop(0.4, `hsl(${(hue + 120) % 360}, 80%, 40%)`);
            gradient.addColorStop(0.6, `hsl(${(hue + 180) % 360}, 80%, 40%)`);
            gradient.addColorStop(0.8, `hsl(${(hue + 240) % 360}, 80%, 40%)`);
            gradient.addColorStop(1, `hsl(${(hue + 300) % 360}, 80%, 40%)`);
            
            ctx.fillStyle = gradient;
            
            // Redraw QR pattern with rainbow colors
            const moduleSize = Math.floor(canvas.width / 25);
            for (let y = 0; y < 25; y++) {
                for (let x = 0; x < 25; x++) {
                    // Simple QR-like pattern for rainbow effect
                    if ((x + y) % 3 === 0 || (x % 7 === 0 && y % 7 === 0)) {
                        const pixelX = x * moduleSize;
                        const pixelY = y * moduleSize;
                        ctx.fillRect(pixelX, pixelY, moduleSize, moduleSize);
                    }
                }
            }
            
            if (elapsed < 3000) {
                rainbowFrame = requestAnimationFrame(rainbowAnimate);
            } else {
                // Return to normal animation
                cancelAnimationFrame(rainbowFrame);
                // Regenerate normal QR code
                setTimeout(() => {
                    generateQRCode();
                }, 100);
            }
        }
        
        rainbowAnimate();
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