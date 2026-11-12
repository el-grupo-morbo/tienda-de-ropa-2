import type { Producto, Pedido, ItemCarrito } from "../../types/tienda";

// En un teléfono físico, EXPO_PUBLIC_API_URL debe apuntar a la IP local de la computadora.
const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1:8000") || ("");

async function solicitar<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: { "Content-Type": "application/json", ...opciones?.headers },
  });
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new Error(datos.detail || "No se pudo completar la solicitud.");
  }
  return datos as T;
}

export const obtenerProductos = (signal?: AbortSignal) =>
  solicitar<Producto[]>("/api/productos", { signal });

export const obtenerProducto = (id: number, signal?: AbortSignal) =>
  solicitar<Producto>(`/api/productos/${id}`, { signal });

export function crearPedido(
  cliente: { nombre: string; email: string },
  items: ItemCarrito[],
) {
  return solicitar<Pedido>("/api/pedidos", {
    method: "POST",
    body: JSON.stringify({
      cliente,
      items: items.map(({ producto, cantidad }) => ({
        producto_id: producto.id,
        cantidad,
      })),
    }),
  });
}

export function formatoPrecio(precio: number, moneda = "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(precio);
}
