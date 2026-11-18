# Taller 06 — Reserva de espacios (Angular)

Aplicación Angular con dos roles (**administrador** y **cliente**) para registrar espacios,
consultar su detalle y gestionar reservaciones. El enrutamiento está separado por rol y usa
carga diferida.

## Tecnologías

- Angular 22 (standalone components, signals, nueva sintaxis de control de flujo)
- Angular Router con `withComponentInputBinding()`
- TypeScript 6
- Tailwind CSS 4 (vistas de reservaciones y layout general)
- Vitest

## Ejecución

```bash
npm install
npm start        # http://localhost:4200
npm run build    # build de producción
npm test         # pruebas unitarias
```

## Estructura del routing

```
app.routes.ts
├── ''  → redirectTo: 'places' (pathMatch: 'full')
├── ''  → loadChildren: pages/admin.routes.ts
├── ''  → loadChildren: pages/client.routes.ts
├── 'ayuda' → NotFound
└── '**'    → NotFound (comodín al final)
```

- `provideRouter(routes, withComponentInputBinding())` en `app.config.ts`.
- Cada ruta declara su `title`.
- Un único `<router-outlet />` principal en `App`; el detalle usa un outlet nombrado
  (`name="panel"`) dentro del listado correspondiente.
- No se usan `href` internos: toda la navegación interna pasa por `routerLink` / `router.navigate`.

## Tabla A — Rutas

| Ruta | Componente | Título | Rol | Carga |
|---|---|---|---|---|
| `/` | — (redirección) | — | — | — |
| `/places` | `PlaceList` | Lugares | admin | `loadChildren` |
| `/places?estado=AVAILABLE` | `PlaceList` + filtro | Lugares | admin | `loadChildren` |
| `/places/new` | `PlaceForm` | Nuevo · lugar | admin | `loadChildren` |
| `/places(panel:place/:id)` | `PanelPlace` | Detalle · lugar | admin | `loadChildren` |
| `/reservations` | `ReservationList` | Reservaciones | admin | `loadChildren` |
| `/reservation/new` | `ReservationForm` | Nueva · reservacion | admin | `loadChildren` |
| `/client` | `Client` | cliente | client | `loadChildren` |
| `/client(panel:place/:id)` | `PanelPlace` | Detalle · lugar | client | `loadChildren` |
| `/my-reservations` | `ClientReservations` | mis-reservas | client | **`loadComponent`** |
| `/ayuda` | `NotFound` | Ayuda | — | eager |
| ruta desconocida | `NotFound` | No encontrada | — | eager (`**`) |

### Filtro por parámetro de consulta

`PlaceList` recibe el query param mediante un `input()` con el mismo nombre:

```ts
readonly estado = input<string>('');
readonly placesFiltrados = computed(() => {
  const filtro = this.estado().trim().toUpperCase();
  return filtro
    ? this.places().filter(place => place.status === filtro)
    : this.places();
});
```

Los enlaces del filtro usan `[queryParams]="{estado: 'AVAILABLE'}"`, por lo que el estado
viaja en la URL (`/places?estado=AVAILABLE`) y **sobrevive a un F5**. Un valor sin registros
muestra el bloque `@empty`.

### Panel de detalle reutilizable

El mismo componente `PanelPlace` se usa en las dos vistas:

- Cliente: `/client(panel:place/:id)`.
- Administrador: `/places(panel:place/:id)`.

El parámetro `id` llega a `input.required<string>()` y un `computed` busca el registro en
`PlaceService`. Si el código no existe, el panel muestra "Espacio no encontrado" con el código
solicitado y un enlace de vuelta. El enlace "Cerrar panel" usa el `data.volver` de cada ruta.

### Navegación programática

Al guardar un espacio válido, `PlaceForm` navega al detalle del registro recién creado:

```ts
const nuevo = this.placeService.agregar(formValue);
this.router.navigate(['/places', { outlets: { panel: ['place', nuevo.id] } }]);
```

### Carga diferida con `loadComponent`

La ruta `/my-reservations` se carga con `loadComponent`; su chunk aparece en
**F12 > Red** al entrar por primera vez a esa vista.

## Tabla B — Casos de prueba

| Caso | Acción | Resultado esperado |
|---|---|---|
| C1 | Abrir `/` | Redirige a `/places` mostrando el listado. |
| C2 | Entrar a `/places?estado=AVAILABLE` | Solo aparecen espacios disponibles. |
| C3 | Recargar (F5) con el filtro en la URL | El filtro se mantiene. |
| C4 | Entrar a `/places?estado=NOEXISTE` | Se muestra el mensaje `@empty` de filtro sin resultados. |
| C5 | Abrir `/places(panel:place/:id)` con un id válido | El detalle muestra los datos del espacio. |
| C6 | Abrir el detalle con un id inexistente | Mensaje "Espacio no encontrado" con el código pedido. |
| C7 | Abrir una URL desconocida | Vista 404 con la dirección solicitada y enlace "Volver al inicio". |
| C8 | Registrar un espacio válido | Se navega al detalle del registro creado. |
| C9 | Entrar a `/my-reservations` con F12 > Red abierto | Se descarga un chunk nuevo por `loadComponent`. |

## Enlace del proyecto

- Repositorio: _(pegar aquí el enlace que abra en una ventana privada)_
- Aplicación local: http://localhost:4200
