package co.javeriana.dw.thymeleaf.controller;

import co.javeriana.dw.thymeleaf.model.Integrante;
import co.javeriana.dw.thymeleaf.service.IntegranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

/**
 * Controlador principal de la Wiki.
 * Gestiona todas las rutas de navegación y el formulario de contacto.
 */
@Controller
public class WikiController {
    
    @Autowired
    private IntegranteService integranteService;
    
    /**
     * Página de inicio de la Wiki.
     */
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("integrantes", integranteService.obtenerTodos());
        model.addAttribute("totalIntegrantes", integranteService.cantidadIntegrantes());
        model.addAttribute("paginaActual", "inicio");
        return "index";
    }
    
    /**
     * Ruta alternativa para la página de inicio.
     */
    @GetMapping("/inicio")
    public String inicio(Model model) {
        return home(model);
    }
    
    /**
     * Página individual de un integrante.
     * @param id Identificador único del integrante
     */
    @GetMapping("/integrante/{id}")
    public String integrante(@PathVariable String id, Model model) {
        Optional<Integrante> integrante = integranteService.buscarPorId(id);
        
        if (integrante.isEmpty()) {
            model.addAttribute("error", "Integrante no encontrado");
            model.addAttribute("integrantes", integranteService.obtenerTodos());
            return "index";
        }
        
        model.addAttribute("integrante", integrante.get());
        model.addAttribute("paginaActual", "integrante");
        return "integrante";
    }
    
    /**
     * Página del equipo (redirige a inicio con sección equipo visible).
     */
    @GetMapping("/equipo")
    public String equipo(Model model) {
        model.addAttribute("integrantes", integranteService.obtenerTodos());
        model.addAttribute("totalIntegrantes", integranteService.cantidadIntegrantes());
        model.addAttribute("paginaActual", "equipo");
        model.addAttribute("mostrarEquipo", true);
        return "index";
    }
    
    /**
     * Página del formulario de contacto.
     */
    @GetMapping("/contacto")
    public String contacto(Model model) {
        model.addAttribute("paginaActual", "contacto");
        
        // Opciones para el campo de asunto
        model.addAttribute("asuntos", new String[]{
            "Consulta General",
            "Soporte Técnico",
            "Colaboración",
            "Sugerencia",
            "Reporte de Error",
            "Otro"
        });
        
        return "contacto";
    }
    
    /**
     * Procesa el envío del formulario de contacto.
     * Nota: En esta implementación no se envía realmente el mensaje,
     * pero la estructura está preparada para una futura integración.
     */
    @PostMapping("/contacto")
    public String procesarContacto(
            @RequestParam String nombre,
            @RequestParam String correo,
            @RequestParam String telefono,
            @RequestParam String asunto,
            @RequestParam String mensaje,
            Model model,
            RedirectAttributes redirectAttributes) {
        
        // Aquí se podría implementar la lógica de envío real
        // Por ahora solo simulamos el procesamiento exitoso
        
        // Log del mensaje recibido (para demostración)
        System.out.println("=== Mensaje de Contacto Recibido ===");
        System.out.println("Nombre: " + nombre);
        System.out.println("Correo: " + correo);
        System.out.println("Teléfono: " + telefono);
        System.out.println("Asunto: " + asunto);
        System.out.println("Mensaje: " + mensaje);
        System.out.println("====================================");
        
        // Agregar mensaje de éxito
        redirectAttributes.addFlashAttribute("mensajeExito", 
            "¡Gracias por tu mensaje, " + nombre + "! Nos pondremos en contacto contigo pronto.");
        
        return "redirect:/contacto";
    }
    
    /**
     * Página de documentación.
     */
    @GetMapping("/documentacion")
    public String documentacion(Model model) {
        model.addAttribute("paginaActual", "documentacion");
        return "index";
    }
    
    /**
     * Página "Acerca de".
     */
    @GetMapping("/acerca")
    public String acerca(Model model) {
        model.addAttribute("paginaActual", "acerca");
        model.addAttribute("integrantes", integranteService.obtenerTodos());
        return "index";
    }
}