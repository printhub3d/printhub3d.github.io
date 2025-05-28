// PrintHub3D Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupHeaderScrollEffect();
    setupScrollAnimations();
    setupMobileMenu();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Change header background on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Setup scroll animations for elements
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .product-card');

    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';

        // Observe for intersection
        observer.observe(element);
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    // Create mobile menu toggle button
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');

    // Create hamburger menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';

    // Add mobile menu styles
    addMobileMenuStyles();

    // Insert mobile menu button
    navContainer.insertBefore(mobileMenuBtn, navContainer.lastElementChild);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-menu-open');
        const icon = this.querySelector('i');

        if (navMenu.classList.contains('mobile-menu-open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking on links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('mobile-menu-open');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('mobile-menu-open');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// Add mobile menu styles dynamically
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 10px;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                flex-direction: column;
                padding: 20px 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                gap: 0;
            }
            
            .nav-menu.mobile-menu-open {
                display: flex !important;
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu li {
                margin: 0;
                padding: 10px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .nav-menu li:last-child {
                border-bottom: none;
            }
            
            .nav-menu a {
                display: block;
                padding: 10px 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Parallax effect for hero section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    const printer3d = document.querySelector('.printer-3d');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        if (printer3d) {
            printer3d.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Loading animation
function setupLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');

        setTimeout(() => {
            if (heroTitle) heroTitle.style.opacity = '1';
        }, 300);

        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.style.opacity = '1';
        }, 600);

        setTimeout(() => {
            if (heroButtons) heroButtons.style.opacity = '1';
        }, 900);
    });
}

// Form handling (if contact form exists)
function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};

            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission
            showNotification('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');

            // Reset form
            this.reset();
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Counter animation for stats
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const countUp = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);

            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                countUp(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');

            // Save theme preference
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Update button icon
            const icon = this.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupParallaxEffect();
    setupLoadingAnimation();
    setupContactForm();
    setupCounterAnimation();
    setupThemeToggle();
});

// Utility functions
const Utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export functions for potential use in other scripts
window.PrintHub3D = {
    Utils,
    showNotification,
    setupSmoothScrolling,
    setupHeaderScrollEffect,
    setupScrollAnimations
};

// Help Chat Widget Class
class HelpChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.helpButton = document.getElementById('helpButton');
        this.chatPanel = document.getElementById('chatPanel');
        this.closeChat = document.getElementById('closeChat');
        this.chatBody = document.getElementById('chatBody');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.notificationBadge = document.getElementById('notificationBadge');

        if (this.helpButton) {
            this.bindEvents();
            this.showWelcomeActions();

            // Show notification after 5 seconds
            setTimeout(() => {
                this.showNotification();
            }, 5000);
        }
    }

    bindEvents() {
        // Toggle chat panel
        this.helpButton.addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat
        this.closeChat.addEventListener('click', () => {
            this.closeChatPanel();
        });

        // Send message on Enter
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Send button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Quick actions
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.help-widget') && this.isOpen) {
                // Don't close immediately, let user interact
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatPanel.classList.toggle('open', this.isOpen);
        this.helpButton.classList.toggle('active', this.isOpen);
        this.hideNotification();

        if (this.isOpen) {
            this.messageInput.focus();
        }
    }

    closeChatPanel() {
        this.isOpen = false;
        this.chatPanel.classList.remove('open');
        this.helpButton.classList.remove('active');
    }

    showNotification() {
        if (this.notificationBadge && !this.isOpen) {
            this.notificationBadge.style.display = 'flex';
        }
    }

    hideNotification() {
        if (this.notificationBadge) {
            this.notificationBadge.style.display = 'none';
        }
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.messageInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate bot response
        setTimeout(() => {
            this.hideTyping();
            this.handleBotResponse(message);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        this.chatBody.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('show');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatBody.scrollTop = this.chatBody.scrollHeight;
        }, 100);
    }

    handleQuickAction(action) {
        const responses = {
            pricing: 'Bảng giá dịch vụ của chúng tôi:\n\n• Gói Cơ Bản: 50.000đ/sản phẩm\n• Gói Chuyên Nghiệp: 150.000đ/sản phẩm\n• Gói Doanh Nghiệp: 500.000đ/dự án\n\nBạn có muốn biết thêm chi tiết không?',
            services: 'PrintHub3D cung cấp các dịch vụ:\n\n🔧 In 3D theo yêu cầu\n🎨 Thiết kế 3D\n💡 Tư vấn kỹ thuật\n🛡️ Bảo hành & hỗ trợ\n\nDịch vụ nào bạn quan tâm?',
            materials: 'Chúng tôi hỗ trợ các vật liệu:\n\n• PLA - Thân thiện môi trường\n• ABS - Bền bỉ, chịu nhiệt\n• PETG - Trong suốt, bền\n• Resin - Chi tiết cao\n• Nylon - Kỹ thuật cao cấp\n• Carbon Fiber - Siêu bền\n\nBạn cần vật liệu nào?',
            quote: 'Để báo giá chính xác, tôi cần biết:\n\n📏 Kích thước sản phẩm\n🎯 Mục đích sử dụng\n📦 Số lượng cần in\n⏰ Thời gian mong muốn\n\nBạn có thể gửi file thiết kế hoặc mô tả chi tiết không?',
            support: 'Chúng tôi hỗ trợ 24/7 qua:\n\n📞 Hotline: +84 123 456 789\n💬 Chat trực tiếp (như bây giờ)\n📧 Email: support@printhub3d.com\n📱 Zalo: +84 987 654 321\n\nBạn gặp vấn đề gì ạ?',
            contact: 'Thông tin liên hệ PrintHub3D:\n\n🏢 123 Đường Nguyễn Huệ, Q1, TP.HCM\n📞 +84 123 456 789\n📧 info@printhub3d.com\n🕐 T2-T6: 8:00-18:00, T7: 8:00-12:00\n\nBạn muốn đặt lịch hẹn không?'
        };

        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(responses[action], 'bot');
        }, 800);
    }

    handleBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response;

        if (message.includes('giá') || message.includes('cost') || message.includes('price')) {
            response = 'Để báo giá chính xác, tôi cần thông tin chi tiết về dự án. Bạn có thể cho tôi biết:\n\n• Loại sản phẩm cần in\n• Kích thước\n• Số lượng\n• Vật liệu mong muốn\n\nHoặc bạn có thể gửi file thiết kế để tôi báo giá nhanh hơn!';
        } else if (message.includes('dịch vụ') || message.includes('service')) {
            response = 'PrintHub3D cung cấp đầy đủ dịch vụ in 3D:\n\n✅ In 3D theo yêu cầu\n✅ Thiết kế 3D chuyên nghiệp\n✅ Tư vấn kỹ thuật\n✅ Rapid prototyping\n✅ Bảo hành dài hạn\n\nBạn cần dịch vụ nào cụ thể?';
        } else if (message.includes('vật liệu') || message.includes('material')) {
            response = 'Chúng tôi có đa dạng vật liệu chất lượng cao:\n\n🌱 PLA (thân thiện môi trường)\n🔥 ABS (chịu nhiệt, bền)\n💎 PETG (trong suốt)\n🧪 Resin (chi tiết cực cao)\n⚙️ Nylon (kỹ thuật)\n💪 Carbon Fiber (siêu bền)\n\nTùy vào ứng dụng, tôi sẽ tư vấn vật liệu phù hợp nhất!';
        } else if (message.includes('liên hệ') || message.includes('contact')) {
            response = 'Bạn có thể liên hệ với chúng tôi qua:\n\n📞 Hotline: +84 123 456 789\n📧 Email: info@printhub3d.com\n🏢 Địa chỉ: 123 Nguyễn Huệ, Q1, TP.HCM\n💬 Chat này (24/7)\n\nBạn muốn tôi chuyển cho nhân viên tư vấn không?';
        } else if (message.includes('cảm ơn') || message.includes('thank')) {
            response = 'Không có gì! Tôi luôn sẵn sàng hỗ trợ bạn. Nếu có thêm câu hỏi nào, đừng ngại hỏi nhé! 😊';
        } else if (message.includes('bye') || message.includes('tạm biệt')) {
            response = 'Tạm biệt! Cảm ơn bạn đã quan tâm đến PrintHub3D. Chúc bạn một ngày tốt lành! 👋';
        } else {
            response = 'Tôi hiểu bạn đang quan tâm đến dịch vụ của chúng tôi. Để tư vấn chính xác nhất, bạn có thể:\n\n📞 Gọi hotline: +84 123 456 789\n📧 Email: info@printhub3d.com\n💬 Mô tả chi tiết yêu cầu ở đây\n\nTôi sẽ cố gắng hỗ trợ tốt nhất!';
        }

        this.addMessage(response, 'bot');
    }

    showWelcomeActions() {
        // Show welcome message after a delay
        setTimeout(() => {
            if (!this.isOpen) {
                this.showNotification();
            }
        }, 3000);
    }
}

// Initialize help chat widget
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    initializeWebsite();
    setupParallaxEffect();
    setupLoadingAnimation();
    setupContactForm();
    setupCounterAnimation();
    setupThemeToggle();

    // Initialize help chat widget
    if (document.getElementById('helpButton')) {
        new HelpChatWidget();
    }
});