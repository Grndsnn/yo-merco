# 🛒 Yo Merco — Colombia

> **Optimizador Inteligente de Presupuesto y Comparador Multicanal**  
> Enfoque estratégico: **Manizales (Caldas)** y Expansión Nacional.

Compara instantáneamente los precios de la canasta familiar colombiana entre **Tiendas D1**, **Tiendas Ara**, **Mercaldas**, **Supermercado del Centro**, **Éxito** y **Carulla**.

---

## 🚀 Características Principales

1. **Modo Lista Exacta:**
   - Agrega artículos con cantidades específicas y descubre de inmediato en qué supermercado sale más barato el mercado completo.
2. **Modo Presupuesto Inteligente:**
   - Define un tope máximo en pesos colombianos (COP) (ej: $200.000 COP) y calcula el alcance y el saldo sobrante en cada cadena.
3. **Podio de Ahorros con Tarjeta Campeona:**
   - Destacado visual en verde esmeralda con animación de confeti para el 1er puesto.
   - Comparativa del 2° al 6° lugar con barras de progreso relativas y cálculo exacto de sobrecosto.
4. **Desglose Ítem por Ítem (Acordeón Transparente):**
   - Tabla interactiva que compara el costo de cada producto en las 6 tiendas y resalta en verde el más económico.
5. **Variante Pro: Modo Supermercado Híbrido:**
   - Sugerencia algorítmica para dividir la compra en múltiples tiendas.
   - **Cálculo de Ahorro Neto:** Descuenta el costo estimado de transporte/domicilio en Manizales para evitar ahorros ficticios.
6. **Variante Innovadora: Normalización de Marcas Blancas (Equivalencias):**
   - Resuelve la disparidad de marcas propias (D1 *Latti* / Ara *Sabrosón*) contra marcas comerciales (*Alquería* / *Roa*).
7. **PWA Offline-First:**
   - Funciona sin conexión dentro del supermercado guardando la canasta en `localStorage`.

---

## 📂 Estructura del Repositorio

```
Yo_Merco/
├── app/                        # Aplicación Next.js 14 (App Router)
│   ├── globals.css             # Estilos Tailwind y animaciones
│   ├── layout.tsx              # Root Layout, SEO y PWA setup
│   ├── manifest.ts             # Web App Manifest PWA
│   └── page.tsx                # Página principal interactiva
├── components/                 # Componentes modulares UI
│   ├── BasketDrawer.tsx        # Drawer lateral y móvil de la canasta
│   ├── EquivalencesModal.tsx   # Modal de marcas equivalentes
│   ├── HybridBasketCard.tsx    # Tarjeta de canasta híbrida y transporte
│   ├── Navbar.tsx              # Selector de ciudad y modo PWA
│   ├── ProductBreakdownAccordion.tsx # Acordeón comparativo por ítem
│   ├── ProductCatalog.tsx      # Catálogo maestro con filtros por categoría
│   └── SavingsPodium.tsx       # Tarjeta campeona y ranking 1° a 6°
├── database/                   # Scripts SQL para Supabase / PostgreSQL
│   ├── schema.sql              # Definición de tablas, RLS e índices
│   ├── functions.sql           # Funciones RPC de cálculo en PostgreSQL
│   └── seed.sql                # Población de 6 cadenas y 50 productos de Manizales
├── lib/                        # Lógica de negocio y persistencia
│   ├── calculator.ts           # Motor financiero de cálculo en TypeScript
│   ├── mockData.ts             # Matriz de 50 productos y precios en COP
│   ├── storage.ts              # Persistencia Offline-First
│   └── supabaseClient.ts       # Conexión dual Supabase / Local
├── n8n/                        # Orquestación quincenal
│   └── workflow_yomerco_scraping_sync.json # Flujo listo para importar en n8n
├── scraper/                    # Motor de extracción de precios
│   ├── requirements.txt        # Dependencias Python (Playwright, Supabase)
│   └── scraper.py              # Scraper modular con evasión stealth
├── ARCHITECTURE.md             # Especificación técnica y diagramas
├── Plan_Desarrollo_YoMerco_Colombia.md.pdf # Plan maestro original
└── package.json                # Dependencias de Next.js y Tailwind
```

---

## 🛠️ Puesta en Marcha

### 1. Aplicación Web (Next.js)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 2. Base de Datos (Supabase)

1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el **SQL Editor**, ejecuta en orden:
   - `database/schema.sql`
   - `database/functions.sql`
   - `database/seed.sql`
3. Copia tus credenciales en un archivo `.env.local` usando `.env.example` como guía.

### 3. Motor de Scraping (Python)

```bash
cd scraper
pip install -r requirements.txt
playwright install chromium
python scraper.py
```

### 4. Automatización con n8n

1. En tu instancia de n8n, ve a **Workflows** → **Import from File**.
2. Selecciona `n8n/workflow_yomerco_scraping_sync.json`.
3. Activa el flujo para sincronización quincenal o dispara el webhook manual.

---

## 👥 Equipo y Especialistas Involucrados

- **Product Owner & Manager:** Definición del MVP, catálogo de 50 productos y experiencia de usuario.
- **Frontend Specialist:** Next.js 14, Tailwind CSS, diseño Mobile-First y PWA.
- **Backend & Database Architect:** Esquema relacional, RPC de cálculo financiero y RLS en Supabase.
- **DevOps & Performance Optimizer:** Caching local, scraping con Playwright y orquestación con n8n.
- **Security Auditor:** Sanitización de precios, variables de entorno y RLS por usuario/sesión.
