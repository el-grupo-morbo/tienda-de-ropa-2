from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.pedidos import router as pedidos_router
from router.productos import router as productos_router

app = FastAPI(
    title="Nórdica · API de tienda",
    description="Catálogo de indumentaria y confirmación simulada de pedidos.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Desarrollo local; restringir al dominio de la app al publicar.
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(productos_router)
app.include_router(pedidos_router)


@app.get("/", tags=["Estado"])
def estado():
    return {"aplicacion": "Nórdica", "estado": "ok", "documentacion": "/docs"}
