import { Image, Pressable, Text, View } from "react-native";
import { nativeStyles } from "../app/styles";
import { useRouter } from "expo-router";
import { useCarrito } from "../app/hooks/contextDeCarrito";
import { formatoPrecio } from "../app/hooks/api";
import type { Producto } from "../types/tienda";

export function ProductoCard({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregar } = useCarrito();
  return (
    <View style={nativeStyles.product.tarjeta}>
      <Pressable onPress={() => router.push({ pathname: "/detalle/[id]", params: { id: String(producto.id) } })} accessibilityRole="button">
        <View style={nativeStyles.product.marco}>
          <Image source={{ uri: producto.imagen }} style={nativeStyles.product.imagen} resizeMode="cover" />
          {producto.destacado ? <Text style={nativeStyles.product.etiqueta}>DESTACADO</Text> : null}
        </View>
        <Text style={nativeStyles.product.categoria}>{producto.categoria}</Text>
        <Text style={nativeStyles.product.nombre} numberOfLines={2}>{producto.nombre}</Text>
      </Pressable>
      <View style={nativeStyles.product.pie}>
        <Text style={nativeStyles.product.precio}>{formatoPrecio(producto.precio, producto.moneda)}</Text>
        <Pressable style={nativeStyles.product.botonAgregar} onPress={() => agregar(producto)} accessibilityRole="button" accessibilityLabel={`Agregar ${producto.nombre} al carrito`}>
          <Text style={nativeStyles.product.mas}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}


