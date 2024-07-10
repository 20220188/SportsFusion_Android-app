import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function DetalleProducto({ route, navigation }) {
  const { id_producto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const ip = Constantes.IP;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readOnePublica`);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.dataset) {
            setProduct(data.dataset);
          } else {
            console.error('La respuesta no contiene el campo "dataset".', data);
            Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto');
          }
        } else {
          const text = await response.text();
          console.error('Expected JSON but received:', text);
          Alert.alert('Error', 'La respuesta no es JSON');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto', error);
        Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id_producto]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Text style={styles.title}>{product.nombre_producto}</Text>
          <Text style={styles.description}>{product.imagen}</Text>
          <Text style={styles.price}>Precio: {product.precio}</Text>
        </>
      ) : (
        <Text>No se encontraron detalles del producto.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 18,
    color: '#f08080',
    fontFamily: 'Poppins-Regular',
  },
});
