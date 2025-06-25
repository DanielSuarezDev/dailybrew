# Daily Brew ☕

Una herramienta interactiva para reuniones diarias con temática de café que transforma tus daily standups en una experiencia divertida y visual.

## 🚀 Características

- **Selección aleatoria de participantes** - Cada turno se asigna automáticamente
- **Temporizador inteligente** - Configurable por participante (1-5 minutos)
- **Animaciones interactivas** - Máquina de café realista con estados visuales
- **Persistencia local** - Guarda participantes y configuración automáticamente
- **Vista dual** - Alterna entre máquina de café y vista de tazas tradicional
- **Música ambiente** - Sonidos de cafetería para crear ambiente
- **PWA Ready** - Instalable como aplicación móvil
- **SEO Optimizado** - Completamente optimizado para buscadores

## 📊 Analytics

Daily Brew incluye tracking completo con Google Analytics 4 para entender el uso y mejorar la experiencia:

### Configuración de Analytics

1. **Obtén tu Measurement ID de Google Analytics 4:**
   - Ve a [Google Analytics](https://analytics.google.com/)
   - Crea una nueva propiedad GA4
   - Copia tu Measurement ID (formato: `G-XXXXXXXXXX`)

2. **Configura las variables de entorno:**
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env
   
   # Edita .env y agrega tu Measurement ID
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Para desarrollo (opcional):**
   ```bash
   # Habilita analytics en desarrollo
   VITE_ENABLE_ANALYTICS=true
   ```

### Eventos Tracked

#### 📈 **Engagement Events:**
- `meeting_started` - Cuando se inicia una reunión
- `meeting_completed` - Cuando se completa una reunión
- `participant_turn_completed` - Cada vez que un participante termina su turno
- `user_engagement` - Inicio/fin de sesión y descubrimiento de características

#### 🎛️ **Interaction Events:**
- `timer_pause/resume` - Control del temporizador
- `view_toggled` - Cambio entre vista máquina/tazas
- `music_toggled` - Control de música
- `participant_management` - Agregar/eliminar participantes
- `timer_duration_changed` - Cambio de duración del temporizador

#### 📱 **Technical Events:**
- `app_installed` - Instalación como PWA
- `error_occurred` - Errores de la aplicación
- `performance_metric` - Métricas de rendimiento

### Datos Recopilados

Todos los datos se recopilan de manera **privacy-friendly**:

- ✅ **Métricas de uso** (cuántos participantes, duración de reuniones)
- ✅ **Interacciones** (qué características usan más)
- ✅ **Rendimiento** (velocidad de carga, errores)
- ✅ **Engagement** (tiempo de sesión, características descubiertas)

- ❌ **NO recopilamos nombres reales** (solo hashes para privacidad)
- ❌ **NO tracking de contenido personal**
- ❌ **NO ads personalization**

## 🛠️ Desarrollo

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Linting
npm run lint

# Generar sitemap
npm run generate-sitemap
```

### Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── utils/              # Utilidades (incluyendo analytics)
├── types/              # Definiciones TypeScript
└── index.css           # Estilos globales

public/
├── manifest.json       # PWA manifest
├── robots.txt         # SEO robots
├── sitemap.xml        # SEO sitemap
└── favicon.svg        # Favicon

scripts/
└── generate-sitemap.js # Generador de sitemap
```

## 🎯 SEO y Marketing

### Palabras Clave Optimizadas

- **Primarias:** daily standup, scrum meetings, reuniones diarias, agile meetings
- **Secundarias:** coffee themed meetings, team collaboration tools, standup timer
- **Long-tail:** herramienta reuniones diarias café, daily standup con temporizador

### Meta Tags Dinámicos

- Open Graph para redes sociales
- Twitter Cards
- Schema.org structured data
- Canonical URLs

### Archivos SEO

- `robots.txt` - Guía para crawlers
- `sitemap.xml` - Mapa del sitio
- `manifest.json` - PWA y móviles

## 📱 PWA (Progressive Web App)

Daily Brew es completamente instalable como aplicación móvil:

- **Service Worker** automático
- **Caché inteligente** para funcionamiento offline
- **Instalable** en dispositivos móviles y desktop
- **Optimizado** para diferentes tamaños de pantalla

## 🚀 Deployment

### Netlify (Recomendado)

1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Deploy automático en cada push

### Otras Plataformas

Compatible con:
- Vercel
- GitHub Pages
- Firebase Hosting
- Cualquier hosting de archivos estáticos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Lucide React](https://lucide.dev/) - Iconos
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - Framework

---

**¿Te gusta Daily Brew?** ⭐ ¡Dale una estrella al repositorio!

**¿Tienes ideas?** 💡 Abre un issue o contribuye al proyecto.

**¿Problemas?** 🐛 Reporta bugs en la sección de issues.# dailybrew
