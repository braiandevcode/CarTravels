## REGLAS DE REACT Y BUENAS PRACTICAS

- **Limite de useEffects:** No permitirse mas de 3 use effectos por archivo.
- **useMemo:** No abusar de useMemo(), solo en ocaciones coherentes y necesarias.
- **useCallback:** usar useCallback() para evitar re-render de una misma instancia.
- **react.memo:** Considerar su uso para evitar render en los componentes hijos de forma innecesaria.
- **useReducer:** Crear de forma aislada en caso de tenes **estados** complejos
- **CustomHooks** Custom hooks que cumplan la logica coherente y que es reutilizable en cierto contexto.
- **Provider:** Considerar su creacion y uso para cuestiones de contextos aislados.
- **Sobre extencion de archivos:** Las extenciones de archivos seran `.tsx` si hay minimamente usos y llamados de prop "children" y funciones nativas de react(useState, useEffect, etc) en la logica interna, sino, deben ser `.ts`.

- *useEffect, useCallback, useMemo, useReducer etc* deben llamar a la funcion no crearla  y ejecutarla en el mismo momento: ej para codigo mas limpio:
```tsx
  const myFunction = (): boolean => {
     return true
  }

  useEffect(myFunction, [dep])
```

## Reglas
- Todo useContext debe ser leido por un `custom hooks` para ser reutilizado
- Las dependencias en `hooks` **NUNCA** deben generar **loops infinitos** ni **re-renders innecesarios** 
- los efectos con suscripciones deben retornar **siempre**el `clean up` ej:
```tsx
    const myFunction = (): boolean => {
     let suscriptionExample = false;
     suscriptionExample = true;

     return () => {
        suscriptionExample = false;
     }

    }
   useEffect(myFunction, [dep])
```
-  Por buenas practicas las dependencias en los `useEffect` deben ser solo externas, evitar en lo posible tener dependencias de estados locales. 

## References

- [PERFORMANCE](./performance.md)