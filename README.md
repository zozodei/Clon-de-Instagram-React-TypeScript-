# 🐱 Gatstagram

Réplica de Instagram hecha en React + TypeScript que consume imágenes reales de gatos desde [The Cat API](https://thecatapi.com).

---

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio
2. Instalá las dependencias:
```bash
npm install
```
3. Creá un archivo `.env` en la raíz del proyecto:

VITE_CAT_API_KEY=tu_clave_aqui

> Podés obtener tu clave gratis en [thecatapi.com](https://thecatapi.com)

4. Corré el proyecto:
```bash
npm run dev
```
5. Abrí [http://localhost:5173](http://localhost:5173) en el navegador

---

## 🛠️ Stack tecnológico

- **React** + **Vite**
- **TypeScript**
- **Axios** para el consumo de la API
- **CSS propio** sin librerías de UI

---

## 📁 Estructura del proyecto

src/

├── App.tsx                        → estado global y lógica principal

├── App.css

├── type/

│   └── tipos.ts                  → todas las interfaces TypeScript

├── data/

│   └── datausuario.ts            → datos fijos del usuario logueado e historias

└── components/

├── Sidebar/                  → navegación lateral

├── StoriesBar/               → barra de historias

├── Feed/                     → lista de publicaciones

├── PostCard/                 → tarjeta individual de cada publicación

├── PostModal/                → modal de detalle al clickear una publicación

└── ProfilePage/              → vista de perfil del usuario

---

## 🧩 Componentes

### App.tsx
Es el cerebro de la aplicación. Maneja tres estados globales:
- `posteos` — el array de publicaciones que vienen de la API
- `vistaActual` — controla si se muestra el feed o el perfil (navegación sin React Router)
- `postSeleccionado` — el post que el usuario clickeó para abrir en el modal

También tiene el `useEffect` que llama a The Cat API al cargar la app, y la función `toggleLike` que maneja el sistema de likes.

### Sidebar
Barra de navegación fija a la izquierda. Solo el botón "Perfil" tiene funcionalidad real, el resto es visual.

### StoriesBar
Fila de historias con datos fijos importados desde `datausuario.ts`. Las imágenes son fotos de gatitos.

### Feed
Recibe el array de posteos desde App y los renderiza uno por uno usando `PostCard`.

### PostCard
Tarjeta individual de cada publicación. Muestra la imagen, el usuario, los likes y la caption. El corazón cambia de estado al clickearlo (like/unlike).

### PostModal
Se abre al clickear una publicación. Muestra la imagen ampliada, los comentarios y los botones de interacción. Se cierra clickeando fuera o en la X.

### ProfilePage
Vista de perfil del usuario simulado. Muestra sus datos, estadísticas y una grilla de 3 columnas con todas las publicaciones.

---

## ⚙️ Decisiones técnicas

**TypeScript**
Se usaron interfaces para tipar todos los datos del proyecto (`posteo`, `comentario`, `UsuarioFijo`, `Historias`). Esto permite detectar errores antes de ejecutar el código y hace que cada componente sepa exactamente qué props recibe.

**Navegación sin React Router**
La navegación entre el feed y el perfil se maneja con un simple estado `vistaActual` en App.tsx. Al ser solo dos vistas, no justificaba agregar una librería extra.

**Generación dinámica de posts**
La API devuelve solo `id` y `url` de cada imagen. Con `.map()` transformamos cada imagen en un posteo completo, asignándole usuario, caption, likes aleatorios y fecha de forma dinámica.

**Variable de entorno**
La API key se guarda en `.env` y se accede con `import.meta.env.VITE_CAT_API_KEY` para no exponerla en el código fuente.

---

## 🎨 Diseño de referencia

[Instagram Web UI — Figma Community](https://www.figma.com/community/file/1235135369163092252)

---

## 📌 Funcionalidades

- ✅ Feed con 12 publicaciones reales desde The Cat API
- ✅ Like toggle con contador que sube y baja
- ✅ Modal de detalle al clickear una publicación
- ✅ Navegación entre Feed y Perfil sin React Router
- ✅ Perfil de usuario simulado con grilla de publicaciones
- ✅ Barra de historias con avatares de gatitos
- ✅ Sidebar con íconos de navegación