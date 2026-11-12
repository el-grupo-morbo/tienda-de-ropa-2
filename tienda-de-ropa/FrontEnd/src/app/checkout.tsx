import { useState } from "react";
import { nativeStyles } from "./styles";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { HeaderTienda } from "../componentes/cabezera";
import { useCarrito } from "./hooks/contextDeCarrito";
import { crearPedido, formatoPrecio } from "./hooks/api";

export default function Checkout() {
  const router = useRouter();
  const { items, total, confirmarPedido } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviarPedido() {
    setError("");
    if (!nombre.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Ingresá tu nombre y un correo electrónico válido.");
      return;
    }
    if (!items.length) {
      router.replace("/carrito");
      return;
    }
    setEnviando(true);
    try {
      const respuesta = await crearPedido({ nombre: nombre.trim(), email: email.trim() }, items);
      confirmarPedido(respuesta);
      router.replace("/pedido");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos crear el pedido. Intentá nuevamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={nativeStyles.checkout.pantalla}>
      <HeaderTienda subtitulo="Un último paso" />
      <KeyboardAvoidingView style={nativeStyles.checkout.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={nativeStyles.checkout.contenido} keyboardShouldPersistTaps="handled">
          <Text style={nativeStyles.checkout.ceja}>CHECKOUT · PAGO SIMULADO</Text>
          <Text style={nativeStyles.checkout.titulo}>¿A quién preparamos el pedido?</Text>
          <Text style={nativeStyles.checkout.intro}>Dejanos tus datos para generar la confirmación. No se solicitarán datos de pago.</Text>
          <Text style={nativeStyles.checkout.label}>NOMBRE Y APELLIDO</Text>
          <TextInput value={nombre} onChangeText={setNombre} placeholder="Tu nombre" placeholderTextColor="#9b948b" autoCapitalize="words" style={nativeStyles.checkout.campo} accessibilityLabel="Nombre y apellido" />
          <Text style={nativeStyles.checkout.label}>CORREO ELECTRÓNICO</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="nombre@correo.com" placeholderTextColor="#9b948b" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={nativeStyles.checkout.campo} accessibilityLabel="Correo electrónico" />
          <View style={nativeStyles.checkout.resumen}>
            <View style={nativeStyles.checkout.linea}><Text style={nativeStyles.checkout.resumenLabel}>Artículos</Text><Text style={nativeStyles.checkout.resumenValor}>{items.reduce((n, item) => n + item.cantidad, 0)}</Text></View>
            <View style={nativeStyles.checkout.linea}><Text style={nativeStyles.checkout.totalLabel}>Total</Text><Text style={nativeStyles.checkout.totalValor}>{formatoPrecio(total)}</Text></View>
          </View>
          {error ? <Text accessibilityRole="alert" style={nativeStyles.checkout.error}>{error}</Text> : null}
          <Pressable style={[nativeStyles.checkout.boton, enviando && nativeStyles.checkout.botonOcupado]} onPress={enviarPedido} disabled={enviando}>
            {enviando ? <ActivityIndicator color="#fffaf4" /> : <Text style={nativeStyles.checkout.botonTexto}>Confirmar pedido</Text>}
          </Pressable>
          <Text style={nativeStyles.checkout.aclaracion}>La confirmación no implica un cobro ni una compra real.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}


