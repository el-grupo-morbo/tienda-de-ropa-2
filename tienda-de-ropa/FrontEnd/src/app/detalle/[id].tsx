import { useLocalSearchParams, useRouter } from "expo-router";
import { nativeStyles } from "../styles";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { HeaderTienda } from "../../componentes/cabezera";
import { useCarrito } from "../hooks/contextDeCarrito";
import { useProducto } from "../hooks/useProductos";
import { formatoPrecio } from "../hooks/api";

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { producto, cargando, error } = useProducto(Number(id));
  const { agregar } = useCarrito();

  if (cargando) return <View style={nativeStyles.detail.centrado}><HeaderTienda /><ActivityIndicator style={nativeStyles.detail.loader} size="large" color="#b85b3d" /></View>;
  if (!producto) return <View style={nativeStyles.detail.pantalla}><HeaderTienda /><View style={nativeStyles.detail.centrado}><Text style={nativeStyles.detail.textoError}>{error || "No se encontró el producto."}</Text><Pressable style={nativeStyles.detail.boton} onPress={() => router.back()}><Text style={nativeStyles.detail.textoBoton}>Volver</Text></Pressable></View></View>;

  return (
    <View style={nativeStyles.detail.pantalla}>
      <HeaderTienda />
      <ScrollView contentContainerStyle={nativeStyles.detail.contenido}>
        <Image source={{ uri: producto.imagen }} style={nativeStyles.detail.imagen} resizeMode="cover" />
        <View style={nativeStyles.detail.info}>
          <Text style={nativeStyles.detail.categoria}>{producto.categoria} · COLECCIÓN 2026</Text>
          <Text style={nativeStyles.detail.nombre}>{producto.nombre}</Text>
          <Text style={nativeStyles.detail.precio}>{formatoPrecio(producto.precio, producto.moneda)}</Text>
          <View style={nativeStyles.detail.separador} />
          <Text style={nativeStyles.detail.descripcion}>{producto.descripcion}</Text>
          {producto.talles?.length ? <><Text style={nativeStyles.detail.label}>TALLES</Text><View style={nativeStyles.detail.chips}>{producto.talles.map((talle) => <View key={talle} style={nativeStyles.detail.chip}><Text style={nativeStyles.detail.chipTexto}>{talle}</Text></View>)}</View></> : null}
          {producto.colores?.length ? <><Text style={nativeStyles.detail.label}>COLOR</Text><View style={nativeStyles.detail.chips}>{producto.colores.map((color) => <View key={color} style={nativeStyles.detail.chip}><Text style={nativeStyles.detail.chipTexto}>{color}</Text></View>)}</View></> : null}
          <Text style={nativeStyles.detail.stock}>{producto.stock > 0 ? `${producto.stock} disponibles` : "Sin stock"}</Text>
          <Pressable style={[nativeStyles.detail.boton, producto.stock < 1 && nativeStyles.detail.botonDesactivado]} disabled={producto.stock < 1} onPress={() => agregar(producto)}>
            <Text style={nativeStyles.detail.textoBoton}>Agregar a la bolsa</Text>
          </Pressable>
          <Pressable style={nativeStyles.detail.link} onPress={() => router.push("/carrito")}><Text style={nativeStyles.detail.linkTexto}>Ver bolsa →</Text></Pressable>
        </View>
      </ScrollView>
    </View>
  );
}


