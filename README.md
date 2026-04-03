# Share Links Page

A modern, animated, and professional links page designed for easy sharing at conferences and for social networking, with a QR code sharing feature.

## 📁 Project Structure

```
share-links/
├── index.html              # Main contact page
├── qr.html                 # Mobile-optimized animated QR code page
├── css/
│   └── styles.css          # Main page styling and animations
├── js/
│   └── script.js           # Main page interactive features
├── qr.css                  # QR page styling with rainbow animations
├── qr.js                   # QR page animations and effects
├── assets/
│   ├── profile.jpg         # Austin's profile photo (400x400px recommended)
│   ├── favicon.png         # Site favicon
│   ├── prideflag.gif       # Animated pride flag
│   └── qr-code.png # Static QR code for README
├── claude-generated.svg    # Custom Claude attestation badge
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/share-links
cd share-links
```

### 2. Add Required Assets
Add these images to the `assets/` folder:
- **`profile.jpg`**: Professional headshot (square, 400x400px+)
- **`favicon.png`**: Site icon (32x32 or 64x64px)
- **`prideflag.gif`**: Animated pride flag (any size, will be scaled)

### 3. Serve Locally
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Or simply open index.html in your browser
```

### 4. Deploy
Upload to any static hosting service:
- **GitHub Pages**: Perfect for personal domains
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Cloudflare Pages**: Fast global CDN

## 🎨 Customization Guide

### Color Scheme
The rainbow theme uses these pastel colors:
```css
/* Main gradient colors */
#ffb3ba /* soft pink */
#ffdfba /* soft orange */
#ffffba /* soft yellow */
#baffc9 /* soft green */
#bae1ff /* soft blue */
#c9baff /* soft purple */
```

### Personal Information
Update these sections in `index.html`:
- **Bio text**: Personal description and networking goals
- **Contact links**: Social media URLs and contact methods
- **Company information**: Projects and descriptions
- **Quote**: Personal philosophy or motto

### QR Code Customization
Modify `qr.js` to change:
```javascript
// QR code target URL
value: 'https://links.97115104.com'

// Animation parameters
amplitude: 0.3 + Math.random() * 0.4  // Pixel movement range
speed: 0.005 + Math.random() * 0.005  // Animation speed
```

### Animations
Adjust animation timing in CSS files:
```css
/* Background animation speed */
animation: rainbowShift 30s ease-in-out infinite;

/* QR scanner timing */
animation: rainbowScan 4s ease-in-out infinite;
```

## 🛠 Technical Details

### Dependencies
- **External**: Font Awesome icons, Google Fonts (Inter), QRious.js (QR page only)
- **Local**: Pure vanilla HTML/CSS/JavaScript
- **Animation**: CSS transforms and canvas-based QR animations

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Accessibility**: WCAG AA compliant, keyboard navigable, respects reduced motion

### Performance
- **Lightweight**: Minimal dependencies, optimized assets
- **Fast Loading**: CSS animations hardware-accelerated
- **Mobile Optimized**: Responsive images and touch-friendly design
- **No Tracking**: Privacy-first, no external analytics
- **Smooth Animations**: 60fps QR code animation with proper cleanup

## 🔧 Development

### Local Development
```bash
# Watch for changes (if using a build tool)
npm run dev

# Or simply edit files and refresh browser
```

### File Organization
- **Main Page**: `index.html`, `css/styles.css`, `js/script.js`
- **QR Page**: `qr.html`, `qr.css`, `qr.js`
- **Assets**: All images and icons in `assets/` folder
- **Badges**: Custom SVG attestation badges in root

### Customization Tips
- **Colors**: Update CSS custom properties for easy theming
- **Content**: All text content clearly marked in HTML
- **Animations**: Adjust timing variables for different feels
- **Layout**: CSS Grid and Flexbox for easy modifications

## 📜 License

MIT License - feel free to fork, modify, and use for your own projects!

## 🤝 Contributing

This is a personal contact page, but if you spot bugs or have suggestions:
1. Open an issue
2. Submit a pull request
3. Reach out via any of the contact methods on the page

## 📞 Contact

Find Austin through any of the methods on the contact page, or:
- **Email**: founder@status.health
- **LinkedIn**: [aharshbe](https://www.linkedin.com/in/aharshbe/)
- **Blog**: [97115104.com](https://97115104.com/)
- **QR Code**: Scan the code above or visit [links.97115104.com](https://links.97115104.com)

---

*"silent waiting on the truth, pure sitting and breathing in the presence of the question mark."*

**Built with ❤️, 🌈, and a touch of ✨ by Austin Harshberger**

**AI Assistance**: Created with help from Claude AI ([attest.97115104.com](https://attest.97115104.com) verified)
