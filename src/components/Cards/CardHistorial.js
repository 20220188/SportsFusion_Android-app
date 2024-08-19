// HistorialCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HistorialCard({ ip, id_detalle_producto, nombre_producto, imagen, precio, cantidad_pedido, fecha_registro, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id_detalle_producto)}>
      <Image 
        source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{nombre_producto}</Text>
        <Text style={styles.price}>${precio.toFixed(2)}</Text>
        <Text style={styles.quantity}>Cantidad: {cantidad_pedido}</Text>
        <Text style={styles.date}>Fecha: {new Date(fecha_registro).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 14,
    color: '#f08080',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  quantity: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  date: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
});
