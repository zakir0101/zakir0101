# Portfolio Website

A modern, responsive portfolio website showcasing Zakir's projects, skills, and experience as a full-stack developer.

## Features

✨ **Modern Design**
- Clean, professional interface with smooth animations
- Responsive design that works on all devices
- Dark/light theme ready CSS variables

🚀 **Interactive Elements**
- Smooth scrolling navigation
- Animated project cards with hover effects
- Typewriter animation in hero section
- Intersection Observer animations

🤖 **AI Chat Widget**
- Interactive AI assistant for answering questions
- Real-time chat interface
- Pre-programmed responses about projects and skills

📱 **Mobile-First**
- Fully responsive design
- Mobile hamburger menu
- Optimized touch interactions

⚡ **Performance**
- Optimized CSS with variables
- Efficient JavaScript
- Fast loading times

## Project Structure

```
portfolio-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Interactive features and AI chat
└── README.md          # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **JavaScript ES6+** - Interactive features and API integration
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family

## Getting Started

### Local Development

1. **Clone or download the files**
   ```bash
   # If you have the files locally
   cd portfolio-website
   ```

2. **Open in browser**
   ```bash
   # Simple way - open index.html directly in browser
   open index.html

   # Or use a local server for better development
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Deployment Options

#### Option 1: GitHub Pages (Recommended)
1. Create a new repository named `zakir0101.github.io`
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Your site will be live at: `https://zakir0101.github.io`

#### Option 2: Netlify
1. Drag and drop the `portfolio-website` folder to Netlify
2. Your site will be deployed instantly
3. Custom domain can be added

#### Option 3: Vercel
1. Connect your GitHub repository to Vercel
2. Automatic deployments on every push
3. Custom domain support

## Customization

### Personal Information
Update the following in `index.html`:
- Name and title in hero section
- About me text
- Contact information
- Social media links

### Projects
Update the project data in `script.js`:
```javascript
const projects = [
    {
        name: "Your Project Name",
        description: "Project description",
        technologies: ["Tech1", "Tech2"],
        githubUrl: "https://github.com/yourusername/project",
        demoUrl: "https://your-demo-link.com",
        stars: 0,
        forks: 0
    }
    // Add more projects...
];
```

### Styling
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #1e293b;  /* Dark text color */
    --accent-color: #3b82f6;     /* Hover/active color */
    /* ... other variables */
}
```

### AI Chat Responses
Update the AI responses in `script.js`:
```javascript
getAIResponse(userMessage) {
    const responses = {
        'projects': "Your custom response about projects",
        'skills': "Your custom response about skills",
        // ... other responses
    };
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- **Lazy Loading**: Images and animations load as needed
- **Optimized CSS**: Minimal reflows and repaints
- **Efficient JavaScript**: Event delegation and proper cleanup
- **Responsive Images**: Optimized for different screen sizes

## New Features Added

✅ **Real GitHub API Integration**
- Live project data from your GitHub repositories
- Real-time stars, forks, and update information
- Technology tags extracted from repository topics and languages
- Fallback to mock data if API fails

✅ **Dark Mode Toggle**
- System preference detection
- Persistent theme selection
- Smooth transitions between themes
- Responsive design for all screen sizes

✅ **Skills Progress Bars**
- Animated proficiency indicators for all skills
- Smooth CSS transitions and shimmer effects
- Intersection Observer for scroll-triggered animations
- Responsive design that adapts to mobile devices
- Professional gradient styling with hover effects

## Future Enhancements

- [ ] Blog section
- [ ] Multi-language support
- [ ] Contact form backend integration
- [ ] Analytics integration
- [ ] PWA features

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Zakir**

For questions or suggestions, feel free to reach out!