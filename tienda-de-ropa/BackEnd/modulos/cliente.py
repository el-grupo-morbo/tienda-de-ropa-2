from pydantic import BaseModel, Field


class ClientePedido(BaseModel):
    nombre: str = Field(min_length=2, max_length=100)
    email: str = Field(
        min_length=6,
        max_length=254,
        pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$",
    )
