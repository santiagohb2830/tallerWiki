package co.javeriana.dw.thymeleaf.controller;

import co.javeriana.dw.thymeleaf.dto.ContactFormRequest;
import co.javeriana.dw.thymeleaf.model.Integrante;
import co.javeriana.dw.thymeleaf.service.ContactMessageService;
import co.javeriana.dw.thymeleaf.service.IntegranteService;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.validation.Valid;

import java.util.Optional;

/**
 * Controlador principal de la Wiki.
 * Gestiona todas las rutas de navegación y el formulario de contacto.
 */
@Controller
public class WikiController {

    private final IntegranteService integranteService;
    private final ContactMessageService contactMessageService;

    public WikiController(IntegranteService integranteService, ContactMessageService contactMessageService) {
        this.integranteService = integranteService;
        this.contactMessageService = contactMessageService;
    }
    
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
        agregarAsuntos(model);
        if (!model.containsAttribute("contactForm")) {
            model.addAttribute("contactForm", new ContactFormRequest());
        }
        return "contacto";
    }
    
    /**
     * Procesa el envío del formulario de contacto.
     * Nota: En esta implementación no se envía realmente el mensaje,
     * pero la estructura está preparada para una futura integración.
     */
    @PostMapping("/contacto")
    public String procesarContacto(
            @Valid @ModelAttribute("contactForm") ContactFormRequest contactForm,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("paginaActual", "contacto");
            agregarAsuntos(model);
            return "contacto";
        }

        contactMessageService.save(contactForm);

        redirectAttributes.addFlashAttribute("mensajeExito", 
            "¡Gracias por tu mensaje, " + contactForm.getNombre() + "! Nos pondremos en contacto contigo pronto.");
        
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

    private void agregarAsuntos(Model model) {
        model.addAttribute("asuntos", new String[]{
                "Consulta General",
                "Soporte Técnico",
                "Colaboración",
                "Sugerencia",
                "Reporte de Error",
                "Otro"
        });
    }
}
