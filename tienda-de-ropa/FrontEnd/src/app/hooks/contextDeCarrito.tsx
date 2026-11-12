import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ItemCarrito, Pedido, Producto } from "../../types/tienda";

type CarritoValue = {
  items: ItemCarrito[];
  cantidadTotal: number;
  total: number;
  pedido: Pedido | null;
  agregar: (producto: Producto) => void;
  quitar: (productoId: number) => void;
  cambiarCantidad: (productoId: number, cantidad: number) => void;
  vaciar: () => void;
  confirmarPedido: (pedido: Pedido) => void;
};

const CarritoContext = createContext<CarritoValue | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  const value = useMemo<CarritoValue>(() => {
    const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);
    const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);
    return {
      items,
      cantidadTotal,
      total,
      pedido,
     
     
      agregar(producto) {
        setItems((actuales) => {
          const existente = actuales.find((item) => item.producto.id === producto.id);
          if (existente) {
            return actuales.map((item) =>
              item.producto.id === producto.id
                ? { ...item, cantidad: Math.min(item.cantidad + 1, producto.stock) }
                : item,
            );
          }
          return producto.stock > 0 ? [...actuales, { producto, cantidad: 1 }] : actuales;
        });
      },
      quitar(productoId) {
        setItems((actuales) => actuales.filter((item) => item.producto.id !== productoId));
      },
      
      cambiarCantidad(productoId, cantidad) {
        setItems((actuales) => actuales
          .map((item) => item.producto.id === productoId
            ? { ...item, cantidad: Math.max(0, Math.min(cantidad, item.producto.stock)) }
            : item)
          .filter((item) => item.cantidad > 0));
      },
      vaciar() {
        setItems([]);
      },
      confirmarPedido(nuevoPedido) {
        setPedido(nuevoPedido);
        setItems([]);
      },
    };
  }, [items, pedido]);

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return contexto;
}
