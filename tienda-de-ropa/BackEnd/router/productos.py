import json
from functools import lru_cache
from pathlib import Path as FilePath

from fastapi import APIRouter, HTTPException, Path as PathParam, Query

from modulos.producto import Producto

router = APIRouter(prefix="/api/productos", tags=["Productos"])
CATALOGO = FilePath(__file__).resolve().parents[2] / "api" / "productos.json"


@lru_cache(maxsize=1)
def _cargar_catalogo() -> tuple[Producto, ...]:
    try:
        datos = json.loads(CATALOGO.read_text(encoding="utf-8"))
        return tuple(Producto.model_validate(producto) for producto in datos)
    except (OSError, json.JSONDecodeError, ValueError) as error:
        raise RuntimeError(f"No se pudo cargar el catálogo inicial: {error}") from error


def leer_catalogo() -> tuple[Producto, ...]:
    try:
        return _cargar_catalogo()
    except RuntimeError as error:
        raise HTTPException(status_code=500, detail="No se pudo cargar el catálogo.") from error


@router.get("", response_model=list[Producto])
def listar_productos(categoria: str | None = Query(default=None, min_length=1)):
    productos = leer_catalogo()
    if categoria:
        productos = tuple(p for p in productos if p.categoria.casefold() == categoria.casefold())
    return productos


@router.get("/{producto_id}", response_model=Producto)
def obtener_producto(producto_id: int = PathParam(gt=0)):
    producto = next((p for p in leer_catalogo() if p.id == producto_id), None)
    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado.")
    return producto
