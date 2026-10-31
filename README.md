# Mi Jardín Vivo — Página de ventas

Proyecto estático e independiente del aplicativo educativo.

## Vista local

Sirve la carpeta `dist` con cualquier servidor HTTP estático. Ejemplo:

```powershell
python -m http.server 43900 --directory dist
```

## Publicación futura

- Crear un repositorio de GitHub exclusivo para esta página.
- Importarlo como un proyecto nuevo en Vercel.
- Configurar `dist` como directorio público.
- No conectar este proyecto al repositorio ni al proyecto Vercel del aplicativo.

## Configuración pendiente

- Completar datos comerciales y de contacto en las páginas legales antes de publicar.
- Confirmar el proceso exacto de entrega de Hotmart y ajustar la respuesta del FAQ si fuera necesario.
- Añadir el Meta Pixel solamente cuando exista un ID real y se haya definido el consentimiento aplicable.

El checkout oficial ya configurado en ambos botones es `https://hotm.io/xXiMWOVw`.
# Meta Conversions API

Configure estas variáveis privadas no projeto Vercel:

- `META_PIXEL_ID` = `1131898262862935`
- `META_CAPI_TOKEN` = token de acceso de la API de Conversiones de Meta (nunca lo coloque en archivos públicos).

La carpeta `api/meta-event.js` recibe eventos server-side sin datos personales y los envía al Pixel. El Pixel del navegador continúa registrando PageView y eventos estándar para deduplicación cuando se usa `event_id`.
