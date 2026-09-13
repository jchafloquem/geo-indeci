# Visor Geográfico Municipal — San Isidro

Aplicación frontend desarrollada con **Angular 20** para la visualización y consulta de información geoespacial del distrito de San Isidro, integrada con servicios GeoServer, PostgreSQL/PostGIS y datos catastrales municipales.

---

## 🚀 Tecnologías

| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 20.0.0 | Framework principal (standalone components) |
| TypeScript | ~5.9.0 | Tipado estático |
| OpenLayers | ^10.8.0 | Motor de mapas interactivo |
| Tailwind CSS | ^4.2.2 | Utilidades CSS (v4) |
| RxJS | ~7.8.0 | Programación reactiva |
| Chart.js | ^4.5.1 | Dashboard de estadísticas |
| Driver.js | ^1.8.0 | Recorridos interactivos (tour) |
| jsPDF | ^4.2.1 | Generación de PDFs |
| Node.js | >= 22.0.0 | Entorno de ejecución |
| npm | 11+ | Gestor de paquetes |
| Vitest | ^3.2.4 | Pruebas unitarias |

---

## 📦 Requisitos previos

- **Node.js 22** o superior
- **npm 11+**
- Angular CLI 20

```bash
npm install -g @angular/cli@20
```

---

## 🛠️ Instalación y ejecución

```bash
git clone https://github.com/jchafloquem/geo-indeci.git
cd geo-indeci
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200/`.

### Compilación para producción

```bash
npm run build
```

---

## 🗂️ Estructura del proyecto

```
src/app/
├── app.ts                      # Componente raíz
├── app.routes.ts               # Rutas principales
├── animations/
│   └── spinner/                # Indicador de carga
├── components/
│   ├── auth/                   # Autenticación
│   │   ├── auth.routes.ts
│   │   ├── guards/             # Guards de ruta
│   │   └── components/
│   │       └── login/          # Inicio de sesión
│   └── visor/                  # Módulo del visor geográfico
│       ├── visor.routes.ts
│       └── components/
│           ├── dashboard/      # Panel de estadísticas (Chart.js)
│           └── map/            # Mapa principal (OpenLayers)
│               ├── map.ts      # Componente central del mapa
│               └── components/
│                   ├── navbar/       # Barra de herramientas
│                   ├── sidebar/      # Panel lateral
│                   │   ├── capas/          # Gestión de capas WMS/WFS
│                   │   ├── consultas/      # Búsquedas catastrales
│                   │   ├── coordenadas/    # Conversión de coordenadas
│                   │   ├── descargaspdf/   # Descarga de PDFs
│                   │   ├── imprimir/       # Módulo de impresión
│                   │   ├── leyenda/        # Leyenda de capas
│                   │   ├── about/          # Acerca de
│                   │   └── manual/         # Manual de usuario
│                   ├── functions/    # Herramientas del mapa
│                   ├── overViewMap/  # Mapa de vista general
│                   ├── coordinate-info/ # Info de coordenadas
│                   └── terminos/    # Términos y condiciones
├── interfaces/                 # Modelos y configuraciones
│   ├── geoLayers.ts
│   ├── capasWMS.config.ts
│   ├── controlCapasConfig.ts
│   └── mapas.config.ts
└── services/
    ├── auth.service.ts         # Servicio de autenticación
    ├── map.service.ts          # Lógica del mapa (OpenLayers)
    ├── driver.service.ts       # Tour interactivo
    └── draw.service.ts         # Dibujo y medición
```

---

## 🌐 Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/visor` | `Visor` | Layout principal del visor |
| `/visor/map` | `MapComponent` | Mapa interactivo con OpenLayers |
| `/visor/dashboard` | `DashboardPage` | Panel de estadísticas y gráficos |
| `/auth/login` | `Login` | Inicio de sesión |
| `/manual` | `ManualCompleto` | Manual de usuario completo |

---

## 🔐 Configuración de entornos

Los entornos se configuran en `src/environments/`:

- `environment.ts` — Desarrollo
- `environment.prod.ts` — Producción

### Variables configurables

- **GeoServer**: URL del servidor, workspace (`WEB_GIS`), SRS (`EPSG:32718`)
- **Ortofotos**: URL del servidor de tiles estáticos
- **DataGIS**: Endpoints de fichas catastrales, fotografías, planos TUSNE
- **Encuesta de salida**: URL del formulario de feedback
- **Observatorio Urbano**: Enlace al portal municipal

---

## 🛠️ Servicios e integraciones

| Servicio | Tecnología | Propósito |
|---|---|---|
| GeoServer 3.0 | WMS / WFS / OWS | Servicio de mapas y consultas OGC |
| PostgreSQL/PostGIS | Base de datos | Almacenamiento de datos catastrales |
| DataGIS | ASP endpoints | Fichas, fotografías y planos catastrales |
| Ortofotos | Tiles estáticos | Imágenes aéreas (2018, 2024, 2025) |

---

## 📋 Funcionalidades principales

### 🗺️ Mapa interactivo
- Visualización con OpenLayers sobre capas base (Satélite, Calles, Topográfico, Blanco)
- Capas WMS/WFS de GeoServer (límites, vías, manzanas, lotes)
- Ortofotos por año (2018, 2024, 2025) conmutables
- Mapa de vista general (OverviewMap)
- Animación de vuelo entre vistas

### 🔍 Búsquedas catastrales
- Por Código Catastral (Sector-Manzana-Lote)
- Por CUC (Código Único Catastral)
- Por Dirección (con autocompletado de vías)
- Por Habilitación Urbana (cascada: Hab. → Manzana → Lote)
- Por Parques (con autocompletado)
- Por Ciudadano (requiere autenticación)

### 📊 Consultas al hacer clic
- Información del lote (ficha catastral)
- Fotos de dron (2018 y 2024)
- Puntos geodésicos
- Arbolado urbano (2015)
- Fichas de accesibilidad (cruces y manzanas)
- Planos topográficos (TUSNE)

### 🖨️ Impresión y exportación
- Impresión de planos con diseño A4/A3 (márgenes ISO 5457)
- Cuadrícula UTM-18S sobre el mapa
- Barra de escala gráfica
- Fotografía del lote y ficha pública
- Exportación a PDF (jsPDF)

### 🎨 UX / UI
- Tour interactivo con Driver.js
- Sidebar de herramientas colapsable
- Coordenadas en tiempo real
- Leyenda dinámica de capas
- Medidas de distancia y perímetro

---

## 📏 Estándares y buenas prácticas

- **Componentes standalone** (sin NgModules)
- **Gestión de estado** con Angular Signals
- **Lazy loading** para módulos y rutas
- **Tipado estricto** habilitado
- **ESLint y Prettier** configurados
- **Angular Style Guide**
- **Proxy configurado** (`proxy.conf.json`) para evitar CORS en desarrollo

---

## 🔀 Flujo de trabajo Git

- **Rama principal**: `master`
- **Desarrollo**: `develop`
- **Features**: `feature/HU-*`
- **Fixes**: `hotfix/*`

---

## 🌍 Links de la aplicación

| Entorno | URL |
|---|---|
| Local | http://localhost:4200/ |
| Desarrollo | *(completar)* |
| Producción (IP) | *(completar)* |
| Producción (URL) | *(completar)* |
| GeoServer | *(completar)* |

---

## 📝 Changelog

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial detallado de versiones.

- **v1.1.0** (2026-08-24): Mejoras en impresión (PDF), ficha pública, fotografía del lote, cuadrícula UTM
- **v1.0.0** (2026-08-12): Búsquedas catastrales, interacción con mapa, gestión de capas, recorrido interactivo

---

## 📄 Licencia

Uso interno — Municipalidad de San Isidro / INDECI
