/**
 * ========================================
 * WIKI DEL EQUIPO - SCRIPT PRINCIPAL
 * ========================================
 * 
 * JavaScript principal para la Wiki del Equipo.
 * Incluye navegación, animaciones y funcionalidades generales.
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initWikiApp();
});

/**
 * Inicializa la aplicación Wiki
 */
function initWikiApp() {
    console.log('Wiki del Equipo - Inicializando...');
    
    // Inicializar componentes
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initStatCounters();
    initKeyboardShortcuts();
    
    console.log('Wiki del Equipo - ¡Lista!');
}

/**
 * ========================================
 * MENÚ MÓVIL
 * ========================================
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!mobileMenuBtn || !mobileNav) return;
    
    // Toggle del menú
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Cambiar icono
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * ========================================
 * SCROLL SUAVE
 * ========================================
 */
function initSmoothScroll() {
    // Enlaces de navegación con hash
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Solo procesar si es un hash válido
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcular posición considerando el header fijo
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * ========================================
 * ANIMACIONES AL SCROLL
 * ========================================
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si tiene animación de números, iniciar
                if (entry.target.classList.contains('stat-card')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * ========================================
 * EFECTO DEL HEADER AL SCROLL
 * ========================================
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Añadir sombra al hacer scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Actualizar link activo según sección visible
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

/**
 * Actualiza el link de navegación activo según la sección visible
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Actualizar navegación desktop
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
            
            // Actualizar navegación móvil
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * ========================================
 * CONTADORES ANIMADOS
 * ========================================
 */
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement && !isNaN(parseInt(numberElement.textContent))) {
            // Guardar valor objetivo
            numberElement.dataset.target = numberElement.textContent;
            numberElement.textContent = '0';
        }
    });
}

/**
 * Anima el número de una tarjeta de estadística
 */
function animateStatNumber(card) {
    const numberElement = card.querySelector('.stat-number');
    if (!numberElement || !numberElement.dataset.target) return;
    
    const target = parseInt(numberElement.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        numberElement.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            numberElement.textContent = target;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

/**
 * ========================================
 * ATAJOS DE TECLADO
 * ========================================
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K -> Ir al inicio
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            window.location.href = '/';
            mostrarToast('Navegando al inicio...', 'info');
        }
        
        // Ctrl/Cmd + E -> Ir al equipo
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            const equipoSection = document.getElementById('equipo');
            if (equipoSection) {
                equipoSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '/#equipo';
            }
            mostrarToast('Navegando al equipo...', 'info');
        }
        
        // Ctrl/Cmd + C -> Ir a contacto
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.shiftKey) {
            e.preventDefault();
            window.location.href = '/contacto';
            mostrarToast('Navegando a contacto...', 'info');
        }
        
        // Escape -> Cerrar menú móvil
        if (e.key === 'Escape') {
            const mobileNav = document.getElementById('mobileNav');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * ========================================
 * EFECTOS DE HOVER EN TARJETAS
 * ========================================
 */

// Efecto de seguimiento del mouse en tarjetas
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.team-card, .skill-card, .interest-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Solo aplicar si el mouse está dentro de la tarjeta
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

/**
 * ========================================
 * UTILIDADES
 * ========================================
 */

/**
 * Muestra un toast de notificación
 */
function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) {
        console.log(`Toast: ${mensaje} (${tipo})`);
        return;
    }
    
    // Configurar tipo de toast
    const colores = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        warning: 'linear-gradient(135deg, #F59E0B, #D97706)',
        info: 'linear-gradient(135deg, #3B82F6, #2563EB)'
    };
    
    const iconos = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.style.background = colores[tipo] || colores.info;
    toast.querySelector('i').className = iconos[tipo] || iconos.info;
    toastMessage.textContent = mensaje;
    
    // Mostrar toast
    toast.classList.add('show');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Debounce para optimizar eventos frecuentes
 */
function debounce(func, wait) {
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

/**
 * Throttle para limitar ejecuciones
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ========================================
 * MANEJO DE IMÁGENES
 * ========================================
 */

// Manejar errores de carga de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Error cargando imagen:', e.target.src);
    }
}, true);

/**
 * ========================================
 * INICIALIZACIÓN ADICIONAL
 * ========================================
 */

// Detectar si estamos en una página específica
const currentPage = document.body.classList.contains('contacto-page') ? 'contacto' :
                    document.body.classList.contains('integrante-page') ? 'integrante' : 'index';

console.log(`Página actual: ${currentPage}`);

// Añadir clase para animaciones de entrada
document.body.classList.add('loaded');

// Exponer funciones globales necesarias
window.mostrarToast = mostrarToast;
