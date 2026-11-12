export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  moneda: string;
  categoria: string;
  imagen: string;
  imagenes?: string[];
  talles?: string[];
  colores?: string[];
  stock: number;
  destacado?: boolean;
};

export type ItemCarrito = { producto: Producto; cantidad: number };

export type Pedido = {
  numero_orden: string;
  total: number;
  moneda: string;
  mensaje: string;
};
