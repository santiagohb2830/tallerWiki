package co.javeriana.dw.thymeleaf.model;

import java.util.List;

/**
 * Modelo que representa un integrante del equipo de trabajo.
 * Contiene información personal, profesional y de habilidades.
 */
public class Integrante {
    
    private String id;
    private String nombre;
    private List<String> areasInteres;
    private List<String> lenguajes;
    private List<String> pasatiempos;
    private String imagen;
    private String descripcion;
    private String colorTema;
    
    // Constructores
    public Integrante() {
    }
    
    public Integrante(String id, String nombre, List<String> areasInteres, 
                      List<String> lenguajes, List<String> pasatiempos, 
                      String imagen, String descripcion, String colorTema) {
        this.id = id;
        this.nombre = nombre;
        this.areasInteres = areasInteres;
        this.lenguajes = lenguajes;
        this.pasatiempos = pasatiempos;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.colorTema = colorTema;
    }
    
    // Getters y Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public List<String> getAreasInteres() {
        return areasInteres;
    }
    
    public void setAreasInteres(List<String> areasInteres) {
        this.areasInteres = areasInteres;
    }
    
    public List<String> getLenguajes() {
        return lenguajes;
    }
    
    public void setLenguajes(List<String> lenguajes) {
        this.lenguajes = lenguajes;
    }
    
    public List<String> getPasatiempos() {
        return pasatiempos;
    }
    
    public void setPasatiempos(List<String> pasatiempos) {
        this.pasatiempos = pasatiempos;
    }
    
    public String getImagen() {
        return imagen;
    }
    
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getColorTema() {
        return colorTema;
    }
    
    public void setColorTema(String colorTema) {
        this.colorTema = colorTema;
    }
    
    // Método utilitario para obtener las iniciales del nombre
    public String getIniciales() {
        if (nombre == null || nombre.isEmpty()) {
            return "?";
        }
        String[] partes = nombre.split(" ");
        StringBuilder iniciales = new StringBuilder();
        for (int i = 0; i < Math.min(2, partes.length); i++) {
            if (!partes[i].isEmpty()) {
                iniciales.append(partes[i].charAt(0));
            }
        }
        return iniciales.toString().toUpperCase();
    }
    
    // Método para obtener el primer nombre
    public String getPrimerNombre() {
        if (nombre == null || nombre.isEmpty()) {
            return "";
        }
        return nombre.split(" ")[0];
    }
    
    @Override
    public String toString() {
        return "Integrante{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", areasInteres=" + areasInteres +
                ", lenguajes=" + lenguajes +
                ", pasatiempos=" + pasatiempos +
                '}';
    }
}
