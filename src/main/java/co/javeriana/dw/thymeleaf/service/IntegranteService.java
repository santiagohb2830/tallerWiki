package co.javeriana.dw.thymeleaf.service;

import co.javeriana.dw.thymeleaf.model.Integrante;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Servicio que gestiona los datos de los integrantes del equipo.
 * Proporciona métodos para obtener, buscar y listar integrantes.
 */
@Service
public class IntegranteService {
    
    private final List<Integrante> integrantes;
    
    public IntegranteService() {
        this.integrantes = inicializarIntegrantes();
    }
    
    /**
     * Inicializa la lista de integrantes con los datos del equipo.
     */
    private List<Integrante> inicializarIntegrantes() {
        List<Integrante> lista = new ArrayList<>();
        
        // 1. Juan David Rincon
        lista.add(new Integrante(
            "juan-david-rincon",
            "Juan David Rincon",
            Arrays.asList(
                "Computación Móvil",
                "Dirección de Proyectos",
                "Desarrollo de Aplicaciones Móviles",
                "Gestión de Equipos de Desarrollo"
            ),
            Arrays.asList(
                "Flutter",
                "Java",
                "Dart",
                "Android SDK",
                "Firebase"
            ),
            Arrays.asList(
                "Jugar Videojuegos",
                "Explorar nuevas tecnologías",
                "Deportes electrónicos"
            ),
            "/images/perfiles/juan-david-rincon.jpeg",
            "Desarrollador apasionado por la creación de aplicaciones móviles multiplataforma. " +
            "Especializado en Flutter para desarrollo móvil y con sólida experiencia en Java para aplicaciones empresariales. " +
            "Su interés en la dirección de proyectos le permite liderar equipos de desarrollo con una visión integral del ciclo de vida del software. " +
            "Cuenta con experiencia en la implementación de arquitecturas escalables y patrones de diseño modernos.",
            "#3B82F6" // Azul
        ));
        
        // 2. Andres Ortiz
        lista.add(new Integrante(
            "andres-ortiz",
            "Andres Ortiz",
            Arrays.asList(
                "Bases de Datos",
                "Ciberseguridad",
                "Administración de Sistemas de Bases de Datos",
                "Seguridad de la Información"
            ),
            Arrays.asList(
                "Java",
                "SQL",
                "PL/SQL",
                "PostgreSQL",
                "MySQL"
            ),
            Arrays.asList(
                "Porras",
                "Deportes en equipo",
                "Competencias de seguridad informática"
            ),
            "/images/perfiles/andres-ortiz.jpeg",
            "Experto en diseño y optimización de bases de datos relacionales. " +
            "Su conocimiento en ciberseguridad le permite implementar arquitecturas seguras y proteger la integridad de los datos. " +
            "Combina su pasión por las porras con el trabajo en equipo disciplinado. " +
            "Cuenta con certificaciones en seguridad de bases de datos y experiencia en auditorías de sistemas de información.",
            "#10B981" // Verde
        ));
        
        // 3. Tomas Ramirez
        lista.add(new Integrante(
            "tomas-ramirez",
            "Tomas Ramirez",
            Arrays.asList(
                "Sistemas de Gestión de Información",
                "Análisis de Datos",
                "Automatización de Procesos",
                "Business Intelligence"
            ),
            Arrays.asList(
                "Python",
                "Java",
                "Pandas",
                "NumPy",
                "Power BI"
            ),
            Arrays.asList(
                "Jugar Videojuegos",
                "Análisis de datos deportivos",
                "Automatización de tareas"
            ),
            "/images/perfiles/tomas-ramirez.jpg",
            "Especialista en sistemas de gestión de información, enfocado en la organización y procesamiento eficiente de datos empresariales. " +
            "Domina tanto Python para análisis de datos como Java para desarrollo de sistemas robustos. " +
            "Su enfoque analítico le permite identificar patrones y optimizar flujos de trabajo. " +
            "Experiencia en la implementación de soluciones de Business Intelligence para la toma de decisiones.",
            "#8B5CF6" // Púrpura
        ));
        
        // 4. Santiago Hernandez
        lista.add(new Integrante(
            "santiago-hernandez",
            "Santiago Hernandez",
            Arrays.asList(
                "Ciencias de Datos",
                "Gestión de Proyectos",
                "Machine Learning",
                "Análisis Predictivo"
            ),
            Arrays.asList(
                "Python",
                "TensorFlow",
                "Scikit-learn",
                "Jupyter Notebooks",
                "R"
            ),
            Arrays.asList(
                "Motos",
                "Viajes por carretera",
                "Fotografía de paisajes"
            ),
            "/images/perfiles/santiago-hernandez.jpg",
            "Científico de datos con experiencia en análisis predictivo y machine learning. " +
            "Su pasión por las motos refleja su espíritu aventurero y su capacidad para tomar decisiones rápidas. " +
            "Lidera proyectos de datos con metodologías ágiles, combinando el rigor analítico con la creatividad en la resolución de problemas. " +
            "Especializado en la transformación de datos en insights accionables para la toma de decisiones estratégicas.",
            "#F59E0B" // Amarillo/Naranja
        ));
        
        // 5. Juan Pablo Espinilla
        lista.add(new Integrante(
            "juan-pablo-espinilla",
            "Juan Pablo Espinilla",
            Arrays.asList(
                "Ciberseguridad",
                "Arquitectura de Software",
                "Seguridad de Aplicaciones",
                "Diseño de Sistemas"
            ),
            Arrays.asList(
                "Python",
                "Django",
                "Flask",
                "OWASP ZAP",
                "Burp Suite"
            ),
            Arrays.asList(
                "La Moda",
                "Diseño de interfaces",
                "Tendencias tecnológicas"
            ),
            "/images/perfiles/juan-pablo-espinilla.jpg",
            "Arquitecto de software enfocado en seguridad informática. " +
            "Diseña sistemas escalables y seguros, implementando mejores prácticas de protección de datos. " +
            "Su interés en la moda le brinda una perspectiva única en diseño de interfaces y experiencia de usuario. " +
            "Combina el rigor técnico de la seguridad con la creatividad del diseño, creando soluciones que son tanto funcionales como estéticamente agradables.",
            "#EF4444" // Rojo
        ));
        
        // 6. Katherine Bravo
        lista.add(new Integrante(
            "katherine-bravo",
            "Katherine Bravo",
            Arrays.asList(
                "Bases de Datos",
                "Análisis de Datos",
                "Diseño de Esquemas",
                "Optimización de Consultas"
            ),
            Arrays.asList(
                "SQL",
                "Python",
                "Oracle",
                "MongoDB",
                "Redis"
            ),
            Arrays.asList(
                "Pop",
                "Música",
                "Conciertos",
                "Cantar"
            ),
            "/images/perfiles/katherine-bravo.jpg",
            "Especialista en administración y optimización de bases de datos. " +
            "Su creatividad se refleja tanto en el diseño de esquemas eficientes como en su pasión por la música pop. " +
            "Combina el análisis técnico con una perspectiva artística única, lo que le permite encontrar soluciones innovadoras a problemas complejos. " +
            "Experiencia en migración de datos, tuning de consultas y diseño de arquitecturas de datos distribuidas.",
            "#EC4899" // Rosa
        ));
        
        // 7. Samuel Montealegre
        lista.add(new Integrante(
            "samuel-montealegre",
            "Samuel Montealegre",
            Arrays.asList(
                "Backend",
                "Bases de Datos",
                "Desarrollo de APIs",
                "Microservicios"
            ),
            Arrays.asList(
                "SQL",
                "Java",
                "Spring Boot",
                "PostgreSQL",
                "Docker"
            ),
            Arrays.asList(
                "Tecnología",
                "Gadgets",
                "Open Source",
                "Automatización"
            ),
            "/images/perfiles/samuel-montealegre.jpg",
            "Desarrollador backend especializado en la creación de APIs robustas y servicios escalables. " +
            "Su experiencia en bases de datos le permite diseñar arquitecturas de datos eficientes. " +
            "Apasionado por las nuevas tecnologías y tendencias del desarrollo de software. " +
            "Cuenta con experiencia en la implementación de arquitecturas de microservicios y sistemas distribuidos de alta disponibilidad.",
            "#06B6D4" // Cyan
        ));
        
        return lista;
    }
    
    /**
     * Obtiene todos los integrantes del equipo.
     * @return Lista de todos los integrantes
     */
    public List<Integrante> obtenerTodos() {
        return new ArrayList<>(integrantes);
    }
    
    /**
     * Busca un integrante por su ID.
     * @param id Identificador único del integrante
     * @return Optional con el integrante si existe, vacío en caso contrario
     */
    public Optional<Integrante> buscarPorId(String id) {
        return integrantes.stream()
                .filter(i -> i.getId().equals(id))
                .findFirst();
    }
    
    /**
     * Obtiene el número total de integrantes.
     * @return Cantidad de integrantes
     */
    public int cantidadIntegrantes() {
        return integrantes.size();
    }
    
    /**
     * Busca integrantes por lenguaje de programación.
     * @param lenguaje Lenguaje a buscar
     * @return Lista de integrantes que dominan el lenguaje
     */
    public List<Integrante> buscarPorLenguaje(String lenguaje) {
        return integrantes.stream()
                .filter(i -> i.getLenguajes().stream()
                        .anyMatch(l -> l.toLowerCase().contains(lenguaje.toLowerCase())))
                .toList();
    }
    
    /**
     * Busca integrantes por área de interés.
     * @param area Área de interés a buscar
     * @return Lista de integrantes con el área de interés
     */
    public List<Integrante> buscarPorAreaInteres(String area) {
        return integrantes.stream()
                .filter(i -> i.getAreasInteres().stream()
                        .anyMatch(a -> a.toLowerCase().contains(area.toLowerCase())))
                .toList();
    }
}