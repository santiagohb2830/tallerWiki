# Demo Interactiva - Spring Boot + Thymeleaf + JavaScript

## Descripción
Esta es una aplicación web interactiva desarrollada con Spring Boot, Thymeleaf y JavaScript moderno. Ofrece una interfaz atractiva y funcional con diversas características de demostración.

## Características Principales

### 1. Diseño Moderno Responsive
- Interfaz adaptada a cualquier dispositivo (móviles, tablets, desktop)
- Animaciones fluidas y efectos visuales atractivos
- Paleta de colores personalizable

### 2. Demo Interactiva
- **Controles en tiempo real**: Ajuste de tema, velocidad y contador
- **Visualización gráfica**: Canvas con animaciones dinámicas
- **Progreso interactivo**: Barra de progreso animada
- **Estadísticas en tiempo real**: Contador, velocidad y tema actual

### 3. Secciones
- **Inicio**: Presentación de la aplicación
- **Características**: Descripción de las funcionalidades principales
- **Demo**: Panel interactivo con controles y visualización
- **Contacto**: Formulario de contacto con validación

### 4. Funcionalidades JavaScript
- **LocalStorage**: Guardado de estado de la aplicación
- **Canvas**: Animaciones gráficas en tiempo real
- **Eventos y listeners**: Manejo interactivo de la interfaz
- **Keyboard shortcuts**: Atajos de teclado para navegación
- **Toast notifications**: Mensajes de feedback visual
- **Form validation**: Validación de formulario de contacto

### 5. Temas Personalizables
- Claro (Default)
- Oscuro
- Azul
- Verde

## Tecnologías Utilizadas

### Backend
- **Spring Boot 4.0.2**: Framework para aplicaciones Java
- **Thymeleaf**: Motor de plantillas para renderizado server-side
- **Maven**: Gestor de dependencias

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidades modernas
- **Font Awesome 6.0**: Íconos vectoriales
- **CSS Variables**: Tema personalizable

## Cómo Ejecutar

### 1. Compilar y Ejecutar
```bash
mvn clean package -DskipTests
mvn spring-boot:run
```

### 2. Acceder a la Aplicación
Abre un navegador y visita:
- **URL principal**: http://localhost:8080
- **Demo Thymeleaf**: http://localhost:8080/demo

## Estructura de Archivos

```
src/main/
├── java/co/javeriana/dw/thymeleaf/
│   └── controller/
│       └── DemoController.java  # Controlador Spring Boot
└── resources/
    ├── static/
    │   ├── index.html           # Página principal estática
    │   ├── styles.css           # Estilos CSS
    │   └── script.js            # JavaScript moderno
    └── templates/
        └── index.html           # Plantilla Thymeleaf
```

## Uso de la Demo

### Controles
1. **Tema**: Selecciona el tema de la interfaz (Claro/Oscuro/Azul/Verde)
2. **Contador**: Ajusta el valor del contador (0-100)
3. **Velocidad**: Controla la velocidad de las animaciones (1-10)
4. **Incrementar/Decrementar**: Botones rápidos para ajustar el contador

### Atajos de Teclado
- **Ctrl/Cmd + K**: Volver a la página de inicio
- **↑**: Incrementar contador
- **↓**: Decrementar contador
- **Espacio**: Mostrar ayuda

### Formulario de Contacto
1. Completa los campos: Nombre, Email, Mensaje
2. Presiona "Enviar Mensaje" (simula envío con delay)
3. Se muestra una notificación de éxito

## Customización

### Cambiar el Tema
Edita el archivo `styles.css` y modifica las variables CSS en la sección `:root` o agrega nuevos temas en la función `applyTheme()` en `script.js`.

### Modificar Animaciones
Las animaciones del canvas se encuentran en la función `animateCanvas()` en `script.js`. Puedes ajustar:
- Tipo de figura (círculos, cuadrados, etc.)
- Velocidad de rotación
- Colores
- Tamaños

### Agregar Funcionalidades
1. Edita `DemoController.java` para agregar nuevos endpoints
2. Crea nuevas plantillas Thymeleaf en `src/main/resources/templates/`
3. Agrega estilos en `styles.css`
4. Implementa funcionalidades JavaScript en `script.js`

## Performance y Optimizaciones

- **Lazy Loading**: Recursos cargados on-demand
- **LocalStorage**: Almacenamiento persistente de configuración
- **Canvas Animations**: Renderizado eficiente con requestAnimationFrame
- **Responsive Design**: Media queries para dispositivos móviles
- **Font Awesome CDN**: Carga de íconos optimizada

## Conclusión

Esta aplicación demuestra las capacidades de Spring Boot, Thymeleaf y JavaScript moderno en la creación de interfaces web atractivas y funcionales. Puedes usarla como punto de partida para desarrollar tus propias aplicaciones.