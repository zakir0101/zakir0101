// Portfolio Website JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupChatWidget();
        this.loadGitHubProjects();
        this.loadGitHubStats();
        this.setupContactForm();
        this.setupTypewriter();
        this.setupSkillsAnimation();
        this.setupInteractiveResume();
    }

    // Theme setup
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Check for saved theme preference or default to system preference
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-theme');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }
        });
    }

    // Navigation setup
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const isDarkMode = document.body.classList.contains('dark-theme');

            if (window.scrollY > 100) {
                if (isDarkMode) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                }
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                if (isDarkMode) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el => {
            observer.observe(el);
        });

        // Skill tags animation
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Typewriter effect
    setupTypewriter() {
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 2}s`;
        });
    }

    // Skills progress animation
    setupSkillsAnimation() {
        const skillProgressElements = document.querySelectorAll('.skill-progress');

        // Create intersection observer for skills animation
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target;
                    const level = skillProgress.getAttribute('data-level');

                    // Animate progress bar
                    setTimeout(() => {
                        skillProgress.style.width = `${level}%`;
                    }, 200);

                    // Stop observing after animation
                    skillsObserver.unobserve(skillProgress);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all skill progress elements
        skillProgressElements.forEach(skill => {
            skillsObserver.observe(skill);
        });
    }

    // Interactive Resume
    setupInteractiveResume() {
        const filters = document.querySelectorAll('.resume-filter');
        const cards = document.querySelectorAll('.resume-card');

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                const category = filter.getAttribute('data-filter');

                // Show/hide cards based on filter
                cards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category').split(' ');

                    if (category === 'all' || cardCategories.includes(category)) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            });
        });

        // Auto-filter based on AI chat queries
        this.setupResumeChatIntegration();
    }

    setupResumeChatIntegration() {
        // This will be called when AI responses trigger specific categories
        window.filterResumeByCategory = (category) => {
            const filter = document.querySelector(`[data-filter="${category}"]`);
            if (filter) {
                filter.click();
            }
        };
    }

    // GitHub Projects
    async loadGitHubProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        // Show loading state
        projectsGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading projects from GitHub...</div>';

        try {
            // Fetch real GitHub data
            const response = await fetch('https://api.github.com/users/zakir0101/repos?sort=updated&per_page=20');

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();

            // Filter and map repositories to project format
            const projects = repos
                .filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
                .map(repo => ({
                    name: repo.name,
                    description: repo.description || 'No description available',
                    technologies: this.extractTechnologies(repo), // Extract from topics or language
                    githubUrl: repo.html_url,
                    demoUrl: repo.homepage || null,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updatedAt: repo.updated_at,
                    language: repo.language
                }))
                .sort((a, b) => b.stars - a.stars || new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by stars, then by recent updates

            projectsGrid.innerHTML = '';

            if (projects.length === 0) {
                projectsGrid.innerHTML = '<div class="loading">No public repositories found.</div>';
                return;
            }

            projects.forEach(project => {
                const projectCard = this.createProjectCard(project);
                projectsGrid.appendChild(projectCard);
            });

        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            // Fallback to mock data if API fails
            this.loadFallbackProjects();
        }
    }

    // Extract technologies from repository data
    extractTechnologies(repo) {
        const technologies = [];

        // Add primary language
        if (repo.language) {
            technologies.push(repo.language);
        }

        // Add topics if available
        if (repo.topics && repo.topics.length > 0) {
            technologies.push(...repo.topics.slice(0, 3)); // Limit to 3 topics
        }

        // Ensure we have at least one technology
        if (technologies.length === 0) {
            technologies.push('Code');
        }

        return technologies;
    }

    // Load GitHub profile statistics
    async loadGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/zakir0101/repos?per_page=100');

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();

            // Calculate totals
            const totalRepos = repos.filter(repo => !repo.fork).length;
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

            // Update DOM elements
            const reposElement = document.getElementById('totalRepos');
            const starsElement = document.getElementById('totalStars');
            const forksElement = document.getElementById('totalForks');

            if (reposElement) reposElement.textContent = totalRepos;
            if (starsElement) starsElement.textContent = totalStars;
            if (forksElement) forksElement.textContent = totalForks;

        } catch (error) {
            console.error('Error loading GitHub stats:', error);
            // Set fallback values
            const reposElement = document.getElementById('totalRepos');
            const starsElement = document.getElementById('totalStars');
            const forksElement = document.getElementById('totalForks');

            if (reposElement) reposElement.textContent = '6+';
            if (starsElement) starsElement.textContent = '5+';
            if (forksElement) forksElement.textContent = '1+';
        }
    }

    // Fallback projects if GitHub API fails
    loadFallbackProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        const fallbackProjects = [
            {
                name: "Synthetic Exam Generator",
                description: "Sophisticated CLI system for parsing OCR results from exam papers and generating synthetic training data",
                technologies: ["Python", "React", "DeepSeek OCR", "Mathpix", "Gemini API", "Hugging Face Hub"],
                githubUrl: "https://github.com/zakir0101/synthetic-exam-gerator",
                demoUrl: null,
                stars: 0,
                forks: 0
            },
            {
                name: "Multi-Backend OCR System",
                description: "Production-ready OCR system running DeepSeek-OCR and MinerU simultaneously on dedicated GPUs",
                technologies: ["Python", "Flask", "React", "Shell Scripting", "GPU Orchestration"],
                githubUrl: "https://github.com/zakir0101/ocr-project",
                demoUrl: null,
                stars: 0,
                forks: 0
            },
            {
                name: "Custom PDF Parsing Engine",
                description: "PDF processing engine built from scratch with custom regex tokenizer and graphics state machine",
                technologies: ["Python", "Cairo Graphics", "FreeType", "Tkinter", "Regex Tokenization"],
                githubUrl: "https://github.com/zakir0101/python-pdf-parser-renderer",
                demoUrl: null,
                stars: 0,
                forks: 0
            },
            {
                name: "AI-Powered Exam Generator",
                description: "Client-side React application for generating exam questions from study materials using Gemini API",
                technologies: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "PDF.js", "JSZip"],
                githubUrl: "https://github.com/zakir0101/ai-exam-generator",
                demoUrl: null,
                stars: 0,
                forks: 0
            },
            {
                name: "Fine-Tuning DeepSeek OCR",
                description: "Fine-tuning DeepSeek's OCR models using LoRA for efficient parameter optimization",
                technologies: ["Python", "LoRA", "vLLM", "Hugging Face Transformers", "Shell Scripting"],
                githubUrl: "https://github.com/zakir0101/fine-tuning-deepseekocr",
                demoUrl: null,
                stars: 0,
                forks: 0
            },
            {
                name: "Task & Consequence Android App",
                description: "Android productivity app for managing tasks within structured programs using punishment system",
                technologies: ["Java", "Android SDK", "SQLite", "MVVM", "Material Design 3"],
                githubUrl: "https://github.com/zakir0101/task-and-consequence",
                demoUrl: null,
                stars: 0,
                forks: 0
            }
        ];

        projectsGrid.innerHTML = '';
        fallbackProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';

        // Format date for "last updated"
        const updatedDate = project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : null;

        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span class="project-stat" title="Stars">
                    <i class="fas fa-star"></i> ${project.stars}
                </span>
                <span class="project-stat" title="Forks">
                    <i class="fas fa-code-branch"></i> ${project.forks}
                </span>
                ${updatedDate ? `
                    <span class="project-stat" title="Last Updated">
                        <i class="fas fa-clock"></i> ${updatedDate}
                    </span>
                ` : ''}
            </div>
            <div class="project-links">
                <a href="${project.githubUrl}" class="project-link" target="_blank" title="View on GitHub">
                    <i class="fab fa-github"></i> Code
                </a>
                ${project.demoUrl ?
                    `<a href="${project.demoUrl}" class="project-link" target="_blank" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` :
                    '<span class="project-link disabled" title="No demo available">Demo Coming Soon</span>'
                }
            </div>
        `;

        return card;
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // AI Chat Widget with Voice Control
    setupChatWidget() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const closeChat = document.getElementById('closeChat');
        const sendMessage = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        const voiceToggle = document.getElementById('voiceToggle');

        if (!chatToggle || !chatContainer) return;

        // Initialize speech recognition
        this.setupVoiceRecognition();

        // Toggle chat
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
        });

        // Close chat
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });

        // Voice toggle
        voiceToggle.addEventListener('click', () => {
            this.toggleVoiceRecognition();
        });

        // Send message
        const sendMessageHandler = () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            this.addChatMessage(message, 'user');
            chatInput.value = '';

            // Get AI response
            setTimeout(() => {
                const response = this.getAIResponse(message);
                this.addChatMessage(response, 'bot');

                // Check for voice commands in the response
                this.processVoiceCommands(message);
            }, 1000);
        };

        sendMessage.addEventListener('click', sendMessageHandler);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageHandler();
            }
        });
    }

    // Voice Recognition Setup
    setupVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;

            // Auto-send if it sounds like a command
            if (transcript.toLowerCase().includes('hey') ||
                transcript.toLowerCase().includes('ask') ||
                transcript.toLowerCase().includes('tell')) {
                document.getElementById('sendMessage').click();
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    }

    toggleVoiceRecognition() {
        const voiceToggle = document.getElementById('voiceToggle');

        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            voiceToggle.classList.remove('listening');
            this.showNotification('Voice recognition stopped', 'info');
        } else {
            this.recognition.start();
            this.isListening = true;
            voiceToggle.classList.add('listening');
            this.showNotification('Listening... Speak now!', 'info');
        }
    }

    processVoiceCommands(message) {
        const lowerMessage = message.toLowerCase();

        // Navigation commands
        if (lowerMessage.includes('go to') || lowerMessage.includes('navigate to')) {
            if (lowerMessage.includes('home') || lowerMessage.includes('hero')) {
                this.smoothScrollTo('home');
            } else if (lowerMessage.includes('projects') || lowerMessage.includes('work')) {
                this.smoothScrollTo('projects');
            } else if (lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
                this.smoothScrollTo('skills');
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('get in touch')) {
                this.smoothScrollTo('contact');
            }
        }

        // Theme commands
        if (lowerMessage.includes('dark mode') || lowerMessage.includes('switch to dark')) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
        } else if (lowerMessage.includes('light mode') || lowerMessage.includes('switch to light')) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Interactive commands
        if (lowerMessage.includes('animate skills') || lowerMessage.includes('show skills')) {
            this.triggerSkillsAnimation();
        }

        if (lowerMessage.includes('show github') || lowerMessage.includes('open github')) {
            window.open('https://github.com/zakir0101', '_blank');
        }
    }

    smoothScrollTo(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    triggerSkillsAnimation() {
        const skillProgressElements = document.querySelectorAll('.skill-progress');
        skillProgressElements.forEach(skill => {
            skill.style.width = '0%';
            setTimeout(() => {
                const level = skill.getAttribute('data-level');
                skill.style.width = `${level}%`;
            }, 100);
        });
        this.showNotification('Skills animation triggered!', 'success');
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    getAIResponse(userMessage) {
        const responses = {
            'projects': "Zakir specializes in OCR and document intelligence projects. Key projects include: Synthetic Exam Generator (multi-backend OCR pipeline), Multi-Backend OCR System (production GPU orchestration), Custom PDF Parsing Engine, and AI Exam Generator (Gemini API). Check the projects section for details! Try saying 'go to projects' or 'show me your work'.",
            'skills': "Zakir's technical skills include Python (advanced), React, Java, OCR integration (DeepSeek, Mathpix, Gemini), PDF processing, Flask, Android development, and modern tools like Neovim and Git. You can say 'animate skills' to see them in action!",
            'experience': "Zakir is an advanced developer specializing in OCR, PDF processing, and AI integration. He builds production-ready document intelligence systems and synthetic data pipelines for educational technology.",
            'contact': "You can reach Zakir through GitHub, LinkedIn, or email. Check the contact section for links! Say 'go to contact' to jump there directly.",
            'voice': "I support voice commands! Click the microphone icon and try saying: 'go to projects', 'switch to dark mode', 'animate skills', or 'show github'. It's like having your own Jarvis!",
            'default': "I'm an AI assistant for Zakir's portfolio. I can tell you about his OCR/document intelligence projects, technical skills, experience, or help you get in touch. What would you like to know? Try voice commands by clicking the microphone!",
            'fun': [
                "Did you know Zakir can make websites talk? Well, now you're experiencing it! 🎤",
                "This portfolio is powered by cutting-edge web technologies and a sprinkle of AI magic ✨",
                "Zakir built this interactive experience from scratch - no templates, pure innovation 💻",
                "Voice control, real-time GitHub integration, animated skills... what's next? 🤔",
                "Zakir's OCR systems can read exam papers better than some humans! 📄👁️"
            ]
        };

        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return responses.projects;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
            return responses.skills;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
            return responses.experience;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('linkedin')) {
            return responses.contact;
        } else if (lowerMessage.includes('voice') || lowerMessage.includes('speak') || lowerMessage.includes('microphone')) {
            return responses.voice;
        } else if (lowerMessage.includes('frontend') || lowerMessage.includes('javascript') || lowerMessage.includes('vue')) {
            window.filterResumeByCategory('frontend');
            return "I've filtered my interactive resume to show frontend expertise. Check out the highlighted skills and experience!";
        } else if (lowerMessage.includes('backend') || lowerMessage.includes('python') || lowerMessage.includes('flask') || lowerMessage.includes('api')) {
            window.filterResumeByCategory('backend');
            return "I've filtered my interactive resume to show backend development skills. Take a look at the server-side technologies I work with!";
        } else if (lowerMessage.includes('mobile') || lowerMessage.includes('android') || lowerMessage.includes('app')) {
            window.filterResumeByCategory('mobile');
            return "I've filtered my interactive resume to show mobile development experience. Check out my Android and cross-platform skills!";
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('artificial intelligence')) {
            window.filterResumeByCategory('ai');
            return "I've filtered my interactive resume to show AI and machine learning experience. This is where the magic happens!";
        } else if (lowerMessage.includes('fun') || lowerMessage.includes('cool') || lowerMessage.includes('awesome')) {
            return responses.fun[Math.floor(Math.random() * responses.fun.length)];
        } else {
            return responses.default;
        }
    }

    // Utility functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .project-language {
        background: var(--primary-color);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .project-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .project-stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-light);
        font-size: 0.875rem;
        cursor: help;
    }

    .project-link.disabled {
        color: var(--text-light);
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);