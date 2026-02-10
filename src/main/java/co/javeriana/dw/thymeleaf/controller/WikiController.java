package co.javeriana.dw.thymeleaf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WikiController {
    
    @GetMapping("/")
    public String home() {
        return "index";
    }
    
    @GetMapping("/wiki")
    public String wiki() {
        return "index";
    }
    
    @GetMapping("/home")
    public String showHome() {
        return "index";
    }
    
    @GetMapping("/sections")
    public String sections() {
        return "index";
    }
    
    @GetMapping("/documentation")
    public String documentation() {
        return "index";
    }
    
    @GetMapping("/about")
    public String about() {
        return "index";
    }
}