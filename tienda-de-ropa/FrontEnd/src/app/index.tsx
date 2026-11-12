import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { HeaderTienda } from "../componentes/cabezera";
import { ProductoCard } from "../componentes/cartaprodcuto";
import { useProductos } from "./hooks/useProductos";
import { nativeStyles as styles } from "./styles";

export default function Inicio() {
  const { productos, cargando, error, recargar } = useProductos();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todo");
  const categorias = useMemo(() => ["Todo", ...new Set(productos.map((p) => p.categoria))], [productos]);
  const filtrados = useMemo(() => productos.filter((p) =>
    (categoria === "Todo" || p.categoria === categoria) &&
    `${p.nombre} ${p.descripcion} ${p.categoria}`.toLowerCase().includes(busqueda.trim().toLowerCase()),
  ), [productos, categoria, busqueda]);

  return (
    <View style={styles.home.pantalla}>
      <HeaderTienda subtitulo="Vestir con intención" />
      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <ProductoCard producto={item} />}
        contentContainerStyle={styles.home.contenido}
        columnWrapperStyle={styles.home.fila}
        refreshControl={<RefreshControl refreshing={cargando} onRefresh={recargar} tintColor="#b85b3d" />}
        ListHeaderComponent={(
          <View>
            <View style={styles.home.hero}>
              <Text style={styles.home.kicker}>NUEVA TEMPORADA · 2026</Text>
              <Text style={styles.home.tituloHero}>Menos ruido.{"\n"}<Text style={styles.home.cursiva}>Más estilo.</Text></Text>
              <Text style={styles.home.bajada}>Prendas esenciales para todos tus días.</Text>
              <View style={styles.home.trazo} />
            </View>
            <View style={styles.home.intro}>
              <View><Text style={styles.home.ceja}>SELECCIÓN NÓRDICA</Text><Text style={styles.home.tituloSeccion}>Lo que se lleva</Text></View>
              <Text style={styles.home.cuenta}>{productos.length} piezas</Text>
            </View>
            <TextInput value={busqueda} onChangeText={setBusqueda} placeholder="Buscar prendas" placeholderTextColor="#9b948b" style={styles.home.busqueda} accessibilityLabel="Buscar productos" />
            <FlatList
              horizontal
              data={categorias}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.home.categorias}
              renderItem={({ item }) => (
                <Pressable onPress={() => setCategoria(item)} style={categoria === item ? [styles.home.chip, styles.home.chipActivo] : styles.home.chip}>
                  <Text style={categoria === item ? [styles.home.chipTexto, styles.home.chipTextoActivo] : styles.home.chipTexto}>{item}</Text>
                </Pressable>
              )}
              style={styles.home.listaCategorias}
            />
          </View>
        )}
        ListEmptyComponent={cargando ? <View style={styles.home.estado}><ActivityIndicator size="large" color="#b85b3d" /><Text style={styles.home.estadoTexto}>Preparando la colección…</Text></View> : error ? <View style={styles.home.estado}><Text style={styles.home.error}>{error}</Text><Pressable onPress={recargar} style={styles.home.botonOscuro}><Text style={styles.home.botonOscuroTexto}>Reintentar</Text></Pressable></View> : <Text style={styles.home.vacio}>No encontramos prendas con esa búsqueda.</Text>}
        ListFooterComponent={<Text style={styles.home.piePagina}>NÓRDICA · HECHO PARA DURAR</Text>}
      />
    </View>
  );
}
