# Actividad 2: Formulario Reactivo de Productos (Angular)

**Estudiante:** Jose Lionzo Xic Chay · **Fundación Kinal**

## Descripción

Formulario de registro de productos hecho con Reactive Forms en Angular. Valida los campos, muestra errores dinámicos y envía los datos a un servicio solo cuando el formulario es válido.

## Cómo ejecutarlo

```bash
pnpm install
pnpm start
```

Abrir `http://localhost:4200` y la consola del navegador (F12).

## Campos y validaciones

| Campo | Validaciones |
|---|---|
| Nombre | Obligatorio, de 3 a 50 caracteres |
| Descripción | Obligatoria, de 10 a 200 caracteres |
| Precio | Obligatorio, entre 0.01 y 100000 |
| Stock | Obligatorio, entero entre 0 y 10000 |
| Categoría | Obligatoria |
| SKU | Obligatorio, formato `ABC-1234` |

## Cómo funciona

- **Formulario:** se crea con `FormBuilder` y cada campo se enlaza con `formControlName`. El estado (válido, tocado, modificado) se muestra en pantalla.
- **Errores:** un error aparece solo si el campo es inválido y ya fue tocado o modificado. Se usa `*ngIf` para mostrarlo y `*ngFor` para listar los mensajes, el select de categorías y la tabla de productos.
- **Estilo:** campos con error en rojo, campos correctos en verde.
- **Servicio:** `ProductService` se inyecta con `inject()` y simula el backend. Muestra en consola los datos que recibe.
- **Envío:** si el formulario es inválido no se llama al servicio y se muestran los errores. Si es válido, se envía el producto, se muestra un mensaje de éxito y el formulario se limpia.

## Pruebas

**1. Formulario vacío al cargar**

![Estado inicial](img/01-estado-inicial.png)

**2. Enviar el formulario vacío:** todos los campos obligatorios marcan error y no se envía nada.

![Formulario vacío](img/02-formulario-vacio.png)

**3. Datos inválidos:** cada campo muestra su mensaje de error.

![Datos inválidos](img/03-datos-invalidos.png)

**4. Datos válidos:** campos en verde y el producto aparece en la tabla.

![Datos válidos](img/04-datos-validos.png)

**5. Consola:** el servicio solo recibe datos cuando el formulario es válido.

![Consola](img/05-consola.png)

## Conclusión

El formulario cumple con validaciones, mensajes dinámicos con `*ngIf` y `*ngFor`, retroalimentación visual e integración con un servicio mediante inyección de dependencias.