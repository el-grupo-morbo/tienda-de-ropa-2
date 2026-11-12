import { Pressable, Text, View } from "react-native";
import { nativeStyles } from "./styles";
import { useRouter } from "expo-router";
import { HeaderTienda } from "../componentes/cabezera";
import { useCarrito } from "./hooks/contextDeCarrito";
import { formatoPrecio } from "./hooks/api";

export default function ConfirmacionPedido() {
  const router = useRouter();
  const { pedido } = useCarrito();
  return (
    <View style={nativeStyles.receipt.pantalla}>
      <HeaderTienda subtitulo="Confirmación" />
      <View style={nativeStyles.receipt.contenido}>
        <View style={nativeStyles.receipt.sello}><Text style={nativeStyles.receipt.check}>✓</Text></View>
        <Text style={nativeStyles.receipt.ceja}>PEDIDO RECIBIDO</Text>
        <Text style={nativeStyles.receipt.titulo}>Gracias por elegir con intención.</Text>
        {pedido ? <>
          <Text style={nativeStyles.receipt.cuerpo}>{pedido.mensaje}</Text>
          <View style={nativeStyles.receipt.comprobante}>
            <Text style={nativeStyles.receipt.label}>NÚMERO DE ORDEN</Text>
            <Text style={nativeStyles.receipt.orden}>{pedido.numero_orden}</Text>
            <View style={nativeStyles.receipt.separador} />
            <View style={nativeStyles.receipt.linea}><Text style={nativeStyles.receipt.label}>TOTAL SIMULADO</Text><Text style={nativeStyles.receipt.total}>{formatoPrecio(pedido.total, pedido.moneda)}</Text></View>
          </View>
        </> : <Text style={nativeStyles.receipt.cuerpo}>No hay una orden reciente. Podés volver a la colección para empezar.</Text>}
        <Pressable style={nativeStyles.receipt.boton} onPress={() => router.replace("/")}><Text style={nativeStyles.receipt.botonTexto}>Volver a la colección</Text></Pressable>
        <Text style={nativeStyles.receipt.nota}>Esto es una confirmación de prueba. No se realizó ningún pago.</Text>
      </View>
    </View>
  );
}


