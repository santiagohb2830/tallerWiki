CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    asunto VARCHAR(120) NOT NULL,
    mensaje VARCHAR(400) NOT NULL,
    fecha_envio TIMESTAMP NOT NULL
);
