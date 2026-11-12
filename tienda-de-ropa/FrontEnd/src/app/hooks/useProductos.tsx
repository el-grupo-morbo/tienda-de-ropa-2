import { useCallback, useEffect, useState } from "react";
import { obtenerProducto, obtenerProductos } from "./api";
import type { Producto } from "../../types/tienda";

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async (signal?: AbortSignal) => {
    setCargando(true);
    setError(null);
    try {
      setProductos(await obtenerProductos(signal));
    } catch (e) {
      if (!signal?.aborted) setError(e instanceof Error ? e.message : "No se pudieron cargar los productos.");
    } finally {
      if (!signal?.aborted) setCargando(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void cargar(controller.signal);
    return () => controller.abort();
  }, [cargar]);

  return { productos, cargando, error, recargar: () => cargar() };
}

export function useProducto(id: number) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setCargando(true);
    setError(null);
    obtenerProducto(id, controller.signal)
      .then(setProducto)
      .catch((e: unknown) => {
        if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "No se encontró el producto.");
      })
      .finally(() => { if (!controller.signal.aborted) setCargando(false); });
    return () => controller.abort();
  }, [id]);

  return { producto, cargando, error };
}
