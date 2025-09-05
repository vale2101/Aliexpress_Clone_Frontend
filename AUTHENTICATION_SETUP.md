# Configuración de Autenticación - AliExpress Clone

## ✅ **Conexión Frontend-Backend Completada**

He conectado exitosamente tu frontend con el backend para el sistema de autenticación (login y registro).

## 📁 **Archivos Creados/Modificados:**

### **Nuevos Archivos:**
- `config/api.ts` - Configuración de la API del backend
- `services/authService.ts` - Servicio para comunicación con el backend
- `contexts/AuthContext.tsx` - Contexto de autenticación global
- `AUTHENTICATION_SETUP.md` - Este archivo de documentación

### **Archivos Modificados:**
- `app/layout.tsx` - Agregado AuthProvider
- `components/organisms/AuthForm.tsx` - Integrado con el servicio de autenticación
- `components/molecules/IconGroup.tsx` - Muestra estado de autenticación

## 🔧 **Configuración Requerida:**

### **1. Variables de Entorno**
Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### **2. Configuración del Backend**
Asegúrate de que tu backend esté corriendo en el puerto 3000 y tenga CORS habilitado para `http://localhost:3001` (puerto de Next.js).

### **3. Estructura de Datos Esperada**
El frontend está configurado para trabajar con la estructura de tu backend:

**Login:**
```json
POST /api/user/login
{
  "email": "usuario@ejemplo.com",
  "contrasena": "password123"
}
```

**Registro:**
```json
POST /api/user/createUser
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "usuario@ejemplo.com",
  "contrasena": "password123",
  "telefono": "123456789",
  "rol": 1,
  "estado": "activo"
}
```

## 🚀 **Funcionalidades Implementadas:**

### **✅ Login:**
- Formulario de login funcional
- Validación de credenciales
- Manejo de errores
- Redirección automática después del login
- Estado de carga con spinner

### **✅ Registro:**
- Formulario de registro completo
- Validación de contraseñas coincidentes
- Campos requeridos: nombre, apellido, email, contraseña, teléfono
- Login automático después del registro exitoso

### **✅ Estado de Autenticación:**
- Contexto global para manejar el estado del usuario
- Persistencia en localStorage
- Verificación automática al cargar la app
- UI dinámica según el estado de autenticación

### **✅ UI/UX:**
- Indicadores de carga durante las operaciones
- Mensajes de error claros
- Botón de logout para usuarios autenticados
- Saludo personalizado con el nombre del usuario

## 🔄 **Flujo de Autenticación:**

1. **Usuario no autenticado:**
   - Ve "¡Bienvenido Identifícate / Regístrate" en la barra superior
   - Al hacer clic, va a `/user` para login/registro

2. **Login:**
   - Usuario ingresa email y contraseña
   - Se envía petición a `POST /api/user/login`
   - Backend valida credenciales y devuelve token en cookie
   - Frontend actualiza estado y redirige a home

3. **Registro:**
   - Usuario llena formulario completo
   - Se envía petición a `POST /api/user/createUser`
   - Backend crea usuario y devuelve confirmación
   - Frontend hace login automático

4. **Usuario autenticado:**
   - Ve "¡Hola, [Nombre]!" en la barra superior
   - Botón "Cerrar sesión" disponible
   - Estado persistente entre recargas de página

## 🛠 **Próximos Pasos:**

1. **Configurar variables de entorno** (crear `.env.local`)
2. **Iniciar tu backend** en puerto 3000
3. **Iniciar el frontend** con `npm run dev`
4. **Probar el flujo completo** de login/registro

## 🔍 **Debugging:**

Si hay problemas de conexión:
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la consola del navegador para errores de CORS
- Asegúrate de que las variables de entorno estén configuradas
- Verifica que las rutas del backend coincidan con las configuradas

¡La integración está lista para usar! 🎉
