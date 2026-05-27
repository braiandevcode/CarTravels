# CarTravels

Calculadora de jornada diseñada para choferes de agencias de autos y taxis. Simplifica tus cálculos diarios.

---

## Tabla de Contenidos

- [Objetivo](#objetivo)
- [Comandos Rápidos](#comandos-rápidos)
- [Stack Tecnológico](#stack-tecnológico)
- [Librerías Principales](#librerías-principales)
- [Estructura de Archivos](#estructura-de-archivos)
- [Características Principales](#características-principales)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Licencia](#licencia)

---

## Objetivo

`carTravels` resuelve el problema tedioso y propenso a errores que enfrentan los choferes al finalizar su jornada:

- ✅ Ingreso simple de datos (total facturado, gastos de gas/nafta)
- ✅ Cálculos automáticos de porcentajes (agencia, chofer, auto alquilado)
- ✅ Manejo de viajes a fábricas con precios negociados
- ✅ Generación de comprobante en PDF y compartir por WhatsApp
- ✅ Datos guardados localmente en tu dispositivo (sin registro)

---

## Comandos Rápidos

| Acción | Comando |
|--------|---------|
| Instalar dependencias | `pnpm install` |
| Iniciar servidor de desarrollo | `pnpm dev` |
| Build para producción | `pnpm build` |
| Preview del build | `pnpm preview` |
| Lint | `pnpm lint` |

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.6 | Librería de UI |
| **TypeScript** | 6.0.2 | Tipado estricto |
| **Vite** | 8.0.12 | Build tool y dev server |
| **Tailwind CSS** | 4.3.0 | Estilos utility-first |
| **React Router** | 7.15.1 | Ruteo SPA |

---

## Librerías Principales

| Librería | Versión | Uso |
|----------|---------|-----|
| `html-to-image` | 1.11.13 | Convertir HTML a imagen (para compartir) |
| `jspdf` | 4.2.1 | Generar PDF del comprobante |
| `lucide-react` | 1.16.0 | Íconos de la UI |
| `react-icons` | 5.6.0 | Íconos de marcas (GitHub, Instagram) |
| `zod` | 4.4.3 | Validación de esquemas |
| `react-hook-form` | 7.76.1 | Manejo de formularios |

---

## Estructura de Archivos

Arquitectura modular siguiendo **Separation of Concerns (SoC)**:

```
src/
├── main.tsx                   # Entry point de React
├── App.tsx                    # Router y configuración principal
├── index.css                  # Tailwind v4 + tema personalizado
│
├── core/                      # LÓGICA CENTRAL (sin dependencia de UI)
│   ├── types/
│   │   └── calculator.ts      # Interfaces: CalculatorState, Action, Result
│   ├── context/
│   │   └── CalculatorContext.tsx  # State management + localStorage
│   └── hooks/
│       ├── useCalculator.ts   # Lógica pura de cálculos
│       └── useReceiptExport.ts  # Exportar PDF y compartir imagen
│
├── modules/                   # CARACTERÍSTICAS POR DOMINIO
│   ├── calculator/            # Módulo principal de la calculadora
│   │   ├── CalculationContent.tsx
│   │   ├── sections/
│   │   │   ├── ConfigSection.tsx   # Porcentajes + toggle auto alquilado
│   │   │   ├── IncomeSection.tsx   # Input del total facturado
│   │   │   ├── ExpensesSection.tsx # Gas (GNV) + Nafta
│   │   │   ├── FactoriesSection.tsx # Viajes a fábricas dinámicos
│   │   │   └── ResultsSection.tsx   # Desglose de resultados
│   │   └── modals/
│   │       ├── ReceiptModal.tsx    # Vista previa + PDF + compartir
│   │       └── ConfirmResetModal.tsx # Confirmación antes de resetear
│   │
│   ├── layout/                 # Módulo de layout persistente
│   │   ├── Layout.tsx          # Shell: Header + Outlet + Footer
│   │   ├── Header.tsx          # Navegación sticky (Inicio, FAQ, Acerca de)
│   │   └── Footer.tsx          # Links legales + redes sociales
│   │
│   └── pages/                  # Módulo de páginas informativas
│       ├── FAQPage.tsx         # Preguntas frecuentes
│       ├── AboutPage.tsx       # Acerca de carTravels
│       ├── TermsPage.tsx       # Términos y condiciones
│       └── PrivacyPage.tsx     # Política de privacidad
│
└── shared/                     # COMPONENTES REUTILIZABLES
    ├── ui/                     # Componentes UI genéricos
    │   ├── Button.tsx          # Botones con variantes
    │   ├── Input.tsx           # Input numérico con prefijo $
    │   ├── PercentageInput.tsx # Input de porcentaje con %
    │   ├── Toggle.tsx          # Switch toggle accesible
    │   └── Accordion.tsx       # Acordeón para FAQ
    └── components/
        └── LoadingScreen.tsx   # Splash screen animado
```

### Reglas de Arquitectura

| Capa | Puede importar de | No puede importar de |
|------|-------------------|----------------------|
| `core/` | Librerías externas | `modules/`, `shared/` |
| `modules/` | `core/`, `shared/` | Otros `modules/*` (solo a través de contratos claros) |
| `shared/` | Librerías externas | `modules/`, `core/` (excepto tipos) |

---

## Archivos de Configuración (Raíz)

```
carTravels/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
├── vercel.json               # Config SPA para Vercel (rewrites + headers)
├── vite.config.ts            # Config Vite + React + Tailwind v4
├── tsconfig.json             # Config TypeScript root
├── eslint.config.js          # Config ESLint flat
├── AGENTS.md                 # Especificaciones para agentes AI
├── package.json
├── pnpm-lock.yaml
└── .gitignore
```

---

## Características Principales

### Calculos Automáticos
- **Porcentajes configurables**: Agencia, Chofer, Auto (si es alquilado)
- **Validación en tiempo real**: Los porcentajes deben sumar 100%
- **Ajuste por fábricas**: Viajes con precios negociados y descuentos

### Persistencia
- Los datos se guardan automáticamente en `localStorage`
- No requiere registro ni conexión a internet
- Reset seguro con confirmación

### Exportación
- **Descargar PDF**: Comprobante listo para imprimir o guardar
- **Compartir por WhatsApp**: Convierte el comprobante a imagen y usa Web Share API

### Ruteo SPA
- `/` - Calculadora principal
- `/faq` - Preguntas frecuentes
- `/about` - Acerca de carTravels
- `/terms` - Términos y condiciones
- `/privacy` - Política de privacidad

### Diseño
- Tema oscuro "Industrial Driver"
- Responsive mobile-first
- Animaciones suaves y micro-interacciones
- Accesibilidad: `prefers-reduced-motion`, focus traps, ARIA labels

---

## Capturas de Pantalla

<div align="center">
  <img src="./public/images/001.png" alt="Pantalla principal" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/002.png" alt="Configuración de porcentajes" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/003.png" alt="Gestión de gastos" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/004.png" alt="Viajes a fábricas" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/005.png" alt="Resultados y desglose" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/006.png" alt="Comprobante PDF" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
</div>

---

## Despliegue en Vercel

El proyecto incluye `vercel.json` preconfigurado para SPA:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [{ "source": "/(.*)", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }] }]
}
```

Esto asegura que:
- Refresh en cualquier ruta funcione (`/faq`, `/about`, etc.)
- Headers de seguridad básicos estén presentes

---

## Licencia

MIT License

Copyright (c) 2026 carTravels

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
