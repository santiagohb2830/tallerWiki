package co.javeriana.dw.thymeleaf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controldor principal de la Wiki.
 * Esto maneja las rutas generales del proyecto.
 */
@Controller
public class WikiController {

    // La pagina principal
    @GetMapping("/")
    public String home() {
        return "index";
    }

    // Sección de documentacion
    @GetMapping("/documentation")
    public String documentation() {
        return "index";
    }

    // Sección acerca del proyecto
    @GetMapping("/about")
    public String about() {
        return "index";
    }

    // Sección de características
    @GetMapping("/features")
    public String features() {
        return "index";
    }

}