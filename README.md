## Corrección

- La consulta inicial fallaba xq query era null y no "". Esto hacía que el param titleStartsWith se agragara en la request quedando así:
```
https://gateway.marvel.com/v1/public/comics?apikey=9793363e7276e556c84635fef3aecb00&titleStartsWith=null
```
- El desplegable de order debía reaccionar al cambio del selector de tipo. Faltó resolver.
- Faltó la vista de detalle.

### Nota: 6 (Aprobado)
