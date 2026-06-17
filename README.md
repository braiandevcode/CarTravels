# LiquidChofer v2.0.0

Calculadora de jornada para choferes de agencias de autos y taxis. Ayuda a cerrar el turno con menos pasos manuales: total del día, vales, porcentajes, gastos, resultado final y comprobante.

## Tabla de Contenidos

- [Objetivo](#objetivo)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Uso Local](#uso-local)
- [Características](#características)
- [Flujo de Cálculo](#flujo-de-cálculo)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Documentación Relacionada](#documentación-relacionada)
- [Licencia](#licencia)

## Objetivo

`LiquidChofer` resuelve el cierre diario de un chofer cuando debe combinar importes de una app externa, gastos de combustible, porcentajes de reparto y viajes con vale.

La app permite:

- Ingresar el total facturado del día.
- Cargar gastos de gas y nafta.
- Configurar porcentajes de agencia, conductor y vehículo alquilado.
- Registrar vales de tipo `Fábrica` u `Otro`.
- Bloquear el cálculo si hay vales incompletos.
- Mostrar resultados solo después de presionar **Calcular resultados**.
- Generar y compartir un comprobante en PDF o imagen.
- Persistir datos localmente en el dispositivo.

## Stack Tecnológico

| Tecnología | Versión | Uso |
| --- | --- | --- |
| React | 19.2.6 | UI |
| TypeScript | 6.0.2 | Tipado |
| Vite | 8.0.12 | Build y dev server |
| Tailwind CSS | 4.3.0 | Estilos |
| React Router | 7.15.1 | Rutas SPA |
| Zod | 4.4.3 | Validación |
| lucide-react | 1.16.0 | Íconos |
| html-to-image | 1.11.13 | Exportar comprobante como imagen |
| jsPDF | 4.2.1 | Exportar comprobante como PDF |

## Instalación

Requisitos:

- Node.js compatible con Vite 8.
- pnpm instalado.

```bash
pnpm install
```

## Variables de Entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `VITE_DOMAIN` | Sí (producción) | Dominio del sitio ej. `liquidchofer.app`. Se usa en metadatos SEO (canonical, og:image), sitemap.xml y robots.txt. |
| `VITE_GA_ID` | No | ID de Google Analytics (formato `G-XXXXXXXXXX`). Si no se setea, no se carga GA. |
| `VITE_S_OLAVARRIA_SERVICIOS_URL_IMAGE` | No | Banner de patrocinio — imagen. |
| `VITE_S_OLAVARRIA_SERVICIOS_URL_LOGO` | No | Banner de patrocinio — logo. |
| `VITE_S_OLAVARRIA_SERVICIOS` | No | URL del patrocinador. |

Crear `.env.production.local` para producción local:

```bash
VITE_DOMAIN=liquidchofer.app
VITE_GA_ID=G-XXXXXXXXXX
```

No commitear valores reales de URLs privadas, tokens ni credenciales.

## Uso Local

| Acción | Comando |
| --- | --- |
| Instalar dependencias | `pnpm install` |
| Iniciar desarrollo | `pnpm dev` |
| Build de producción | `pnpm build` |
| Preview del build | `pnpm preview` |
| Lint | `pnpm lint` |

Ejemplo de flujo:

1. Ejecutar `pnpm dev`.
2. Abrir la URL local que imprime Vite.
3. Presionar **Empezar**.
4. Completar total, vales, porcentajes y gastos. Si cargás vales, guardalos antes de avanzar.
5. Presionar **Calcular resultados**.
6. Revisar el desglose y abrir **Ver Recibo** para exportar.

## Características

- Wizard de 5 pasos: ingreso, vales, porcentajes, gastos y resultados.
- Botón **Calcular resultados** obligatorio antes de mostrar el desglose.
- Cualquier cambio confirmado en datos relevantes invalida el cálculo anterior.
- Reducer central para cambios de estado de la calculadora.
- Persistencia en `localStorage` con guardado debounced.
- Migración básica de formatos anteriores de estado local.
- Vales guardables: solo los vales guardados persisten al recargar y habilitan el avance del wizard.
- Edición controlada de vales: al editar un vale guardado, **Actualizar** se habilita solo si hay cambios reales; si se revierten los valores originales, el paso sigue habilitado.
- Limpieza de borradores: al volver atrás desde el paso de vales, se descartan vales no guardados y ediciones pendientes.
- Toggle de vales bloqueado cuando existen vales guardados.
- Scroll automático al agregar un nuevo vale.
- Onboarding de primer uso con persistencia en `localStorage`.
- Botón de ayuda flotante (FAB) con onboarding reutilizable.
- Sistema de tooltips responsive: `HelpHint` e `InfoReveal` con posicionamiento adaptable (`side`, `align`) y animación en desktop.
- Modo claro/oscuro con preferencia persistida.
- Modal de confirmación para reiniciar datos.
- Error boundary con acción de recarga.
- Banners de patrocinio configurables por variables `VITE_*`.
- Favicon unificado con `favicon.png` (64×64 recortado) y logo en componentes con `logo.png` (1024×1024).
- Metadatos Open Graph y Twitter Cards para preview al compartir en redes.
- Dominio configurable vía `VITE_DOMAIN` para SEO (canonical, sitemap, robots.txt).

## Flujo de Cálculo

### Vales

- `Fábrica`: requiere nombre, cantidad de viajes, precio real y precio fijo de planilla.
- `Otro`: requiere nombre, cantidad de viajes y precio real.
- Los vales incompletos o sin guardar bloquean el avance del wizard y **Calcular resultados**.
- Las ediciones pendientes de un vale guardado bloquean el avance hasta presionar **Actualizar**.
- Si el usuario abre edición pero no cambia nada, o vuelve a los valores originales, **Actualizar** queda deshabilitado y el wizard puede continuar.
- Los vales `Fábrica` ajustan el total base.
- Los vales `Otro` no ajustan el total base, pero sí reducen lo que queda para la agencia.

### Fórmulas

```ts
fabricaTotal = sum(viajes * precioReal)
fixedFeeTotal = sum(viajes * precioFijo)
gananciaFabricaTotal = fabricaTotal - fixedFeeTotal

adjustedTotal = total - gananciaFabricaTotal

agencyAmount = adjustedTotal * agencyPercent / 100
driverAmount = adjustedTotal * driverPercent / 100
carAmount = carRented
  ? max(0, adjustedTotal * carPercent / 100 - (gas + petrol))
  : null

finalAgency = agencyAmount - fixedFeeTotal - otroTotal
```

La suma de porcentajes debe ser `100%`. Si el vehículo no está alquilado, solo cuentan agencia y conductor. Si está alquilado, cuentan agencia, conductor y vehículo.

## Estructura del Proyecto

```bash
src/
├── App.tsx
├── ErrorBoundary.tsx
├── main.tsx
├── index.css
├── core/
│   ├── config/
│   │   ├── aboutPage.config.ts
│   │   ├── calculates.config.ts
│   │   ├── FAQPage.config.ts
│   │   ├── footer.config.ts
│   │   ├── header.config.ts
│   │   ├── landing.config.ts
│   │   ├── router.config.tsx
│   │   └── sponsor.config.ts
│   ├── context/
│   │   ├── CalculatorContext.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── calculatorContextValue.ts
│   │   └── useCalculatorContext.ts
│   ├── enum/
│   │   ├── EExtentionFile.ts
│   │   ├── ENameReceip.ts
│   │   ├── ENameTypesEntity.ts
│   │   └── EStoreKey.ts
│   ├── hooks/
│   │   ├── useCalculator.ts
│   │   └── useReceiptExport.ts
│   ├── reducer/
│   │   └── calculate.reducer.ts
│   ├── schemas/
│   │   ├── calculator.schema.ts
│   │   └── vale.schema.ts
│   ├── types/
│   │   ├── about.ts
│   │   ├── action.ts
│   │   ├── calculator.ts
│   │   ├── calculatorContextType.ts
│   │   ├── featureItems.ts
│   │   ├── footer.ts
│   │   ├── header.ts
│   │   └── sponsor.ts
│   └── utils/
│       └── calculatorStorage.ts
├── modules/
│   ├── calculator/
│   │   ├── components/
│   │   │   ├── ReceiptContent.tsx
│   │   │   ├── VoucherCard.tsx
│   │   │   └── VoucherDetailList.tsx
│   │   ├── hooks/
│   │   │   ├── useFocusTrap.ts
│   │   │   ├── usePreCalculation.ts
│   │   │   ├── useVoucherDraft.ts
│   │   │   └── useVoucherValidation.ts
│   │   ├── modals/
│   │   │   ├── ConfirmResetModal.tsx
│   │   │   └── ReceiptModal.tsx
│   │   ├── pages/
│   │   │   ├── OnboardingGuide.tsx
│   │   │   └── WizardPage.tsx
│   │   ├── sections/
│   │   │   ├── ConfigSection.tsx
│   │   │   ├── ExpensesSection.tsx
│   │   │   ├── IncomeSection.tsx
│   │   │   ├── PostCalculationView.tsx
│   │   │   ├── PreCalculationView.tsx
│   │   │   ├── ResultsSection.tsx
│   │   │   └── VouchersSection.tsx
│   │   └── types/
│   │       ├── animateWizard.ts
│   │       └── direction.ts
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── pages/
│       ├── AboutPage.tsx
│       ├── FAQPage.tsx
│       ├── HomePage.tsx
│       ├── LandingPage.tsx
│       ├── PrivacyPage.tsx
│       └── TermsPage.tsx
└── shared/
    ├── components/
    │   ├── LoadingScreen.tsx
    │   ├── MaintenancePage.tsx
    │   ├── ModalPortal.tsx
    │   └── SponsorBanner.tsx
    ├── lib/
    │   ├── canvasRenderer.ts
    │   ├── debounce.ts
    │   └── utils.ts
    ├── styles/
    │   ├── IconButton.tsx
    │   ├── LoadingDots.tsx
    │   └── StatusBanner.tsx
    └── ui/
        ├── Accordion.tsx
        ├── AccordionItems.tsx
        ├── Button.tsx
        ├── HelpHint.tsx
        ├── InfoReveal.tsx
        ├── Input.tsx
        ├── PercentageInput.tsx
        ├── StepIndicator.tsx
        └── Toggle.tsx
```

## Capturas de Pantalla

<div align="center">
  <img src="./public/images/001.png" alt="Pantalla principal" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/002.png" alt="Configuración de porcentajes" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/003.png" alt="Gestión de gastos" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/004.png" alt="Viajes con vale" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/005.png" alt="Resultados y desglose" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
  <img src="./public/images/006.png" alt="Comprobante PDF" width="400" style="max-width: 100%; height: auto; margin: 8px; border-radius: 8px;" />
</div>

## Despliegue en Vercel

El proyecto incluye `vercel.json` para servir la SPA:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }]
    }
  ]
}
```

### Variables de entorno en Vercel

Ir a Project Settings → Environment Variables → agregar:

| Name | Value | Environment |
|---|---|---|
| `VITE_DOMAIN` | `liquidchofer.app` | Production |
| `VITE_GA_ID` | `G-XXXXXXXXXX` | Production |

Rutas disponibles:

- `/`
- `/faq`
- `/about`
- `/terms`
- `/privacy`

## Documentación Relacionada

- [AGENTS.md](./AGENTS.md)
- [Buenas prácticas React](./.agent/skills/best-practiced/references/best-practice-react.md)
- [Buenas prácticas TypeScript](./.agent/skills/best-practiced/references/best-practice-ts.md)
- [Reglas](./.agent/skills/rules/RULES.md)
- [Estilo de código](./.agent/skills/style-code/skills/references/style-code.md)

## Licencia

MIT License

Copyright (c) 2026 LiquidChofer

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
