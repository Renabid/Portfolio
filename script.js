// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hide');
    }, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Throttle function for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Sticky Navigation on Scroll (throttled for performance)
const navbar = document.getElementById('navbar');
let lastScroll = 0;

const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/Hide Scroll to Top Button
    const scrollToTop = document.getElementById('scrollToTop');
    if (currentScroll > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
    
    lastScroll = currentScroll;
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navigation = document.getElementById('navigation');

mobileToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission with Animation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create success message
    const button = this.querySelector('.btn-submit');
    const originalText = button.innerHTML;
    
    // Button animation
    button.innerHTML = '<i class="fas fa-check"></i><span>Sent!</span>';
    button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    // Reset form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #4A7FA7, #1A3D63)';
    }, 3000);
    
    // Show notification
    showNotification('Thank you! Your message has been sent.');
});

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4A7FA7, #1A3D63);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Enhanced Intersection Observer for Smooth Reveal Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }, index * 100); // Stagger animation
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    revealObserver.observe(section);
});

// Observe project cards with stagger
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    revealObserver.observe(card);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    revealObserver.observe(item);
});

// Skill Items Hover Effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.boxShadow = '0 15px 40px rgba(74, 127, 167, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
    
    .section {
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth parallax effect (throttled)
const handleParallax = throttle(() => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const parallaxSpeed = 0.3;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = Math.max(0, 1 - (scrolled / 600));
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}, 10);

window.addEventListener('scroll', handleParallax, { passive: true });

// Enhanced Active State to Nav Links on Scroll (throttled)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.cv-download)');

function highlightActiveSection() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === `#${current}` || (current === '' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', throttle(highlightActiveSection, 50), { passive: true });

console.log('Portfolio loaded successfully!');