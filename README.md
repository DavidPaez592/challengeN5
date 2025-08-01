# Frontend Challenge - Microfrontends + i18n + Styled Components + SOLID

Este proyecto lo desarrollé como parte del challenge técnico para la compañía N5 enfocado en la vacante de **Frontend Senior**. Está construido completamente desde cero con **React**, aplicando arquitectura de microfrontends (MFE) con `Module Federation`, un sistema de internacionalización profesional (`i18n`), `Styled Components` con metodología BEM, pruebas unitarias y principios SOLID.

---

## Instrucciones generales

Todo el proyecto está contenido en una carpeta llamada `N5`. Te recomiendo descomprimir el archivo y abrirlo desde esta carpeta para que las rutas funcionen correctamente.

Para correr el proyecto, puedes usar Mac o Windows sin problemas:

- En Mac, abre una terminal y navega a la carpeta de cada microfrontend o al host dentro de `N5`.
- En Windows o Linux, abre una terminal por cada microfrontend o host y navega a la ruta correspondiente dentro de `N5`.

Para instalar las dependencias necesarias en cada proyecto, simplemente ejecuta `bun install` dentro de cada microfrontend y en el host.

También puedes instalar y ejecutar todos los microfrontends desde la raíz del proyecto (carpeta `N5`):

### Automatización para Mac (Terminal)
Puedes usar los siguientes comandos para abrir todos los microfrontends desde la raíz:
```bash
osascript -e 'tell application "Terminal" to do script "cd ~/Desktop/N5/mfe-rick && bun run start"'
osascript -e 'tell application "Terminal" to do script "cd ~/Desktop/N5/mfe-dbz && bun run start"'
osascript -e 'tell application "Terminal" to do script "cd ~/Desktop/N5/mfe-anime && bun run start"'
osascript -e 'tell application "Terminal" to do script "cd ~/Desktop/N5/mfe-harry && bun run start"'
```

### Para usuarios de Windows
Abre una terminal (por ejemplo, PowerShell) en la carpeta `N5`, y en cada una de las subcarpetas `mfe-*`, ejecuta:
```bash
bun install
bun run start
```

Finalmente, para levantar el host:
```bash
cd app-host
bun install
bun run start
```

Solo necesitas tener instalado [Bun](https://bun.sh) para correr el proyecto. Si no lo tienes instalado, puedes hacerlo fácilmente con este comando:

# Mac/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

### ⚡ Alternativa: Ejecutar todo con un solo comando

Si prefieres instalar y correr todos los microfrontends al mismo tiempo desde la raíz (`N5`), puedes ejecutar los siguientes comandos por separado en la terminal:

```bash
# Instalación de dependencias en todos los proyectos
cd ~/Desktop/N5
bun install --cwd mfe-rick
bun install --cwd mfe-dbz
bun install --cwd mfe-anime
bun install --cwd mfe-harry
bun install --cwd app-host
```

```bash
# Levantar todos los microfrontends (usar una terminal por comando o usar & en bash)
bun run --cwd mfe-rick start &
bun run --cwd mfe-dbz start &
bun run --cwd mfe-anime start &
bun run --cwd mfe-harry start &
```

```bash
# Finalmente levantar el host
bun run --cwd app-host start
```

> En Windows, puedes hacer lo mismo con PowerShell, solo cambia `&` por abrir varias terminales o usar `Start-Process`.

---

## Arquitectura General

La solución que implementé se compone de 5 proyectos independientes:

- **Host App (`app-host`)**: es la aplicación principal que maneja el selector de microfrontend y el cambio de idioma.
- **Microfrontends**: 
  - `mfe-rick`: personajes del universo Rick and Morty.
  - `mfe-dbz`: personajes del universo Dragon Ball Z.
  - `mfe-anime`: top animes desde la API de Jikan (MyAnimeList).
  - `mfe-harry`: personajes del universo Harry Potter.

Cada microfrontend fue pensado para ser completamente independiente, mientras que el host actúa como el punto central para la navegación y la internacionalización.

### Comunicación entre proyectos:
Opté por usar **Webpack 5 Module Federation**, lo que me permitió exponer los componentes de cada micro y consumirlos dinámicamente desde el host.

---

## Tecnologías Usadas

- React + TypeScript
- Webpack 5 (Module Federation)
- Styled Components (con convención BEM)
- i18next + react-i18next
- Jest + React Testing Library
- Bun (runtime de desarrollo)

---

## Internacionalización (i18n)

Yo opté por implementar un sistema de internacionalización robusto usando **i18next** y archivos **JSON** para gestionar todos los textos visibles. Esto permite soportar múltiples idiomas de manera organizada, escalable y profesional.

### ¿Por qué usé i18next con JSON y no un traductor automático?

- Para tener control total del contenido traducido, incluyendo textos dinámicos como género, especie, estado, etc.
- Para soportar múltiples idiomas con cambios inmediatos desde el selector del host.
- Para que sea escalable: es fácil agregar nuevos idiomas o modificar los existentes sin cambiar el código.
- Para asegurar precisión: los textos traducidos no dependen de algoritmos automáticos que pueden tener errores contextuales.
- Porque es un estándar de la industria y una práctica común en proyectos profesionales y empresariales.

### Detalles técnicos

- Los archivos `en.json` y `es.json` están centralizados en el host (`/src/i18n/`).
- Cada microfrontend usa `useTranslation()` desde `react-i18next`.
- Todos los textos dinámicos (como `"Saiyan"`, `"Z Fighter"`, `"Male"`, etc.) son traducidos desde los JSON del host.

---

## Estilos con Styled Components + BEM

Decidí usar `styled-components` con una convención visual **BEM** (`Block__Element--Modifier`) en los `className` de cada styled-component para mantener la claridad y facilitar el mantenimiento.

```tsx
const Wrapper = styled.div.attrs(() => ({ className: 'character-list' }))``;
const Item = styled.div.attrs(() => ({ className: 'character-list__item--active' }))``;
```

Esto permite:

- Facilitar el debug desde DevTools.
- Mejorar la mantenibilidad del CSS.
- Dar trazabilidad a los estilos por componente y bloque.

---

## Pruebas Unitarias

### ¿Cómo correr las pruebas?

En cada microfrontend podés ejecutar las pruebas con:

```bash
bun jest
```

Asegurate de estar ubicado dentro del micro correspondiente (por ejemplo, `cd mfe-dbz`) antes de correr el comando.

Cada microfrontend contiene pruebas unitarias con `Jest` y `React Testing Library`, cubriendo los siguientes aspectos:

### Microfrontends
#### mfe-rick
  - ✓ debería mostrar que Rick está vivo
  - ✓ debería mostrar su planeta de origen y ubicación actual
  - ✓ debería renderizar la imagen de Rick correctamente

#### mfe-dbz
  - ✓ debería mostrar a Goku como un saiyajin
  - ✓ debería mostrar su nivel de ki y afiliación
  - ✓ debería renderizar su imagen correctamente
  - 
#### mfe-anime
  - ✓ renderiza un personaje de anime
  - ✓ muestra la sinopsis del personaje
  - ✓ renderiza la imagen del personaje con el src correcto

#### mfe-harry
  - ✓ debería mostrar que Harry Potter es humano
  - ✓ debería mostrar su color de ojos y cabello
  - ✓ debería renderizar la imagen de Harry con el src correcto


### Host
#### app-host
  - ✓ muestra la descripción del proyecto en español
  - ✓ muestra la descripción del proyecto en inglés
  - ✓ cambia a la vista del microfrontend de DBZ al hacer clic

Estas pruebas permiten validar:

- El renderizado correcto de cada componente.
- La verificación de textos traducidos.
- La validación de datos específicos por universo.
- El funcionamiento del cambio de idioma desde el host.

---

## Escalabilidad y Principios SOLID

- **Separación de responsabilidades**: cada micro tiene su propia lógica, sin acoplamientos.
- **Abierto/Cerrado**: el sistema permite agregar nuevos microfrontends sin modificar el host.
- **Inversión de dependencias**: el host solo consume lo que los microfrontends exponen explícitamente.
- **Sustitución de Liskov**: todos los MFE comparten una interfaz de props común y pueden sustituirse entre sí sin romper funcionalidad.

---

## Plus cumplidos

- ✅ **Uso de patrones de diseño** (component-based, container/presentational, lazy loading, code splitting).
- ✅ **Alta calidad y legibilidad de código** (naming consistente, tipado, separación clara de estilos/lógica/tests).
- ✅ **Interfaz visual profesional**, con cards animadas, diseño responsive, feedback visual al cambiar idioma, y branding individual por microfrontend.

---

## Troubleshooting

Si ves una pantalla en blanco al iniciar:

- Verifica que `public/index.html` tenga un `div` con id `root`.
- Asegúrate de que `src/index.tsx` invoque correctamente `bootstrap.tsx`.
- Si ves el error `Cannot use JSX unless the '--jsx' flag is provided`, revisa el `tsconfig.json` y confirma que se tenga esta configuración:
```json
"jsx": "react-jsx"
```
---

## Referencias
Estas son las referencias que usé en temas de documentación para la realización de este proyecto.

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [i18next](https://www.i18next.com/)
- [Styled Components](https://styled-components.com/docs)
- [BEM Methodology](https://getbem.com/)
- [React Testing Library](https://testing-library.com/)
