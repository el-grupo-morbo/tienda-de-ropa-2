import { Pressable, Text, View } from "react-native";
import { nativeStyles } from "../app/styles";
import { useRouter } from "expo-router";
import { useCarrito } from "../app/hooks/contextDeCarrito";

export function HeaderTienda({ subtitulo = "" }: { subtitulo?: string }) {
  const router = useRouter();
  const { cantidadTotal } = useCarrito();
  return (
    <View style={nativeStyles.header.fila}>
      <Pressable onPress={() => router.replace("/")} accessibilityRole="button" accessibilityLabel="Ir al inicio">
        <Text style={nativeStyles.header.marca}>NÓRDICA<Text style={nativeStyles.header.punto}>.</Text></Text>
        {subtitulo ? <Text style={nativeStyles.header.subtitulo}>{subtitulo}</Text> : null}
      </Pressable>
      <Pressable style={nativeStyles.header.carrito} onPress={() => router.push("/carrito")} accessibilityRole="button" accessibilityLabel={`Carrito, ${cantidadTotal} artículos`}>
        <Text style={nativeStyles.header.icono}>◌</Text>
        <Text style={nativeStyles.header.carritoTexto}>Bolsa</Text>
        <View style={nativeStyles.header.contador}><Text style={nativeStyles.header.contadorTexto}>{cantidadTotal}</Text></View>
      </Pressable>
    </View>
  );
}


