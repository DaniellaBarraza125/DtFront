# Nombre del Proyecto

## Descripción

Este proyecto es una aplicación web desarrollada para gestionar eventos y reuniones, permitiendo a los usuarios registrarse, iniciar sesión, ver la programación, y participar en eventos y reuniones personalizadas (One to One). La aplicación incluye roles diferenciados para usuarios y ponentes (speakers), y cuenta con una zona administrativa para gestionar los eventos y usuarios.

## Tabla de Contenidos

-   [Introducción](#introducción)
-   [Diseño](#diseño)
-   [Características](#características)
-   [Instalación](#instalación)
-   [Uso](#uso)
-   [Autor](#autor)
-   [Repositorio del Backend](#repositorio-del-backend)

## Características

-   **Registro e Inicio de Sesión:** Los usuarios pueden registrarse y autenticarse en la aplicación.
-   **Gestión de Eventos:** Los administradores pueden crear y gestionar eventos, asignar salas y fechas específicas.
-   **Programación Personalizada:** Los usuarios pueden ver y participar en eventos y reuniones personalizadas.
-   **Roles y Permisos:** Diferenciación de roles entre usuarios y speakers, con permisos específicos para cada uno.
-   **Panel Administrativo:** Gestión de usuarios, eventos y reuniones desde una interfaz dedicada para administradores.

## Tecnologías Utilizadas

-   **Frontend:**
    -   React
    -   Chakra UI
    -   React Router
    -   Figma
    -   Vercel
-   **Backend:**
    -   Node.js
    -   Express
    -   Sequelize (ORM)
    -   Render
-   **Base de Datos:**
    -   MySQL
-   **Autenticación:**
    -   JWT (JSON Web Tokens)
-   **Otros:**
    -   Day.js (para manejo de fechas)
    -   Axios (para solicitudes HTTP)
    -   Framer Motion (para animaciones)
    -   Google APIs (para integración con Google Docs)
    -   Stripe (para procesamiento de pagos)

## Instalación

### Prerrequisitos

-   Node.js
-   MySQL

### Clonar el Repositorio

```bash
git clone https://github.com/DaniellaBarraza125/DtFront.git
cd DtFront
npm install
npm run dev
```

### Despliegue

Hemos desplegado el frontend en Vercel y el backend en Render. Por lo cual, puedes acceder a toda la funcionalidad sin necesidad de clonar el repositorio desde el siguiente link: https://elearningexperience.vercel.app/

El despliegue de aplicaciones en plataformas como Vercel y Render es crucial por varias razones. En primer lugar, facilita el acceso inmediato a la aplicación para los usuarios finales sin necesidad de instalaciones complicadas. Además, garantiza que el frontend y el backend estén alojados en entornos optimizados para su rendimiento, escalabilidad y seguridad. Utilizando Vercel para el frontend, podemos aprovechar su infraestructura global para una entrega rápida de contenido, mientras que Render proporciona un entorno robusto para la ejecución del backend, permitiendo una gestión eficiente de bases de datos, autenticación y otras operaciones del servidor.

## Repositorio del Backend

El backend de este proyecto ha sido desarrollado con Node.js y Sequelize. Hemos desplegado el backend en Render, lo cual es importante ya que Render ofrece un entorno de ejecución confiable y escalable para nuestras aplicaciones, asegurando un rendimiento óptimo y alta disponibilidad. Además, puedes probar el backend directamente utilizando herramientas como Postman, sin necesidad de clonar el repositorio.

Puedes encontrar el código fuente del backend en el siguiente enlace:
https://github.com/JuanjoSalas/DT-Back

link con la documentacion:

https://documenter.getpostman.com/view/34523030/2sA3dxEXJg

## Autores

-   [@DaniellaBarraza125](https://github.com/DaniellaBarraza125)
-   [@JuanjoSalas](https://github.com/JuanjoSalas)
-   [@JCLLacruz](https://github.com/JCLLacruz)
-   [@evagarcle](https://github.com/evagarcle)
