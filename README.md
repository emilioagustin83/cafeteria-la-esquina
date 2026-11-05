# Café La Esquina · landing

Landing de una cafetería de barrio (ficticia): portada, carta, horario, opiniones, cómo llegar y formulario de contacto.
React 18 + TypeScript + Vite, sin dependencias de UI. Diseño mobile-first.

## Cómo arrancarlo

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # compila a dist/ (comprueba tipos con tsc)
npm run preview   # sirve la versión compilada
```

La URL de previsualización se publica en GitHub Pages con `.github/workflows/deploy.yml` en cada push a `main`.

## Qué está simulado

- **Envío del formulario de contacto.** No hay backend: el formulario valida los campos (nombre, email válido,
  mensaje de 10 a 1000 caracteres), espera ~0,7 s para simular la red, muestra la confirmación y guarda el mensaje
  en `localStorage` (clave `cafe-la-esquina:mensajes`). Los recibidos se ven en «Mensajes recibidos (demo)», al final
  de la página. Toda la lógica está en `src/contact.ts`: para usar un backend real basta con cambiar `sendMessage`
  por un `fetch` a la API.
- **Datos de la cafetería** (carta, precios, horario, opiniones, dirección, teléfono y email) son de ejemplo y
  están en `src/data.ts`.

## Cómo reiniciar los datos de ejemplo

Cualquiera de estas opciones borra los mensajes guardados:

- Botón **«Reiniciar datos de ejemplo»** dentro de «Mensajes recibidos (demo)».
- Abrir la página con `?reset` en la URL (por ejemplo `.../?reset`).
- Borrar la clave `cafe-la-esquina:mensajes` del `localStorage` del navegador.

La carta y el resto de contenidos no se modifican desde la web: se reinician solos al recargar.

## Estructura

- `src/App.tsx`: secciones de la página.
- `src/data.ts`: contenidos de ejemplo.
- `src/contact.ts`: validación y envío simulado del formulario.
- `src/styles.css`: estilos (variables de color en `:root`, breakpoint móvil a 760 px).
