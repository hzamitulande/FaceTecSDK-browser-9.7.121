# FaceTec Biometría — Total Play

Sistema de identificación biométrica facial integrado con WhatsApp Bot, desplegado en AWS S3 + CloudFront.

---

## Arquitectura general

```
Bot de WhatsApp
    │
    │  genera URL con parámetros
    ▼
https://dev-facetec.cariai.com/?mode=verify|enroll&wa=...&botId=...&chatId=...&cb=...
    │
    │  CloudFront → S3
    ▼
index.html  (página unificada de registro y verificación)
    │
    ├── FaceTec SDK (core-sdk/)
    ├── Config.js   (credenciales y customización visual)
    └── Processors  (EnrollmentProcessor / VerificationProcessor)
    │
    │  al finalizar
    ▼
GET https://cariai.com/flux/cbmsg?botId=...&chatId=...&status_verify=1|0
    │
    ▼
WhatsApp → abre chat con el número del bot (?cb=)
```

---

## Parámetros de la URL

El bot genera un único enlace con los siguientes parámetros:

| Parámetro | Requerido | Descripción |
|---|---|---|
| `mode` | Sí | `verify` (verificación) o `enroll` (registro) |
| `wa` | Sí | Número del usuario — usado como `externalDatabaseRefID` en FaceTec |
| `botId` | Si | ID del bot — se reenvía al callback |
| `chatId` | Si | ID del chat — se reenvía al callback |
| `cb` | Si | Número de WhatsApp al que redirigir al finalizar |

> *Si `botId` y `chatId` están presentes, se dispara el GET de notificación al finalizar.

### Ejemplos de URL

**Verificación:**
```
https://dev-facetec.cariai.com/?mode=verify&wa=573108206421&botId=1534&chatId=1534_573108206421&cb=573145363234
```

**Registro:**
```
https://dev-facetec.cariai.com/?mode=enroll&wa=573108206421&botId=1534&chatId=1534_573108206421&cb=573145363234
```

---

## Flujo de index.html

### 1. Detección de WebView de WhatsApp
Al cargar, se detecta si la página se abre desde el WebView interno de WhatsApp:
- **Android:** redirige a Chrome via `intent://` (esquema nativo Android)
- **iOS:** intenta abrir en Chrome via `googlechrome://`

### 2. Lectura de parámetros
```js
const waNumber = urlParams.get('wa')      // número del usuario
const mode     = urlParams.get('mode')    // 'verify' | 'enroll'
const botId    = urlParams.get('botId')   // ID del bot
const chatId   = urlParams.get('chatId') // ID del chat
// cb = urlParams.get('cb')               // número de retorno WhatsApp
```

### 3. Validación
Si `waNumber` tiene menos de 7 dígitos, se muestra una tarjeta de error y se detiene el proceso.

### 4. Inicialización del SDK (Paso 1)
- Se configuran rutas de recursos del SDK
- Se espera a que `Config` esté disponible (carga asíncrona como módulo ES)
- Se inicializa en **modo desarrollo** con `initializeInDevelopmentMode`
- Se aplican los strings en español (`FaceTecStrings.es.js`)
- Se aplica la customización visual (`Config.retrieveConfigurationWizardCustomization`)

### 5. Captura biométrica (Paso 2)
El usuario presiona el botón y se lanza la sesión:
- **`mode=enroll`** → `new EnrollmentProcessor(token, AppController)`
- **`mode=verify`** → `new VerificationProcessor(token, AppController)`

El SDK muestra la interfaz de captura facial 3D con prueba de vida.

### 6. Resultado (Paso 3)

#### Éxito
1. Muestra mensaje de confirmación
2. Dispara `notifyBot(true)` → GET a `cariai.com/flux/cbmsg?...&status_verify=1`
3. Muestra botón `💬 Regresar a WhatsApp`
4. Auto-redirige a WhatsApp a los 3 segundos usando el número `?cb=`

#### Fallo — registro duplicado (solo en `mode=enroll`)
Si el error contiene `"already exists"`, se detecta que el usuario ya está registrado y se ofrece ir directamente a verificación.

#### Fallo — otros errores
1. Muestra mensaje de error
2. Dispara `notifyBot(false)` → GET a `cariai.com/flux/cbmsg?...&status_verify=0`
3. Muestra botón `💬 Regresar a WhatsApp`
4. Auto-redirige a WhatsApp a los 3 segundos

---

## Callback al bot

Al finalizar (éxito o fallo), se hace un GET fire-and-forget:

```
GET https://cariai.com/flux/cbmsg?botId={botId}&chatId={chatId}&status_verify={1|0}
```

| `status_verify` | Significado |
|---|---|
| `1` | Proceso exitoso |
| `0` | Proceso fallido |

Se usa `new Image().src = url` para evitar problemas de CORS — no requiere respuesta del servidor.

---

## Redirección a WhatsApp

Al finalizar se redirige al número indicado en `?cb=`:

- **Android:** `intent://send/{numero}#Intent;scheme=whatsapp;package=com.whatsapp;end`
- **iOS:** `whatsapp://send?phone={numero}`

Adicionalmente se intenta cerrar la pestaña del navegador con `window.close()` (puede ser bloqueado por el navegador si la pestaña no fue abierta con `window.open()`).

---

## Archivos clave del proyecto

| Archivo / Carpeta | Descripción |
|---|---|
| `index.html` | Página principal unificada (registro + verificación) |
| `Config.js` | Credenciales FaceTec, customización visual, tema de colores |
| `core-sdk/FaceTecSDK.js/` | SDK core de FaceTec (no modificar) |
| `core-sdk/FaceTec_images/` | Imágenes del SDK + logo Total Play |
| `core-sdk-optional/FaceTecStrings.es.js` | Strings de la UI en español |
| `sample-apps/sample-app-js/processors/EnrollmentProcessor.js` | Lógica de registro biométrico |
| `sample-apps/sample-app-js/processors/VerificationProcessor.js` | Lógica de verificación biométrica |
| `sample-app-resources/Vocal_Guidance_Audio_Files/` | Audios de guía vocal en español |
| `sample-apps/chatbot-simulator/` | Simulador de bot (solo para desarrollo local) |

---

## Configuración — Config.js

### Credenciales (modo desarrollo)
```js
var DeviceKeyIdentifier = "de0umFnNMipX8zGGvoiKerpapOPK3YzM";
var BaseURL = "https://api.facetec.com/api/v3.1/biometrics";
```

> ⚠️ Estas son claves de **desarrollo**. Para producción usar `initializeInProductionMode` con claves comerciales de FaceTec.

### Personalización visual
Definida en `retrieveConfigurationWizardCustomization()`:
- Paleta de colores basada en azul marino `#1e3a5f`
- Logo: `core-sdk/FaceTec_images/total-play-logo.png`
- Marco con sombra profunda y bordes redondeados
- Feedback bar tipo píldora flotante
- Óvalo con degradado azul `#2563eb → #60a5fa`
- Guía vocal en español con audios MP3 propios
- Tag de modo desarrollo oculto (`enableDevelopmentModeTag = false`)

---

## Infraestructura AWS

| Servicio | Configuración |
|---|---|
| **S3** | Bucket: `facetec-demo`, sitio web estático habilitado |
| **CloudFront** | Default root object: `index.html`, HTTPS forzado |
| **ACM** | Certificado SSL para `dev-facetec.cariai.com` (región `us-east-1`) |
| **Route 53** | Registros A y AAAA → distribución CloudFront |

### Despliegue (subir cambios a S3)
```powershell
aws s3 sync . s3://facetec-demo/ --exclude ".git/*" --exclude "node_modules/*" --exclude "package*.json" --exclude "*.md" --exclude "sample-apps/sample-app-ts/*" --delete
```

### Servidor local de desarrollo
```
npm install
npm run facetec-browser-sdk
# Abre en http://localhost:8000
```

### Túnel HTTPS para pruebas en celular
```powershell
cloudflared tunnel --url http://localhost:8000
# Genera una URL temporal https://*.trycloudflare.com
```

---

## Limitaciones del modo desarrollo

- Los FaceMaps se almacenan en servidores compartidos de FaceTec y **pueden borrarse sin previo aviso**
- Solo funciona en `localhost` y dominios autorizados en la clave de desarrollo
- El tag "This App is in Development Mode" aparece en el SDK (ocultado con `enableDevelopmentModeTag = false`)
- Para producción se requiere contrato comercial con FaceTec y Server SDK propio

---

## Flujo completo del usuario

```
1. Bot de WhatsApp genera URL con parámetros
2. Usuario toca el link en WhatsApp
3. Android: redirige a Chrome via intent://
   iOS: abre en WebView de WhatsApp (la cámara funciona igual)
4. index.html carga y valida parámetros
5. FaceTec SDK inicializa (Paso 1)
6. Usuario presiona botón → SDK captura rostro 3D (Paso 2)
7. SDK envía FaceScan al servidor FaceTec
8. Resultado (Paso 3):
   ✅ Éxito → notifica al bot → botón WhatsApp → auto-redirige en 3s
   ❌ Fallo  → notifica al bot → botón WhatsApp → auto-redirige en 3s
   ⚠️ Ya registrado (enroll) → ofrece ir a verificación
```
