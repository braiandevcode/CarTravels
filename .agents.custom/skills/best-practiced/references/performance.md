### PERFORMANCE

### Hooks y rendimiento
- **ReactRouter:** para rutas dentro de app
- **useForm:** aprovechar estados que provee `useForm` para diferentes acciones en formularios.
- **useEffect**: declarar dependencias completas; evitar efectos con valores mutables sin memoización.  
- **useMemo / useCallback**: usar para evitar recomputaciones costosas y re-renders innecesarios; documentar cuándo no usar.  
- **React.memo**: para componentes puros que reciben props referenciales.  
- **useRef**: para valores mutables que no disparan render.  
- Evitar crear funciones/objetos inline en props cuando provoquen re-renders.

### Performance y carga
- **Code-splitting** y lazy loading (React.lazy + Suspense) para rutas y componentes pesados.  
- **Virtualización** para listas largas (react-window / react-virtualized).  
- Lazy load y optimización de imágenes (srcset, formatos modernos).  
- Revisar tamaño del bundle; alertar si gzipped > 300 KB.  
- Evitar imports de librerías completas; preferir imports por función.