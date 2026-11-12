from pydantic import BaseModel, ConfigDict, Field


class Producto(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int = Field(gt=0)
    nombre: str
    descripcion: str
    precio: float = Field(ge=0)
    moneda: str = "ARS"
    categoria: str
    imagen: str
    imagenes: list[str] = Field(default_factory=list)
    talles: list[str] = Field(default_factory=list)
    colores: list[str] = Field(default_factory=list)
    stock: int = Field(ge=0)
    destacado: bool = False
