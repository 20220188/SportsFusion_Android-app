import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HistorialCard({ ip, id_detalle_producto, nombre_producto, imagen, precio_pedido, cantidad_pedido, fecha_registro, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: `${ip}/images/${imagen}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{nombre_producto}</Text>
        <Text>Fecha: {fecha_registro}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginLeft:-15,
  },
  title: {
    fontWeight: 'bold',
  },
});
