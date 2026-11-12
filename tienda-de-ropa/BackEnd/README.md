# tienda-de-ropa

## API de la tienda

La API FastAPI sirve el catálogo inicial desde `../api/productos.json` y ofrece un checkout simulado. No procesa pagos ni guarda pedidos de forma permanente.

### Ejecutar en Windows

```powershell
cd BackEnd
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0
```

Documentación interactiva: <http://127.0.0.1:8000/docs>.

### Endpoints

| Método | Ruta | Uso |
|---|---|---|
| GET | `/api/productos` | Lista el catálogo. Acepta `?categoria=remeras`. |
| GET | `/api/productos/{producto_id}` | Devuelve el detalle de un producto. |
| POST | `/api/pedidos` | Valida stock y devuelve una orden de prueba (`201`). |

El pedido recibe `cliente: {nombre, email}` e `items: [{producto_id, cantidad}]`. La confirmación es simulada; los pedidos y el stock no se guardan en la base de datos.

## Frontend Expo

Arrancá primero la API. Luego, desde `FrontEnd`, copiá `.env.example` a `.env` y configurá `EXPO_PUBLIC_API_URL`:

- iOS Simulator o navegador local: `http://127.0.0.1:8000`
- Android Emulator: `http://10.0.2.2:8000`
- Teléfono físico: `http://IP_LOCAL_DE_LA_COMPUTADORA:8000`

Iniciá Expo con `bunx expo start`.
