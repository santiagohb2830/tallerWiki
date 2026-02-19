# Taller Wiki - Spring Boot + Thymeleaf + PostgreSQL

Aplicación web server-side tipo Wiki desarrollada con Spring Boot y Thymeleaf.
Incluye navegación entre secciones, vistas dinámicas de integrantes y formulario de contacto con validaciones en frontend y backend.

## 1. Tecnologías usadas

- Java 21
- Spring Boot 4.0.2
- Spring MVC
- Thymeleaf
- Spring Data JPA
- PostgreSQL 16
- Maven Wrapper (`./mvnw`)
- Docker + Docker Compose

## 2. Estructura general (MVC)

- Controlador principal: `src/main/java/co/javeriana/dw/thymeleaf/controller/WikiController.java`
- Modelo de integrantes: `src/main/java/co/javeriana/dw/thymeleaf/model/Integrante.java`
- Servicio de integrantes: `src/main/java/co/javeriana/dw/thymeleaf/service/IntegranteService.java`
- DTO de contacto (validación backend): `src/main/java/co/javeriana/dw/thymeleaf/dto/ContactFormRequest.java`
- Entidad JPA de contacto: `src/main/java/co/javeriana/dw/thymeleaf/model/ContactMessage.java`
- Repositorio JPA: `src/main/java/co/javeriana/dw/thymeleaf/repository/ContactMessageRepository.java`
- Servicio de persistencia de contacto: `src/main/java/co/javeriana/dw/thymeleaf/service/ContactMessageService.java`
- Plantillas Thymeleaf: `src/main/resources/templates/`
- JS de validaciones frontend: `src/main/resources/static/validaciones.js`
- Script de esquema SQL: `src/main/resources/schema.sql`

## 3. Qué se implementó en el formulario de contacto

- Persistencia real de mensajes en PostgreSQL (`contact_messages`).
- Validaciones frontend en JavaScript (campos obligatorios, formatos, longitudes y contador de caracteres).
- Validaciones backend con Bean Validation:
  - nombre: obligatorio, mínimo 3, no solo espacios.
  - correo: obligatorio y formato válido.
  - teléfono: solo números, 7-15 dígitos.
  - asunto: obligatorio.
  - mensaje: obligatorio, 20-400 caracteres.
- Retroalimentación de errores backend por campo en la vista `contacto.html`.

## 4. Endpoints principales

- `GET /` -> inicio de la wiki
- `GET /inicio` -> alias de inicio
- `GET /equipo` -> sección de equipo
- `GET /integrante/{id}` -> perfil de integrante
- `GET /contacto` -> formulario
- `POST /contacto` -> valida y guarda mensaje en BD

## 5. Compilar y probar en local

Desde la raíz del proyecto se ejecuta:

```bash
./mvnw clean package
```

Para ejecutar pruebas:

```bash
./mvnw test
```

Nota: las pruebas usan H2 en memoria (`src/test/resources/application.properties`), por lo tanto no requieren PostgreSQL levantado.

## 6. Ejecutar con Docker (recomendado)

Para levantar la aplicación y PostgreSQL:

```bash
docker compose up --build
```

Para levantar en segundo plano:

```bash
docker compose up -d --build
```

La aplicación queda disponible en:

- `http://localhost:8080`

Para detener contenedores:

```bash
docker compose down
```

Para detener y borrar datos persistidos de PostgreSQL:

```bash
docker compose down -v
```

## 7. Configuración de base de datos

### Variables usadas por Docker Compose

- DB: `wiki_db`
- Usuario: `wiki_user`
- Password: `wiki_pass`
- Host interno (entre contenedores): `postgres`
- Puerto expuesto local: `5432`

### Configuración Spring

- General/local: `src/main/resources/application.properties`
- Perfil prod (docker): `src/main/resources/application-prod.properties`
- Tests: `src/test/resources/application.properties`

## 8. Ver datos guardados del formulario

Para entrar al contenedor de PostgreSQL:

```bash
docker exec -it wiki-postgres psql -U wiki_user -d wiki_db
```

Para listar mensajes:

```sql
SELECT id, nombre, correo, telefono, asunto, mensaje, fecha_envio
FROM contact_messages
ORDER BY id DESC;
```

Para salir de `psql`:

```sql
\q
```

## 9. Consultas SQL útiles

Para contar mensajes:

```sql
SELECT COUNT(*) AS total_mensajes FROM contact_messages;
```

Para consultar solo los últimos 5 registros:

```sql
SELECT id, nombre, correo, asunto, fecha_envio
FROM contact_messages
ORDER BY fecha_envio DESC
LIMIT 5;
```

Para buscar por asunto:

```sql
SELECT id, nombre, correo, asunto, fecha_envio
FROM contact_messages
WHERE asunto = 'Soporte Técnico'
ORDER BY fecha_envio DESC;
```

Para buscar por correo:

```sql
SELECT *
FROM contact_messages
WHERE correo ILIKE '%correo.com%'
ORDER BY fecha_envio DESC;
```

## 10. Correr sin Docker (opcional)

Se requiere un PostgreSQL local en ejecución con base de datos y usuario válidos.
Se pueden usar las variables por defecto o sobreescribirlas:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/wiki_db
export SPRING_DATASOURCE_USERNAME=wiki_user
export SPRING_DATASOURCE_PASSWORD=wiki_pass
./mvnw spring-boot:run
```

## 11. Estado del proyecto frente al taller

- Arquitectura MVC implementada.
- Vistas Thymeleaf dinámicas con fragmentos reutilizables.
- Formulario de contacto completo con validaciones frontend.
- Validaciones backend y persistencia en PostgreSQL.
- Despliegue funcional por Docker Compose.

## 12. Troubleshooting rápido

- Error de puerto 8080 ocupado:
  - se debe cambiar el mapeo en `docker-compose.yml` (ej: `8081:8080`).
- Error de puerto 5432 ocupado:
  - se debe cambiar el mapeo de PostgreSQL (ej: `5433:5432`).
- Si se cambia la estructura SQL y hay conflictos:
  - se recomienda reiniciar en limpio con `docker compose down -v` y luego `docker compose up --build`.
