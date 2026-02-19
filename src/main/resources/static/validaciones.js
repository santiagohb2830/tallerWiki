/**
 * ========================================
 * VALIDACIONES DEL FORMULARIO DE CONTACTO
 * ========================================
 * 
 * Este archivo contiene todas las validaciones JavaScript
 * para el formulario de contacto de la Wiki.
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initFormValidations();
});

/**
 * Inicializa todas las validaciones del formulario
 */
function initFormValidations() {
    const form = document.getElementById('contactoForm');
    
    if (!form) {
        console.log('Formulario de contacto no encontrado en esta página');
        return;
    }
    
    // Obtener campos del formulario
    const campos = {
        nombre: document.getElementById('nombre'),
        correo: document.getElementById('correo'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje')
    };
    
    // Estado de validación de cada campo
    const estadoValidacion = {
        nombre: false,
        correo: false,
        telefono: false,
        asunto: false,
        mensaje: false
    };
    
    // Configurar eventos de validación en tiempo real
    Object.keys(campos).forEach(campo => {
        if (campos[campo]) {
            // Validar al perder el foco
            campos[campo].addEventListener('blur', function() {
                validarCampo(campo, campos[campo], estadoValidacion);
            });
            
            // Validar mientras escribe (con debounce)
            campos[campo].addEventListener('input', debounce(function() {
                validarCampo(campo, campos[campo], estadoValidacion);
            }, 300));
        }
    });
    
    // Contador de caracteres para el mensaje
    const mensajeTextarea = campos.mensaje;
    const charCount = document.getElementById('charCount');
    const charWarning = document.getElementById('charWarning');
    
    if (mensajeTextarea && charCount) {
        mensajeTextarea.addEventListener('input', function() {
            actualizarContadorCaracteres(this, charCount, charWarning);
        });
    }
    
    // Botón limpiar
    const limpiarBtn = document.getElementById('limpiarBtn');
    if (limpiarBtn) {
        limpiarBtn.addEventListener('click', function() {
            limpiarFormulario(form, campos, estadoValidacion, charCount, charWarning);
        });
    }
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        // Validar todos los campos antes de enviar
        let formularioValido = true;
        
        Object.keys(campos).forEach(campo => {
            const esValido = validarCampo(campo, campos[campo], estadoValidacion);
            if (!esValido) {
                formularioValido = false;
            }
        });
        
        // Actualizar resumen de validación
        actualizarResumenValidacion(estadoValidacion, campos);
        
        if (!formularioValido) {
            e.preventDefault();
            mostrarToast('Por favor, corrige los errores en el formulario', 'error');
            
            // Scroll al primer error
            const primerError = form.querySelector('.form-control.error');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
            
            return false;
        }
        
        // Si todo está correcto, mostrar confirmación
        actualizarEstadoFormulario(estadoValidacion, true);
        mostrarToast('Formulario válido. Enviando...', 'success');
        
        // El formulario se enviará normalmente al servidor
    });
}

/**
 * Valida un campo específico
 */
function validarCampo(nombreCampo, campo, estadoValidacion) {
    if (!campo) return false;
    
    const valor = campo.value.trim();
    let esValido = true;
    let mensajeError = '';
    
    // Limpiar estado anterior
    limpiarErrorCampo(campo);
    
    switch (nombreCampo) {
        case 'nombre':
            esValido = validarNombre(valor);
            if (!esValido) {
                if (valor.length === 0) {
                    mensajeError = 'El nombre es obligatorio';
                } else if (valor.length < 3) {
                    mensajeError = `El nombre debe tener al menos 3 caracteres (actual: ${valor.length})`;
                } else if (/^\s+$/.test(campo.value)) {
                    mensajeError = 'El nombre no puede contener solo espacios en blanco';
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(valor)) {
                    mensajeError = 'El nombre contiene caracteres no válidos';
                }
            }
            break;
            
        case 'correo':
            esValido = validarCorreo(valor);
            if (!esValido) {
                if (valor.length === 0) {
                    mensajeError = 'El correo electrónico es obligatorio';
                } else if (!valor.includes('@')) {
                    mensajeError = 'El correo debe contener un símbolo @';
                } else if (!/@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    mensajeError = 'El correo debe tener un punto después del @ (ejemplo@dominio.com)';
                } else {
                    mensajeError = 'El formato del correo electrónico no es válido';
                }
            }
            break;
            
        case 'telefono':
            esValido = validarTelefono(valor);
            if (!esValido) {
                if (valor.length === 0) {
                    mensajeError = 'El teléfono es obligatorio';
                } else if (!/^\d+$/.test(valor)) {
                    mensajeError = 'El teléfono solo debe contener números';
                } else if (valor.length < 7) {
                    mensajeError = `El teléfono debe tener al menos 7 dígitos (actual: ${valor.length})`;
                } else if (valor.length > 15) {
                    mensajeError = `El teléfono no puede tener más de 15 dígitos (actual: ${valor.length})`;
                }
            }
            break;
            
        case 'asunto':
            esValido = validarAsunto(valor);
            if (!esValido) {
                if (valor.length === 0 || valor === '') {
                    mensajeError = 'Debes seleccionar un asunto';
                } else if (valor === 'Seleccione una opción') {
                    mensajeError = 'Debes seleccionar una opción válida del listado';
                }
            }
            break;
            
        case 'mensaje':
            esValido = validarMensaje(valor);
            if (!esValido) {
                if (valor.length === 0) {
                    mensajeError = 'El mensaje es obligatorio';
                } else if (valor.length < 20) {
                    const faltan = 20 - valor.length;
                    mensajeError = `El mensaje debe tener al menos 20 caracteres. Faltan ${faltan} caracteres.`;
                } else if (valor.length > 400) {
                    mensajeError = `El mensaje no puede exceder 400 caracteres (actual: ${valor.length})`;
                }
            }
            break;
    }
    
    // Actualizar estado
    estadoValidacion[nombreCampo] = esValido;
    
    // Mostrar error si no es válido
    if (!esValido) {
        mostrarErrorCampo(campo, mensajeError);
    } else {
        mostrarExitoCampo(campo);
    }
    
    // Actualizar estado general del formulario
    actualizarEstadoFormulario(estadoValidacion, false);
    
    return esValido;
}

/**
 * Validaciones específicas por campo
 */

function validarNombre(valor) {
    // Obligatorio, mínimo 3 caracteres, no solo espacios
    if (valor.length < 3) return false;
    if (/^\s+$/.test(valor)) return false;
    // Solo letras, espacios y algunos caracteres especiales
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(valor)) return false;
    return true;
}

function validarCorreo(valor) {
    // Obligatorio, formato válido con @ y punto después
    if (valor.length === 0) return false;
    
    // Patrón de correo electrónico
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronCorreo.test(valor);
}

function validarTelefono(valor) {
    // Obligatorio, solo números, 7-15 dígitos
    if (valor.length === 0) return false;
    if (!/^\d+$/.test(valor)) return false;
    if (valor.length < 7 || valor.length > 15) return false;
    return true;
}

function validarAsunto(valor) {
    // Obligatorio, no valor por defecto
    if (!valor || valor.length === 0) return false;
    if (valor === 'Seleccione una opción') return false;
    return true;
}

function validarMensaje(valor) {
    // Obligatorio, 20-400 caracteres
    if (valor.length === 0) return false;
    if (valor.length < 20) return false;
    if (valor.length > 400) return false;
    return true;
}

/**
 * Muestra error en un campo
 */
function mostrarErrorCampo(campo, mensaje) {
    campo.classList.remove('success');
    campo.classList.add('error');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
    }
}

/**
 * Muestra éxito en un campo
 */
function mostrarExitoCampo(campo) {
    campo.classList.remove('error');
    campo.classList.add('success');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success-color);"></i> Correcto';
    }
}

/**
 * Limpia el error de un campo
 */
function limpiarErrorCampo(campo) {
    campo.classList.remove('error', 'success');
    
    const errorElement = document.getElementById(campo.id + 'Error');
    if (errorElement) {
        errorElement.innerHTML = '';
    }
}

/**
 * Actualiza el contador de caracteres del mensaje
 */
function actualizarContadorCaracteres(textarea, charCount, charWarning) {
    const longitud = textarea.value.length;
    charCount.textContent = longitud;
    
    // Cambiar color según el estado
    if (longitud < 20) {
        charCount.style.color = 'var(--danger-color)';
        const faltan = 20 - longitud;
        charWarning.textContent = `(faltan ${faltan} caracteres)`;
    } else if (longitud > 380) {
        charCount.style.color = 'var(--warning-color)';
        charWarning.textContent = `(cerca del límite)`;
    } else {
        charCount.style.color = 'var(--success-color)';
        charWarning.textContent = '';
    }
    
    if (longitud > 400) {
        charCount.style.color = 'var(--danger-color)';
        charWarning.textContent = `(excedido por ${longitud - 400} caracteres)`;
    }
}

/**
 * Actualiza el resumen de validación
 */
function actualizarResumenValidacion(estadoValidacion, campos) {
    const summary = document.getElementById('validationSummary');
    const summaryList = document.getElementById('summaryList');
    
    if (!summary || !summaryList) return;
    
    const errores = [];
    
    Object.keys(estadoValidacion).forEach(campo => {
        if (!estadoValidacion[campo]) {
            const label = document.querySelector(`label[for="${campo}"]`);
            const nombreCampo = label ? label.textContent.replace('*', '').trim() : campo;
            errores.push(nombreCampo);
        }
    });
    
    if (errores.length > 0) {
        summary.style.display = 'block';
        summaryList.innerHTML = errores.map(e => `<li>${e}</li>`).join('');
    } else {
        summary.style.display = 'none';
    }
}

/**
 * Actualiza el estado visual del formulario
 */
function actualizarEstadoFormulario(estadoValidacion, esEnvio) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    
    if (!statusIndicator || !statusText) return;
    
    const todosValidos = Object.values(estadoValidacion).every(v => v);
    
    if (todosValidos) {
        statusIndicator.classList.remove('invalid');
        statusIndicator.classList.add('valid');
        statusIndicator.innerHTML = '<i class="fas fa-check-circle"></i><span>Formulario completo y listo para enviar</span>';
    } else {
        statusIndicator.classList.remove('valid');
        statusIndicator.classList.add('invalid');
        const validados = Object.values(estadoValidacion).filter(v => v).length;
        const total = Object.keys(estadoValidacion).length;
        statusIndicator.innerHTML = `<i class="fas fa-times-circle"></i><span>Formulario incompleto (${validados}/${total} campos válidos)</span>`;
    }
}

/**
 * Limpia todo el formulario
 */
function limpiarFormulario(form, campos, estadoValidacion, charCount, charWarning) {
    // Reset del formulario
    form.reset();
    
    // Limpiar estados visuales
    Object.keys(campos).forEach(campo => {
        if (campos[campo]) {
            limpiarErrorCampo(campos[campo]);
            estadoValidacion[campo] = false;
        }
    });
    
    // Reset contador
    if (charCount) {
        charCount.textContent = '0';
        charCount.style.color = 'var(--text-secondary)';
    }
    if (charWarning) {
        charWarning.textContent = '';
    }
    
    // Ocultar resumen
    const summary = document.getElementById('validationSummary');
    if (summary) {
        summary.style.display = 'none';
    }
    
    // Reset estado del formulario
    actualizarEstadoFormulario(estadoValidacion, false);
    
    mostrarToast('Formulario limpiado', 'info');
}

/**
 * Función debounce para optimizar validaciones en tiempo real
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
 * Muestra un toast de notificación
 */
function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
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