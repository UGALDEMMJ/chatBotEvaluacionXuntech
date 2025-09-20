# Chatbot XumTech - Sistema de Asistente Virtual

Un sistema completo de chatbot inteligente desarrollado para **XumTech**, que incluye una interfaz web moderna y una API REST robusta para gestionar conversaciones automatizadas.

## 🚀 Características Principales

- **Interfaz de chat moderna** con diseño responsivo
- **Gestión de múltiples conversaciones** simultáneas
- **Base de datos inteligente** de preguntas y respuestas
- **API REST completa** para integración
- **Autenticación y seguridad** con middleware de protección
- **Persistencia de conversaciones** en MongoDB
- **Comunicación segura** con HTTPS/SSL

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite 7** - Herramienta de desarrollo rápida
- **TailwindCSS 4** - Framework de estilos utilitarios
- **JavaScript ES6+** - Lenguaje de programación moderno

### Backend
- **Node.js** - Entorno de ejecución
- **Express 5** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8** - ODM para MongoDB
- **JWT** - Autenticación mediante tokens
- **Helmet** - Middleware de seguridad
- **CORS** - Control de acceso de origen cruzado
- **Rate Limiting** - Limitación de peticiones

## 📋 Requisitos Previos

- **Node.js** 18 o superior
- **MongoDB** 6.0 o superior
- **npm** o **yarn**
- Certificados SSL (opcionales para desarrollo)

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/UGALDEMMJ/chatBotEvaluacionXuntech.git
cd chatBotEvaluacionXuntech
```

### 2. Configuración del Backend

```bash
cd backend
npm install
```

#### Variables de entorno (.env)
Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
MONGO_URI=mongodb://localhost:27017/chatbot_xumtech
PORT=3000
API_KEY=supersecretkey
ALLOWED_ORIGINS=https://localhost:5173
JWT_SECRET=tu_jwt_secret_aqui
```

#### Certificados SSL (Opcional)
Para desarrollo con HTTPS, crear certificados autofirmados:
```bash
# En las carpetas backend/certs y frontend/certs
openssl req -x509 -newkey rsa:4096 -keyout localhost-key.pem -out localhost.pem -days 365 -nodes -subj "/C=CR/ST=San Jose/L=San Jose/O=XumTech/CN=localhost"
```

#### Inicializar la base de datos
```bash
# Poblar la base de datos con preguntas y respuestas de ejemplo
node database/seed.js

# Crear usuario anónimo para testing
node database/seed2.js
```

### 3. Configuración del Frontend

```bash
cd frontend
npm install
```

## 🚀 Ejecución

### Desarrollo

#### Backend
```bash
cd backend
npm run dev
```
El servidor estará disponible en `https://localhost:3000` (HTTPS) o `http://localhost:3000` (HTTP)

#### Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `https://localhost:5173`

### Producción

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
chatBotEvaluacionXuntech/
├── backend/
│   ├── database/
│   │   ├── connection.js     # Configuración de conexión a MongoDB
│   │   ├── seed.js          # Datos de ejemplo para preguntas/respuestas
│   │   └── seed2.js         # Usuario anónimo para testing
│   ├── middleware/
│   │   ├── authMiddleware.js # Validación de API key
│   │   └── rateLimit.js     # Limitación de peticiones
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Rutas de la API
│   │   ├── services/        # Lógica de negocio
│   │   └── utils/           # Utilidades
│   ├── index.js             # Punto de entrada del servidor
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx          # Componente principal del chat
    │   ├── main.jsx         # Punto de entrada
    │   └── index.css        # Estilos globales
    ├── public/              # Archivos estáticos
    ├── index.html           # Plantilla HTML
    ├── vite.config.js       # Configuración de Vite
    └── package.json
```

## 🔌 API Endpoints

### Autenticación
Todas las rutas requieren el header: `Authorization: Bearer supersecretkey`

### Chat
- `POST /api/chat/` - Crear nuevo chat
- `GET /api/chat/user` - Obtener chats del usuario
- `DELETE /api/chat/:id` - Eliminar chat

### Conversaciones
- `GET /api/conversacion/conversaciones/:chatId` - Obtener conversaciones de un chat
- `POST /api/conversacion/` - Crear nueva conversación

### Preguntas
- `POST /api/preguntas/respuesta` - Procesar pregunta y obtener respuesta
- `GET /api/preguntas/all` - Obtener todas las preguntas

### Respuestas
- `GET /api/respuestas/all` - Obtener todas las respuestas

### Usuarios
- `GET /api/user/` - Obtener información del usuario

## 📊 Modelos de Datos

### Pregunta
```javascript
{
  texto: String,          // Texto de la pregunta
  answerId: ObjectId,     // ID de la respuesta asociada
  estado: Boolean,        // Activa/Inactiva
  timestamps: true
}
```

### Respuesta
```javascript
{
  texto: String,          // Texto de la respuesta
  timestamps: true
}
```

### Chat
```javascript
{
  userId: String,         // ID del usuario
  titulo: String,         // Título del chat
  timestamps: true
}
```

### Conversacion
```javascript
{
  chatId: ObjectId,       // ID del chat
  pregunta: String,       // Pregunta del usuario
  respuesta: String,      // Respuesta del bot
  timestamps: true
}
```

### Usuario
```javascript
{
  email: String,          // Email del usuario
  name: String,           // Nombre del usuario
  password: String,       // Contraseña encriptada
  isActive: Boolean,      // Usuario activo
  token: String,          // Token de sesión
  timestamps: true
}
```

## 🔒 Seguridad

- **API Key Authentication**: Todas las rutas están protegidas
- **Rate Limiting**: Limitación de peticiones por IP
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso de origen cruzado configurado
- **HTTPS**: Soporte para certificados SSL/TLS

## 🎯 Funcionalidades del Chatbot

El chatbot incluye respuestas predefinidas para:

- ✅ Información de la empresa
- ✅ Horarios de atención
- ✅ Ubicación física
- ✅ Información de contacto
- ✅ Servicios ofrecidos
- ✅ Precios y métodos de pago
- ✅ Garantías de productos
- ✅ Historia de la empresa

## 🧪 Testing

```bash
# Backend (próximamente)
cd backend
npm test

# Frontend (linting)
cd frontend
npm run lint
```

## 📈 Scripts Disponibles

### Backend
- `npm run dev` - Ejecutar en modo desarrollo con nodemon
- `npm test` - Ejecutar tests (configurar próximamente)

### Frontend
- `npm run dev` - Servidor de desarrollo con Vite
- `npm run build` - Construir para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecutar ESLint

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Desarrolladores

Desarrollado para **XumTech** - Marcos Ugalde Morales.

---
