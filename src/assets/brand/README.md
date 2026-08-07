# Artwork de marca

Deja acá el badge de la comunidad (el pudú en el hexágono):

| Archivo           | Para qué                                                             |
| ----------------- | -------------------------------------------------------------------- |
| `badge.png`       | Versión oscura — se usa en la portada y en la página Nosotros        |
| `badge-light.png` | Versión clara (opcional) — se usa cuando el sitio está en tema claro |

En cuanto exista `badge.png`, aparece solo en el sitio: no hay que tocar código.
Si no está, las páginas se ven igual de bien sin él.

Sube la imagen en su resolución original — Astro la comprime, la convierte a
WebP y genera los tamaños que necesita durante el build.

El logo chico del header y el favicon **no** usan estos archivos: son una
versión simplificada en SVG (`src/components/Logo.astro` y
`public/favicon.svg`), porque el pudú ilustrado no se distingue a 36 píxeles. Si
cambian los colores de la marca, hay que actualizar esos dos archivos y la
paleta en `src/styles/global.css`.
