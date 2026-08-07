# AI AWS UG Chile

Sitio web del user group de AWS enfocado en inteligencia artificial en Chile.

Es un sitio **estático**: no hay servidor, base de datos ni cuentas que
mantener. Todo el contenido vive en este repositorio como archivos de texto, y
cada vez que se hace `push` a `main` el sitio se reconstruye y publica solo en
GitHub Pages. Costo de operación: **$0**.

> El código, los comentarios y los nombres de variables están en inglés. El
> contenido visible del sitio y esta documentación están en español, que es el
> idioma de la comunidad.

---

## Cómo correrlo en tu máquina

Necesitas [Node.js](https://nodejs.org) 22 o superior y
[pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev
```

Abre **http://localhost:4321**.

El servidor recarga la página sola cada vez que guardas un archivo.

| Comando        | Qué hace                                              |
| -------------- | ----------------------------------------------------- |
| `pnpm dev`     | Servidor local con recarga automática                 |
| `pnpm build`   | Genera el sitio final en `dist/`                      |
| `pnpm preview` | Sirve el resultado de `build` tal como se verá online |

---

## Agregar un evento

Crea un archivo nuevo en `src/content/events/` con el nombre
`AAAA-MM-nombre-corto.md`:

```markdown
---
title: Título del encuentro
date: 2026-10-15T19:00
endDate: 2026-10-15T21:30
summary: >-
  Dos o tres líneas que resuman de qué se trata. Esto es lo que aparece en las
  tarjetas del sitio y en las vistas previas al compartir el link.
mode: presencial # presencial | online | híbrido
venue: Oficinas de Buk # nombre corto, sale en las tarjetas
address: Roger de Flor 2775, Torre 3, piso 16 # solo en la página del evento
meetupUrl: https://www.meetup.com/ai-aws-ug-chile/events/XXXXXXXXX/
sponsors:
  - name: Buk
    url: https://... # opcional
talks:
  - title: Título de la charla
    speaker: Nombre del speaker
    role: Cargo
    company: Empresa
    level: 200 # 100 | 200 | 300 | 400 — opcional
    abstract: De qué va la charla.
    slidesUrl: https://... # opcional, agrégalo después del evento
    videoUrl: https://... # opcional
---

Acá va el texto largo del evento en Markdown: cómo llegar, qué llevar,
agradecimientos a quien prestó la sala, lo que quieras.
```

**No hay que marcar un evento como "pasado".** El sitio lo deduce de la fecha:
antes del día del evento aparece en _Próximos_, después pasa solo al archivo.

**Los niveles siguen la convención de AWS** — 100 introductorio, 200 intermedio,
300 avanzado, 400 experto. El sitio muestra el número junto a la palabra, para
que también le sirva a quien nunca ha visto esa escala.

**Las charlas se ordenan solas por nivel**, de menor a mayor, sin importar en
qué orden estén escritas en el archivo. Las que no tienen nivel quedan al final.

### Subir las presentaciones

`slidesUrl` acepta dos cosas:

- **Un archivo del repo** — deja el PDF en `public/slides/<evento>/nombre.pdf` y
  apunta a `slidesUrl: /slides/<evento>/nombre.pdf`. Es lo que usamos: no
  depende de ninguna cuenta externa y el link no se muere.
- **Una URL externa** — `https://speakerdeck.com/…`, Drive, lo que sea.

Lo mismo aplica a `videoUrl`.

Campos útiles adicionales:

- `featured: true` — fija el evento en la portada aunque haya otro más cercano.
- `draft: true` — se ve con `pnpm dev` pero no se publica. Sirve para preparar
  un evento antes de anunciarlo.
- `recordingUrl` — link a la grabación.
- `photos: 2026-10-nombre-corto` — carpeta con las fotos (ver más abajo).
- `cover: ../../assets/events/mi-imagen.jpg` — imagen de portada.

---

## Agregar fotos a un evento

Las fotos **cuelgan del evento**: no hay una colección de álbumes aparte. Dos
pasos:

**1.** Deja las fotos en `src/assets/photos/2026-10-nombre-corto/`, nombradas
`01.jpg`, `02.jpg`, `03.jpg`… El número define el orden en que se muestran.

**2.** Apunta el evento a esa carpeta:

```yaml
photos: 2026-10-nombre-corto
coverPhoto: '07.jpg' # opcional: cuál foto encabeza la página del evento
```

Eso es todo — **no hay que listar las fotos en ningún archivo**. El sitio lee la
carpeta directamente, y aparecen en la página del evento.

Se muestran en **mosaico** (masonry): cada foto conserva su proporción real, así
que las verticales se ven verticales y las horizontales horizontales. No hay que
recortar nada antes de subirlas.

La foto de `coverPhoto` encabeza además la página del evento, así que no hace
falta subir una imagen de portada aparte.

Si además tienen un álbum completo en otro lado (Google Photos, Flickr),
agreguen `photosUrl: https://…` y sale un botón "ver álbum completo".

### Por qué las fotos viven en el evento

Un evento es **una sola página con todo**: la información, las presentaciones y
las fotos, en tres pestañas. Así hay una única URL para compartir, y un solo
archivo que mantener.

No hay página de galería aparte: existió y se eliminó, porque terminaba siendo
una lista de eventos que redirigía a los eventos. Las fotos se descubren desde
la tarjeta de cada encuentro, que indica cuántas tiene.

Las pestañas se enlazan por URL: `/eventos/<evento>#fotos` abre directamente la
galería de ese encuentro, y `/eventos#pasados` abre el archivo.

### Sobre el peso de las fotos

Sube las fotos tal como salen de la cámara o el celular; Astro las comprime, las
convierte a WebP y genera varios tamaños durante el build. Una foto de 4 MB
termina pesando unos 80 KB para quien visita el sitio.

Lo único que sí conviene cuidar es el peso del **repositorio**, porque GitHub
recomienda mantenerlo bajo 1 GB. Como referencia: unas 40 fotos por evento a ~3
MB cada una son ~120 MB por año, lo que da varios años de holgura. Si en algún
momento se acerca al límite, la salida es mover los álbumes viejos a Google
Photos y dejar el link en el campo `externalUrl` del álbum.

---

## Agregar o cambiar organizadores

Un archivo por persona en `src/content/organizers/`:

```markdown
---
name: Nombre Apellido
role: Rol dentro del grupo
order: 1 # controla la posición en la grilla
active: true # false = organizador anterior, se acredita más abajo
photo: ../../assets/organizers/nombre.jpg # opcional
links:
  linkedin: https://...
  github: https://...
---

Dos o tres líneas en primera o tercera persona, como prefieras.
```

Si no hay foto, el sitio muestra las iniciales sobre un degradado.

---

## La marca

La identidad sale del badge de la comunidad: el pudú en el hexágono, frente a la
cordillera y bajo la constelación.

| Token   | Color     | De dónde sale                                |
| ------- | --------- | -------------------------------------------- |
| `night` | `#1E2440` | Fondo del badge y base del tema oscuro       |
| `brand` | `#9269F2` | El violeta del hexágono — acento principal   |
| `fawn`  | `#D48B36` | El pelaje del pudú — acento secundario       |
| `cream` | `#F4EDE0` | El tono cálido de la versión clara del badge |

Están definidos en `src/styles/global.css`. Cambiar un valor ahí lo cambia en
todo el sitio.

**El badge ilustrado va en `src/assets/brand/badge.png`** (ver el README de esa
carpeta). Aparece solo en la portada en cuanto el archivo exista; si no está, el
sitio se ve bien igual.

El logo del header y el favicon son una versión simplificada en SVG
(`src/components/Logo.astro` y `public/favicon.svg`) porque el pudú ilustrado no
se distingue a 36 píxeles. Si cambia la marca, hay que tocar esos dos archivos.

---

## Cambiar textos e información de contacto

- **`src/config.ts`** — nombre del grupo, correo, redes sociales, links de
  Meetup y LinkedIn, URL del Google Form y los ítems del menú. Vaciar un link lo
  hace desaparecer de todo el sitio automáticamente.
- **`src/pages/nosotros.astro`** — quiénes somos y cómo funcionamos, en dos
  arreglos al principio del archivo (`about` y `values`).
- **`src/pages/index.astro`** — los textos de la portada.
- **`src/pages/call-for-speakers.astro`** — qué buscamos en una charla y qué
  cosas van por correo en vez de por el formulario.

### El call for speakers

El Google Form embebido es **solo para propuestas de charla**. Todo lo demás
—prestar una sala, ayudar a organizar, cualquier duda— va al correo, que aparece
en el encabezado de esa página y en el footer de todo el sitio.

Para reconectarlo si cambian de formulario:

1. En el formulario: **Enviar → `<>` (insertar HTML)**.
2. Copia la URL del atributo `src` a `speakerFormEmbedUrl` en `src/config.ts`, y
   la misma sin `?embedded=true` a `speakerFormUrl`.
3. Copia el `height` del snippet a `speakerFormHeight`. **Si te saltas esto**,
   el formulario queda con scroll dentro de su propia caja.

Mientras no esté configurado, la página muestra estas instrucciones en vez del
formulario.

---

## Publicar en GitHub Pages

Solo se hace una vez:

1. Sube el repo a GitHub como **público** (Pages gratis requiere repo público).
2. Ve a **Settings → Pages** y en _Source_ elige **GitHub Actions**.
3. Haz `push` a `main`.

Listo. Desde ahí, cada push publica el sitio en unos dos minutos. El progreso se
ve en la pestaña **Actions**.

El repo se llama igual que la organización (`ai-aws-ug-chile.github.io`), así
que GitHub Pages lo sirve desde la raíz del dominio y las URLs no llevan
prefijo.

### Si más adelante compran un dominio propio

Cambia `site` en `astro.config.mjs`:

```js
site: 'https://aiugchile.cl',
```

Agrega además un archivo `public/CNAME` con el dominio adentro y configúralo en
**Settings → Pages → Custom domain**.

---

## Cómo colaborar

No hace falta saber programar para aportar contenido: los eventos, las fotos y
las biografías son archivos de texto e imágenes.

1. Haz un fork del repositorio.
2. Crea una rama: `git checkout -b evento-octubre`.
3. Agrega o edita los archivos.
4. Verifica que el sitio compile: `pnpm build`.
5. Abre un Pull Request.

Si prefieres no pelear con git, abre un [issue](../../issues/new/choose) con la
información del evento o de tu charla y un organizador lo sube por ti.

### Si el build falla

Es a propósito y es buena señal: el sitio valida el contenido antes de
publicarlo. Los errores más comunes:

- **`bad indentation` o `unexpected character`** — un título que lleva `:` debe
  ir entre comillas: `title: 'Agentes: de la demo a producción'`.
- **`Invalid url`** — un link sin `https://` adelante.
- **`Expected type Date`** — la fecha debe ir como `2026-10-15T19:00`.
- **Las fotos no aparecen** — el `photos:` del evento tiene que coincidir
  exactamente con el nombre de la carpeta en `src/assets/photos/`.
- **Borraste contenido y sigue apareciendo** — Astro guarda una caché que no
  purga lo eliminado: `rm -rf node_modules/.astro` y vuelve a construir.

---

## Estructura del proyecto

```
src/
├── assets/
│   ├── albums/         Fotos, una carpeta por evento
│   └── brand/          El badge de la comunidad
├── components/         Piezas reutilizables de la interfaz
├── content/
│   ├── events/         Un archivo .md por evento
│   └── organizers/     Un archivo .md por organizador
├── layouts/            Estructura común de todas las páginas
├── lib/                Lógica de fechas, eventos y fotos
├── pages/              Cada archivo es una URL del sitio
├── styles/             Colores, tipografías y estilos base
├── config.ts           Configuración central del sitio
└── content.config.ts   Reglas que valida el build
```

Las URLs que genera:

```
/                              Portada
/nosotros                      Quiénes somos y equipo
/eventos                       Pestañas: Próximos | Pasados
/eventos/<evento>              Pestañas: Descripción | Presentaciones | Galería
/call-for-speakers             Propón una charla (+ correo para lo demás)
```

---

## Licencia

- **Código**: [MIT](LICENSE)
- **Contenido** (textos, fotos, presentaciones):
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)

Si sales en una foto y prefieres que la bajemos, escríbenos y la quitamos sin
preguntas.
