# 🛍️ MONDE - Mini tienda con pasarela de pago simulada

Bienvenido a **MONDE**, una tienda en línea minimalista, elegante y moderna creada como parte de un challenge técnico. Incluye listado de productos, carrito de compras y simulación de pago.

---

## 🚀 Tecnologías utilizadas

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Base de datos:** Firebase Firestore
* **Estilos:** CSS custom + animaciones

---

## 📦 Características

* Listado de productos (con stock, imagen y precio)
* Agregar/Quitar productos del carrito
* Validaciones de stock al agregar y al confirmar
* Checkout con validación de nombre y correo
* Modal de éxito con animación
* Loader inicial animado con branding
* Diseño responsive y oscuro tipo "neon store"
* Protección contra spam con Rate Limiting (backend)

---

## ⚙️ Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/monde-challenge.git
cd monde-challenge
```

### 2. Instala dependencias

#### Backend

```bash
cd BackEnd
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Configuración de Firebase

Para propósitos de evaluación, este repositorio **incluye** el archivo `firebaseKey.json` conectado a una base de datos de prueba.

> ⚠️ **Advertencia:** Este archivo contiene credenciales temporales. No debe usarse en producción. Se eliminará una vez concluido el proceso de revisión del challenge.

Si deseas usar tu propia base de datos:

1. Ve a [Firebase Console](https://console.firebase.google.com) y crea un nuevo proyecto
2. Habilita Firestore en modo prueba
3. Crea una colección llamada `products` con productos de ejemplo
4. Descarga tu clave desde la sección "Cuentas de servicio"
5. Sustituye `BackEnd/src/firebase/firebaseKey.json` con la tuya

---

## ▶️ Correr el proyecto

### 1. Iniciar el backend

```bash
cd BackEnd
node src/index.js
```

El backend quedará escuchando en `http://localhost:3001`

### 2. Iniciar el frontend

```bash
cd ../frontend
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🧪 Datos precargados

Este repositorio ya incluye productos cargados en la base de datos. Puedes probar:

* Agregar productos al carrito
* Confirmar una orden (con validación de stock)
* Ver el modal de éxito con animación

---

## 🧼 Posibles mejoras

* Integración real con Stripe o MercadoPago
* Login/Registro de usuarios
* Panel de administración para gestión de inventario
* App móvil con React Native
* Despliegue en Firebase Hosting / Vercel

---

## 👨‍💻 Autor

**Alexander Tejeda**
Challenge realizado para proceso de selección.
Gracias por revisar el proyecto 🙌
