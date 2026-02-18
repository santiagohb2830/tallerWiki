package co.javeriana.dw.thymeleaf.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ContactFormRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 120, message = "El nombre debe tener entre 3 y 120 caracteres")
    @Pattern(
            regexp = "^(?=.*\\S)[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s'-]+$",
            message = "El nombre solo puede tener letras y no puede ser solo espacios"
    )
    private String nombre;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El formato del correo no es válido")
    @Size(max = 255, message = "El correo no puede exceder 255 caracteres")
    private String correo;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^\\d{7,15}$", message = "El teléfono debe tener solo números entre 7 y 15 dígitos")
    private String telefono;

    @NotBlank(message = "Debes seleccionar un asunto")
    @Size(max = 120, message = "El asunto no puede exceder 120 caracteres")
    private String asunto;

    @NotBlank(message = "El mensaje es obligatorio")
    @Size(min = 20, max = 400, message = "El mensaje debe tener entre 20 y 400 caracteres")
    private String mensaje;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
