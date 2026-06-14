## REGLAS DE BUENAS PRACTICAS DE TYPESCRIPT
- Crear Types cuando: lo que se busca crear como `contrato`, sea algo que no lo logre una interface nativa. 
- No crear, ni repetir mismas firmas de contrato que generen redundancias, 
- solo si es posible, usar los `Omit` o similares, para tomar mismos tipos de propiedades. 
- Aprovechar Genericos para mejor flexibilidad.
- Ordenar y modularizar las firmas/contratos de manera cohernete y optima en diferentes archivos segun contexto ej:
```ts
    /*
        estructura de datos en contexto de un usuario en un mismo archivo
    */
    interface IUserData{
        name:string;
        dni:string;
        address:IAddress;
        dosg:IDog[]
    }

    interface IAddress{
        street:string;
        number:number;
    }


    /*
        estructura de datos en contexto de una mascota en un archivo aparte archivo
    */
    interface IDog{
        nameDog:string;
        race:string;
    }

```
- uso de `enum` para evitar errores de escritura en valores con strings sueltos y muy repetidos en el proyecto.

### TIPADO Y CALIDAD
- Evitar `any`; usar interfaces y generics.  
- Tipado estricto siempre:
    - Ejemplo:
    ```ts
        let edad:number;
        const cadena:string;
        const obj:ExampleCustomType={}
    ```