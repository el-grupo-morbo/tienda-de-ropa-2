import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { nativeStyles } from "./styles";
import { useRouter } from "expo-router";
import { HeaderTienda } from "../componentes/cabezera";
import { useCarrito } from "./hooks/contextDeCarrito";
import { formatoPrecio } from "./hooks/api";

export default function Carrito() {
  const router = useRouter();
  const { items, total, cambiarCantidad, quitar } = useCarrito();
  return (
    <View style={nativeStyles.cart.pantalla}>
    
      <HeaderTienda subtitulo="Tu selección" />
      <ScrollView contentContainerStyle={nativeStyles.cart.contenido}>
        <Text style={nativeStyles.cart.ceja}>NÓRDICA · TU BOLSA</Text>
        <Text style={nativeStyles.cart.titulo}>Las elegidas</Text>
        {items.length === 0 ? (
        
        
        <View style={nativeStyles.cart.vacio}>
            <Text style={nativeStyles.cart.simbolo}>○</Text>
            <Text style={nativeStyles.cart.vacioTitulo}>Tu bolsa está esperando.</Text>
            <Text style={nativeStyles.cart.vacioTexto}>Descubrí prendas que vas a querer usar una y otra vez.</Text>
            <Pressable style={nativeStyles.cart.boton} onPress={() => router.replace("/")}><Text style={nativeStyles.cart.botonTexto}>Explorar colección</Text></Pressable>
        </View>
        ) : (
          <>
            {items.map(({ producto, cantidad }) => (
              <View key={producto.id} style={nativeStyles.cart.item}>
                <Image source={{ uri: producto.imagen }} style={nativeStyles.cart.imagen} />
               
                <View style={nativeStyles.cart.detalle}>
                  <Text style={nativeStyles.cart.categoria}>{producto.categoria}</Text>
                  <Text style={nativeStyles.cart.nombre} numberOfLines={2}>{producto.nombre}</Text>
                  <Text style={nativeStyles.cart.precio}>{formatoPrecio(producto.precio, producto.moneda)}</Text>
                 
                  <View style={nativeStyles.cart.controles}>
                    <Pressable style={nativeStyles.cart.control} onPress={() => cambiarCantidad(producto.id, cantidad - 1)}><Text style={nativeStyles.cart.controlTexto}>−</Text></Pressable>
                    <Text style={nativeStyles.cart.cantidad}>{cantidad}</Text>
                    <Pressable style={nativeStyles.cart.control} onPress={() => cambiarCantidad(producto.id, cantidad + 1)}><Text style={nativeStyles.cart.controlTexto}>+</Text></Pressable>
                    <Pressable onPress={() => quitar(producto.id)} style={nativeStyles.cart.quitar}><Text style={nativeStyles.cart.quitarTexto}>Quitar</Text></Pressable>
                  </View>
                </View>
              </View>
            ))}
           
            <View style={nativeStyles.cart.resumen}>
              <View style={nativeStyles.cart.linea}><Text style={nativeStyles.cart.resumenLabel}>Subtotal</Text><Text style={nativeStyles.cart.resumenValor}>{formatoPrecio(total)}</Text></View>
              <View style={nativeStyles.cart.linea}><Text style={nativeStyles.cart.resumenLabel}>Envío</Text><Text style={nativeStyles.cart.envio}>A coordinar</Text></View>
              <View style={[nativeStyles.cart.linea, nativeStyles.cart.totalLinea]}><Text style={nativeStyles.cart.totalLabel}>Total</Text><Text style={nativeStyles.cart.totalValor}>{formatoPrecio(total)}</Text></View>
              <Pressable style={nativeStyles.cart.boton} onPress={() => router.push("/checkout")}><Text style={nativeStyles.cart.botonTexto}>Continuar con mis datos</Text></Pressable>
              <Text style={nativeStyles.cart.aclaracion}>Pago simulado · No se realizará ningún cobro</Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}


