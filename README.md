# Austin Harshberger - Conference Contact Page

A modern, animated, and professional contact page designed for conference networking and QR code sharing. Built with pure HTML, CSS, and JavaScript featuring delightful animations, LGBTQ+ pride representation, a subtle rainbow aesthetic, and a mesmerizing animated QR code.

## 🌟 Live Demo

Visit the live page at **[97104.xyz](https://97104.xyz)**

Scan this QR code to access on mobile:

![QR Code for 97104.xyz](assets/qr-code-97104xyz.png)

*QR Code points to https://97104.xyz*

## ✨ Features

### 🎨 **Visual Design**
- **Subtle Rainbow Theme**: Pastel rainbow gradient background with smooth color transitions
- **Glass Morphism**: Modern frosted glass effect for main content area
- **Floating Animations**: Organic morphing shapes that dance in the background
- **Professional Typography**: Clean Inter font with animated gradient text effects
- **Responsive Design**: Looks stunning on mobile, tablet, and desktop

### 🏳️‍🌈 **LGBTQ+ Representation**
- **Animated Pride Flag**: GIF badge showing pride in identity
- **Inclusive Messaging**: "Proudly LGBTQ+" prominently displayed
- **Rainbow Aesthetic**: Color scheme celebrates diversity and inclusion

### 📱 **Animated QR Code Page**
- **Living QR Code**: Black pixels gently move in a sand-like effect while remaining scannable
- **Rainbow Scanner**: Subtle rainbow light beam sweeps across the QR code
- **Mobile Optimized**: Perfect for displaying on phone screens at conferences
- **Interactive Effects**: Hover animations, click feedback, and easter eggs
- **Professional Presentation**: Clean design with your branding

### 🔗 **Contact & Social Integration**
- **Multiple Contact Methods**: Email, LinkedIn, X/Twitter, GitHub, Signal, Telegram
- **Company Showcase**: status.health, healthprotocol.network, and attest.ink
- **Personal Blog**: Links to random musings at 97115104.com
- **Floating Icons**: Social media icons with gentle hover animations

### 🎯 **Interactive Elements**
- **Hover Effects**: Ripple animations, floating icons, and smooth transitions
- **Easter Eggs**: Hidden animations triggered by clicks and key combinations
- **Mobile-Optimized**: Touch-friendly interface perfect for conference networking
- **Konami Code**: Rainbow explosion effect for the QR code

### 🔒 **Privacy & Attribution**
- **Claude Attestation**: attest.ink badges for transparent AI assistance acknowledgment
- **No Tracking**: No analytics or cookies, privacy-first approach
- **Open Source**: MIT licensed for educational and personal use

## 📁 Project Structure

```
austin-contact-page/
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
│   └── qr-code-97104xyz.png # Static QR code for README
├── claude-generated.svg    # Custom Claude attestation badge
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/austin-contact-page
cd austin-contact-page
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
value: 'https://97104.xyz'

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

## 🎯 Conference Usage

### QR Code Sharing
1. **Open QR Page**: Navigate to `qr.html` on your phone
2. **Display to Contacts**: Show your phone screen for easy scanning
3. **Business Cards**: Use the static QR code image for printed materials
4. **Digital Sharing**: Include QR code in email signatures or social media

### Networking Features
- **Quick Contact**: Multiple ways to connect (email, social, messaging)
- **Professional Context**: Clear company and project information
- **Personal Touch**: Philosophy and personality shine through
- **Mobile-First**: Perfect for on-the-go conference interactions
- **Visual Appeal**: Animated QR code is a conversation starter

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

## 🎭 Easter Eggs

Hidden interactions for those who discover them:

1. **Konami Code**: `↑↑↓↓←→←→BA` triggers rainbow explosion on QR code
2. **Profile Disco**: Click profile image 5 times for disco mode (main page)
3. **Champagne Toast**: Double-click footer for celebratory bubbles (main page)
4. **QR Click**: Click QR code for success notification
5. **URL Copy**: Click URL display to copy to clipboard
6. **Color Shifts**: Background smoothly cycles through rainbow spectrum

## 🌈 Design Philosophy

### Authenticity
- **Personal Branding**: Reflects Austin's personality and values
- **LGBTQ+ Pride**: Celebrates identity without being overwhelming
- **Professional Balance**: Serious expertise with playful presentation

### Innovation
- **Animated QR Codes**: Pushes boundaries of what QR codes can be
- **Living Design**: Subtle animations make the page feel alive
- **Technical Artistry**: Code as a form of creative expression

### Accessibility
- **Color Contrast**: High contrast ratios for readability
- **Motion Sensitivity**: Respects `prefers-reduced-motion` settings
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Semantic HTML and ARIA labels

### Performance
- **Mobile First**: Designed for conference networking on phones
- **Fast Loading**: Optimized for quick first impressions
- **Graceful Degradation**: Works even with JavaScript disabled

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
- **QR Code**: Scan the code above or visit [97104.xyz](https://97104.xyz)

---

*"silent waiting on the truth, pure sitting and breathing in the presence of the question mark."*

**Built with ❤️, 🌈, and a touch of ✨ by Austin Harshberger**

**AI Assistance**: Created with help from Claude AI ([attest.ink](https://attest.ink) verified)