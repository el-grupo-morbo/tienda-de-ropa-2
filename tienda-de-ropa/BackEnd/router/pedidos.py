import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status

from modulos.pedido import PedidoEntrada, PedidoSalida
from router.productos import leer_catalogo

router = APIRouter(prefix="/api/pedidos", tags=["Pedidos"])


@router.post("", response_model=PedidoSalida, status_code=status.HTTP_201_CREATED)
def crear_pedido(pedido: PedidoEntrada):
    catalogo = {producto.id: producto for producto in leer_catalogo()}
    total = 0.0
    cantidades: dict[int, int] = {}
    for item in pedido.items:
        cantidades[item.producto_id] = cantidades.get(item.producto_id, 0) + item.cantidad
    for producto_id, cantidad in cantidades.items():
        producto = catalogo.get(producto_id)
        if producto is None:
            raise HTTPException(status_code=404, detail=f"El producto {producto_id} ya no está disponible.")
        if cantidad > producto.stock:
            raise HTTPException(status_code=409, detail=f"Stock insuficiente para {producto.nombre}.")
        total += producto.precio * cantidad

    ahora = datetime.now(timezone.utc)
    numero = f"NORD-{ahora:%y%m%d}-{secrets.token_hex(3).upper()}"
    return PedidoSalida(
        numero_orden=numero,
        total=round(total, 2),
        moneda="ARS",
        mensaje=f"Gracias, {pedido.cliente.nombre}. Tu pedido quedó registrado para coordinar la entrega.",
    )
