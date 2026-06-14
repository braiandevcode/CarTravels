### REGLAS

## 1. REGLA DE EJECUCION EN TERMINAL

- PROHIBIDO ejecutar merges, despliegues, tests ni cambios automáticos SIN MI CONFIRMACIÓN.
- ejecutar `node --version` y verificar estado de actualizacion
- ejecutar `vite --version` para saber su version y si ya esta instalada.
- examinar la version de `node` con el framework y demas técnologias utiizados en proyecto, para evitar incompatibilidades
- Luego de instalar, hacer el `pnpm audit`
- **Revision de dependencias:** reveer en dependencias y sus sub-dependencias que en sus `package.json` en los `scripts` no existan comandos sospechosos como `curl`, `wdget` o similares que sea comando por via red, si es asi, evitar la ejecucion y documentarmelo.
- Siempre usar los comandos de instalacion del framwork de manera "estandar" y "recomendada" seguún la documentación. por ejemplo: ejecutar comando de `nest create new .` o `pnpm add create vite@latest .` para crear proyecto con carpetas mas configuraciones preestablecidas por defecto en vite.

## 2. REGLAS PARA INCONSISTENCIAS + OPTIMIZACION

- **Evitar reinventar la rueda:** Antes de crear una logica compleja que una dependencia puede resolver, explicar motivo de sugerencia.
- **PROHIBIDO** generar codigo spagetti (DIVIDE Y VENCERAS).
- **PRIORIDAD Y CRITERIO** en optimizacion y escalabilidad.
- **PROHIBIDO** usar `npm` o `npx` (en casos de problemas, explicar y consultarme)
- **PROHIBIDO** leer variables de entorno

- **aplica comentarios en codigo en primera persona forma humana y en mayusculas que expliquen logica. ej:**

```ts
let num: number = 1;
let num2: number = 2;
let result: number = num + num2; //SUMO AMBOS NUMERO

// FUNCION PARA EL DESCUENTO ESPERA UN ARGUMENTO TIPO NUMERICO
const myFunc = (desc: number): number => {
  return result - desc; // DESCUENTO EL RESULTADO
};

myFunc(3); //INVOCO FUNCION CON RESULTADO FINAL
```

- **Nombrar variables, objetos, funciones etc siempre en ingles pero manteniendo coherencia:**
  - Una funcion es un verbo, debe ser coherente con lo que hace, ej:

  ```ts
  let num: number = 1;
  let num2: number = 2;
  let result: number = num + num2; //SUMO AMBOS NUMERO

  // FUNCION PARA EL DESCUENTO ESPERA UN ARGUMENTO TIPO NUMERICO
  const subtract = (desc: number): number => {
    return result - desc; // DESCUENTO EL RESULTADO
  };

  subtract(3); //INVOCO FUNCION CON RESULTADO FINAL
  ```
 - Una interfaz define una estructura de datos, debe ser coherente y debe iniciar con "I" ej: `IDataUser`
 - Un type define un tipo de dato especifico, debe ser coherente y debe iniciar con "T" ej: `TDataUser`


### 3. Analisis de versiones de dependencias

- **OBLIGACION:** siempre que se quiera instalar dependencias, hacer un `search` profundo de **X** dependencia y usar la ultima version `@latest`.
- Analizar funciones, objetos deprecados para evitar usarlos.
- Evitar siempre que sea posible instalaciones **locales** o **globales** usando `pnmp dlx` o formas correctas de pnpm


### 4. Networking y configuración

- No hardcodear URLs; usar env vars (`VITE_API_URL`).  
- Manejo de estados: loading, empty, error.  
- Retries/backoff y timeouts en fetch cuando aplique.