import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CarritoProvider } from "./hooks/contextDeCarrito";

export default function Layout() {
  return (
    <CarritoProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#faf8f4" }, animation: "slide_from_right" }}>
        <Stack.Screen name="index" options={{ title: "Nórdica" }} />
        <Stack.Screen name="detalle/[id]" />
        <Stack.Screen name="carrito" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="pedido" />
      </Stack>
    </CarritoProvider>
  );
}
