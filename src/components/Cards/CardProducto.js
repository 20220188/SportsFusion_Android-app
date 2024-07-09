// CardProducto.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductoCard({ ip, id_producto, nombre_producto, imagen, precio, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: `${ip}SportFusion/api/images/productos/${imagen}` }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre_producto}</Text>
        <Text style={styles.precio}>${precio}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  precio: {
    fontSize: 14,
    color: '#888',
  },
});
