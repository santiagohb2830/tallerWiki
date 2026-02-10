// Wiki Application - JavaScript Moderno

// DOM Elements
const DOM = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    exploreSectionsBtn: document.getElementById('exploreSections'),
    viewDocumentationBtn: document.getElementById('viewDocumentation'),
    
    // Sections
    sectionCards: document.querySelectorAll('.section-card'),
    docCards: document.querySelectorAll('.doc-card'),
    
    // Stats
    docCount: document.getElementById('docCount'),
    sectionCount: document.getElementById('sectionCount'),
    contributors: document.getElementById('contributors'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initIntersectionObservers();
    console.log('Wiki Application initialized successfully!');
});

// Event Listeners
function initEventListeners() {
    // Navigation
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Hero buttons
    DOM.exploreSectionsBtn.addEventListener('click', exploreSections);
    DOM.viewDocumentationBtn.addEventListener('click', viewDocumentation);
    
    // Section cards
    DOM.sectionCards.forEach(card => {
        card.addEventListener('click', handleSectionCardClick);
    });
    
    // Documentation cards
    DOM.docCards.forEach(card => {
        const btnLink = card.querySelector('.btn-link');
        if (btnLink) {
            btnLink.addEventListener('click', handleDocCardClick);
        }
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    DOM.navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    showToast(`Navegando a ${this.textContent}`, 'info');
}

// Explore Sections Handler
function exploreSections() {
    const sectionsSection = document.getElementById('sections');
    sectionsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    showToast('Explorando secciones de la wiki...', 'info');
}

// View Documentation Handler
function viewDocumentation() {
    const documentationSection = document.getElementById('documentation');
    documentationSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    showToast('Accediendo a la documentación...', 'info');
}

// Section Card Click Handler
function handleSectionCardClick() {
    const sectionNumber = this.getAttribute('data-section');
    const sectionTitle = this.querySelector('h3').textContent;
    
    showToast(`Sección "${sectionTitle}" seleccionada!`, 'success');
}

// Documentation Card Click Handler
function handleDocCardClick(e) {
    e.preventDefault();
    const docTitle = this.closest('.doc-card').querySelector('h3').textContent;
    
    showToast(`Redirigiendo a "${docTitle}"...`, 'info');
}

// Scroll Handler
function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        
        if (rect.top <= 150 && rect.bottom >= 150) {
            DOM.navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

// Intersection Observers
function initIntersectionObservers() {
    // Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
    
    // Observer for fade in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const fadeElements = document.querySelectorAll('.section-card, .doc-card, .stat-item');
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Stats Animation
function animateStats(container) {
    const statNumbers = container.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        animateNumber(stat, targetValue);
    });
}

function animateNumber(element, targetValue) {
    let currentValue = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Toast Notification
function showToast(message, type = 'success') {
    DOM.toastMessage.textContent = message;
    
    const typeColors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)'
    };
    
    DOM.toast.style.background = typeColors[type];
    DOM.toast.querySelector('i').className = 
        type === 'success' ? 'fas fa-check-circle' :
        type === 'info' ? 'fas fa-info-circle' :
        type === 'warning' ? 'fas fa-exclamation-triangle' :
        'fas fa-exclamation-circle';
    
    DOM.toast.classList.add('show');
    
    setTimeout(() => {
        DOM.toast.classList.remove('show');
    }, 3000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for quick navigation to home
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        showToast('Volviendo a inicio...', 'info');
    }
    
    // Ctrl/Cmd + S for sections
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        document.getElementById('sections').scrollIntoView({ behavior: 'smooth' });
        showToast('Navegando a secciones...', 'info');
    }
    
    // Ctrl/Cmd + D for documentation
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        document.getElementById('documentation').scrollIntoView({ behavior: 'smooth' });
        showToast('Navegando a documentación...', 'info');
    }
});
