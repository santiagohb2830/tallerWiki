package co.javeriana.dw.thymeleaf.service;

import co.javeriana.dw.thymeleaf.dto.ContactFormRequest;
import co.javeriana.dw.thymeleaf.model.ContactMessage;
import co.javeriana.dw.thymeleaf.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage save(ContactFormRequest form) {
        ContactMessage message = new ContactMessage();
        message.setNombre(form.getNombre().trim());
        message.setCorreo(form.getCorreo().trim().toLowerCase());
        message.setTelefono(form.getTelefono().trim());
        message.setAsunto(form.getAsunto().trim());
        message.setMensaje(form.getMensaje().trim());
        return contactMessageRepository.save(message);
    }
}
