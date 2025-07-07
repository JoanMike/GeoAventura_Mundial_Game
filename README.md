# 🌍 GeoAventura Mundial

Una aplicación web interactiva para aprender geografía mundial a través de un divertido juego de banderas y países.

## 📋 Descripción

GeoAventura Mundial es un juego educativo que pone a prueba tus conocimientos de geografía mundial. Los jugadores deben identificar países basándose en sus banderas, con múltiples opciones de respuesta. La aplicación incluye más de 190 países y ofrece una experiencia de aprendizaje gamificada.

## ✨ Características

- 🎮 **Juego Interactivo**: Identifica países por sus banderas
- 🌐 **Base de Datos Completa**: Más de 190 países incluidos
- 🎯 **Preguntas Personalizables**: Elige la cantidad de preguntas (5-190)
- 📊 **Sistema de Puntuación**: Seguimiento de respuestas correctas e incorrectas
- 🎨 **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
- 🌙 **Modo Oscuro**: Tema claro y oscuro disponibles
- 🤖 **Integración con IA**: Powered by Google Gemini 2.0 Flash
- ⚡ **Alto Rendimiento**: Construido con Next.js 15 y React 18

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React para aplicaciones web
- **React 18** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes de UI primitivos y accesibles

### Herramientas de Desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Husky** - Git hooks para automatización
- **Turbopack** - Bundler de alta velocidad para desarrollo

### IA y APIs
- **Genkit** - Framework para aplicaciones de IA
- **Google AI (Gemini 2.0)** - Modelo de lenguaje para características de IA

### Bibliotecas de UI
- **Lucide React** - Iconos SVG
- **React Hook Form** - Manejo de formularios
- **Recharts** - Gráficos y visualizaciones
- **Next Themes** - Sistema de temas

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JoanMike/GeoAventura_Mundial_Game.git
   cd GeoAventura_Mundial_Game
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno**
   ```bash
   # Crea un archivo .env.local
   cp .env.example .env.local
   
   # Agrega tu API key de Google AI
   GOOGLE_AI_API_KEY=tu_api_key_aqui
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   Visita [http://localhost:9002](http://localhost:9002) para ver la aplicación.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para encontrar problemas de código
- `npm run typecheck` - Verifica los tipos de TypeScript
- `npm run format` - Formatea el código con Prettier
- `npm run genkit:dev` - Inicia el servidor de desarrollo de Genkit
- `npm run genkit:watch` - Inicia Genkit en modo watch

## 🎮 Cómo Jugar

1. **Configuración del Juego**
   - Selecciona el número de preguntas que deseas responder (mínimo 5)
   - Haz clic en "Comenzar Juego"

2. **Jugando**
   - Se mostrará una bandera de un país
   - Selecciona el nombre correcto del país entre las 4 opciones
   - Recibirás retroalimentación inmediata sobre tu respuesta

3. **Resultados**
   - Al final del juego, verás tu puntuación total
   - Puedes revisar todas tus respuestas
   - Opción para jugar nuevamente

## 📁 Estructura del Proyecto

```
src/
├── ai/                    # Configuración de IA y Genkit
│   ├── genkit.ts         # Configuración principal de Genkit
│   └── dev.ts            # Archivo de desarrollo para IA
├── app/                  # App Router de Next.js
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página principal del juego
│   └── globals.css       # Estilos globales
├── components/           # Componentes React
│   ├── game/             # Componentes específicos del juego
│   │   ├── GameSetup.tsx # Configuración del juego
│   │   ├── GamePlay.tsx  # Interfaz de juego
│   │   └── GameResults.tsx # Resultados del juego
│   ├── ui/               # Componentes de interfaz reutilizables
│   └── theme-*.tsx       # Componentes de tema
├── hooks/                # Custom React hooks
├── lib/                  # Utilidades y lógica de negocio
│   ├── countries.ts      # Base de datos de países
│   ├── gameLogic.ts      # Lógica del juego
│   └── utils.ts          # Utilidades generales
```

## 🌍 Base de Datos de Países

La aplicación incluye una base de datos completa con:
- Nombres en español e inglés
- Códigos ISO 3166-1 alpha-2
- URLs de banderas de alta calidad
- Más de 190 países incluidos

## 🎨 Personalización de Tema

La aplicación soporta:
- **Modo Claro**: Tema por defecto con colores claros
- **Modo Oscuro**: Tema oscuro para mejor experiencia nocturna
- **Persistencia**: El tema seleccionado se guarda localmente

## 🤖 Integración con IA

El proyecto utiliza Google Gemini 2.0 Flash a través de Genkit para:
- Generación de contenido dinámico
- Mejoras en la experiencia de usuario
- Características futuras de personalización

## 🔧 Configuración Adicional

### Tailwind CSS
El proyecto utiliza una configuración personalizada de Tailwind con:
- Colores personalizados para temas
- Animaciones CSS
- Componentes reutilizables

### ESLint y Prettier
- Configuración estricta para mantener calidad de código
- Formateo automático al hacer commit (Husky)

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Despliega en Vercel siguiendo sus instrucciones
```

### Otros Proveedores
```bash
npm run build
npm run start
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

- Abre un [issue](https://github.com/tu-usuario/GeoAventura_Mundial/issues)
- Revisa la documentación
- Contacta al equipo de desarrollo

## 🎯 Roadmap

- [ ] Modo multijugador
- [ ] Estadísticas detalladas
- [ ] Más tipos de preguntas (capitales, ubicación en mapa)
- [ ] Sistema de logros
- [ ] Integración con redes sociales
- [ ] Modo offline
- [ ] Aplicación móvil

---

**¡Desarrollado con ❤️ para aprender geografía de manera divertida!**
