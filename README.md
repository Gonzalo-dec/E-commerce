# Ecommerce

Proyecto full-stack de un ecommerce multi-vendedor, desarrollado como parte de mi aprendizaje autodidacta en desarrollo backend. La idea fue construir de punta a punta un sistema similar a un marketplace real (estilo Mercado Libre), donde distintos usuarios pueden publicar productos, comprar, y gestionar sus propias ventas.

Lo armé para consolidar conceptos de backend (Node.js, Express, MySQL, autenticación, transacciones), y también para practicar el frontend con JavaScript vanilla, sin frameworks, resolviendo cada interacción manipulando el DOM directamente.

## Sobre el proyecto

Es un proyecto de aprendizaje: fui iterando funcionalidades a medida que entendía mejor cada concepto, priorizando entender el "por qué" de cada decisión (estructura de base de datos, manejo de transacciones, separación de responsabilidades) antes que copiar soluciones. Todavía hay margen para seguir mejorándolo, y lo sigo actualizando.

## Stack técnico

**Backend**
- Node.js + Express 5
- MySQL (vía mysql2)
- JWT para autenticación
- bcrypt para hashing de contraseñas
- CORS
- dotenv para variables de entorno

**Frontend**
- HTML, CSS y JavaScript vanilla (sin frameworks)
- Fetch API para consumo del backend
- Manipulación directa del DOM

## Funcionalidades principales

- **Autenticación** de usuarios con JWT y contraseñas hasheadas con bcrypt
- **CRUD de productos**, con categorías y control de stock
- **Carrito de compras** con selector de cantidad (botones +/- e input editable), validado contra el stock disponible en tiempo real
- **Checkout multi-vendedor**: si el carrito tiene productos de distintos vendedores, la compra se separa automáticamente en una orden por vendedor, cada una con su propia transacción atómica en la base de datos
- **Historial de compras** para el comprador, y **panel de ventas** para el vendedor (con datos del comprador y detalle de productos vendidos)
- **Estados de stock**: productos sin stock se muestran deshabilitados en vez de ocultarse del catálogo
- **Buscador de productos** en tiempo real desde la navbar, filtrando por nombre

## Variables de entorno

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
JWT_SECRET=
```

## Instalación

```bash

git clone https://github.com/Gonzalo-dec/E-commerce


npm install

# Configurar el archivo .env 

# Levantar el servidor
npm start
```
