from pydantic import BaseModel, Field

from .cliente import ClientePedido


class ItemPedidoEntrada(BaseModel):
    producto_id: int = Field(gt=0)
    cantidad: int = Field(gt=0, le=20)


class PedidoEntrada(BaseModel):
    cliente: ClientePedido
    items: list[ItemPedidoEntrada] = Field(min_length=1, max_length=30)


class PedidoSalida(BaseModel):
    numero_orden: str
    total: float
    moneda: str = "ARS"
    mensaje: str
