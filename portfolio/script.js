// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Email validation regex - must be @gmail.com
const emailRegex = /^[^\s@]+@gmail\.com$/;

// Clear error messages
function clearError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
    input.style.borderColor = '#e5e7eb';
}

// Show error message
function showError(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
    input.style.borderColor = '#dc2626';
}

// Validate name
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return null;
}

// Validate email
function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid Gmail address (@gmail.com)';
    }
    return null;
}

// Validate message
function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return null;
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameInput, error);
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, error);
    } else {
        clearError(emailInput);
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        showError(messageInput, error);
    } else {
        clearError(messageInput);
    }
});

// Clear errors on input
nameInput.addEventListener('input', () => {
    if (nameInput.style.borderColor === 'rgb(220, 38, 38)') {
        clearError(nameInput);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.style.borderColor === 'rgb(220, 38, 38)') {
        clearError(emailInput);
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.style.borderColor === 'rgb(220, 38, 38)') {
        clearError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    
    let isValid = true;
    
    // Validate all fields
    const nameError = validateName(name);
    if (nameError) {
        showError(nameInput, nameError);
        isValid = false;
    }
    
    const emailError = validateEmail(email);
    if (emailError) {
        showError(emailInput, emailError);
        isValid = false;
    }
    
    const messageError = validateMessage(message);
    if (messageError) {
        showError(messageInput, messageError);
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Clear all error styles
            [nameInput, emailInput, messageInput].forEach(input => {
                clearError(input);
            });
        }, 1500);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            bar.classList.add('animated');
        }
    });
}

// Initial check and scroll listener
animateSkillBars();
window.addEventListener('scroll', animateSkillBars);

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-text, .contact-info');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #2563eb';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});
