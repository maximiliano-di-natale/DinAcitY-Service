# Dinacity Service 🚀

> **El gran puente e intermediario digital independiente entre usuarios y prestadores de servicios de cualquier rubro.**

Dinacity Service nace como una solución moderna, transparente e independiente para conectar a personas que necesitan resolver servicios (mecánica automotriz, gastronomía y catering, electricidad, plomería, servicios profesionales, estética, salud, cuidado de mascotas) con empresas y profesionales calificados.

---

## 🌟 Características Principales

### 1. Modo Usuario (Directorio & Buscador Inteligente)
- **Buscador en tiempo real**: Búsqueda instantánea por nombre del negocio, rubro, especialidad, dirección o palabras clave.
- **Filtros por Rubro**: Categorización visual con conteo dinámico (Mecánica, Gastronomía, Reparaciones, Profesionales, Estética, Salud, Mascotas).
- **Tarjetas de Servicio**: Calificación promedio, opiniones de clientes, sellos de verificación, ubicación y horarios.
- **Ficha Detallada de Negocio**: Catálogo completo de servicios con precios estimados, horarios detallados y dirección.
- **Contacto Directo por WhatsApp**: Intermediación ágil que abre la conversación de WhatsApp con un mensaje predeterminado listo para enviar.

### 2. Modo Empresa / Prestador (Onboarding & Registro)
- **Formulario de Registro Completo**:
  - Nombre comercial y rubro principal.
  - Frase de presentación y descripción detallada.
  - WhatsApp receptor de clientes, teléfono, correo y redes.
  - Días y horarios de atención (hábiles, sábados, domingos/urgencias).
  - Carga dinámica de servicios ofrecidos con precios estimados.
  - Foto de portada / logo con asignación inteligente de imágenes de muestra.
- **Integración Inmediata**: Al registrarse, el negocio se suma al catálogo en tiempo real con persistencia en `localStorage`.

### 3. Panel de Gestión para Empresas (Dashboard)
- **Métricas Clave**:
  - Total de visualizaciones del perfil (`views`).
  - Total de clics generados a WhatsApp (`contactClicks`).
  - Tasa de conversión estimada (CTR %).
  - Calificación y reseñas recibidas.
- **Edición en Tiempo Real**: Capacidad de actualizar eslogan, descripción, WhatsApp, dirección y horarios.
- **Previsualización Pública**: Acceso directo para comprobar cómo los usuarios ven la ficha.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 con TypeScript y Vite.
- **Estilos**: Tailwind CSS con diseño *Mobile-First* (preparado conceptualmente para una futura transición a React Native / Expo).
- **Iconos**: Lucide React.
- **Persistencia**: Capa de abstracción desacoplada (`BusinessService`) con `localStorage` y mock data inicial, lista para conectar a **Firebase Firestore** o **Supabase**.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:3000` para interactuar con la plataforma.

3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 📦 Cómo Subir los Cambios a tu Cuenta de GitHub

El repositorio Git ya ha sido inicializado localmente en esta carpeta. Para vincularlo a tu cuenta de GitHub, sigue estos sencillos pasos:

1. Crea un nuevo repositorio en tu cuenta de [GitHub](https://github.com/new) con el nombre:
   ```
   Dinacity-Service
   ```
   *(Recomendación: Déjalo vacío, sin inicializar con README ni .gitignore puesto que ya los tenemos configurados aquí).*

2. En tu terminal dentro de la carpeta del proyecto, ejecuta:
   ```bash
   git remote add origin https://github.com/<TU_USUARIO_GITHUB>/Dinacity-Service.git
   git branch -M main
   git push -u origin main
   ```

---

## 📱 Próximos Pasos (Roadmap)
- [ ] Conexión de backend real con Supabase o Firebase para sincronización en la nube.
- [ ] Sistema de reseñas y calificaciones dinámicas para que los usuarios califiquen la atención.
- [ ] Desarrollo de la aplicación móvil nativa con React Native y Expo compartiendo los mismos tipos y servicios.
