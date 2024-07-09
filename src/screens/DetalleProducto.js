import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';

export default function DetalleProducto({ route, navigation }) {
  const { id_producto } = route.params;
  const [product, setProduct] = useState(null);
  const ip = Constantes.IP;

  const backProducts = () => {
    navigation.navigate('Dashboard');
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readOnePublica&id_producto=${id_producto}`);
        const data = await response.json();

        if (data.dataset) {
          setProduct(data.dataset[0]);
        } else {
          console.error('La respuesta no contiene el campo "dataset".', data);
          Alert.alert('Error', 'Ocurrió un error al obtener el producto');
        }
      } catch (error) {
        console.error('Error al obtener el producto', error);
        Alert.alert('Error', 'Ocurrió un error al obtener el producto');
      }
    };

    fetchProductDetails();
  }, [id_producto]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backProducts} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Image source={{ uri: `${ip}/${product.imagen}` }} style={styles.imagen} />
      <View style={styles.card}>
        <Text style={styles.title}>{product.nombre_producto}</Text>
        <Text style={styles.price}>${product.precio}</Text>
        <Text style={styles.description}>{product.descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imagen: {
    width: '100%',
    height: 300,
  },
  card: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
    marginTop: -25,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
});
