import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Image, Text, ActivityIndicator, Alert, SafeAreaView, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function DetalleProducto({ route, navigation }) {
  const { id_producto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const ip = Constantes.IP;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log('id_producto', id_producto);
        const formData = new FormData();
        formData.append('idProducto', id_producto);
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readOnePublica`, {
          method: 'POST',
          body: formData,
        });


        const data = await response.json();
        if (data.dataset) {
          setProduct(data.dataset);
          console.log('data.dataset', data.dataset);
        } else {
          console.error('La respuesta no contiene el campo "dataset".', data);
          Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto');
        }

      } catch (error) {
        console.error('Error al obtener los detalles del producto', error);
        Alert.alert('Error', 'Ocurrió un error al obtener los detalles del producto1');
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {product ? (
          <>
            <Text style={styles.title}>{product.nombre_producto}</Text>
            <Image
              source={{ uri: `${ip}/sportfusion/api/images/productos/${product.imagen}` }}
              style={styles.image}
              resizeMode="contain" // Ajustar la imagen al contenedor
            />
            <Text style={styles.description}>{product.descripcion}</Text>
            <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{product.cantidad_disponible} {(product.cantidad_disponible === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
            <Text style={styles.price}>Precio: {product.precio}</Text>
          </>
        ) : (
          <Text>No se encontraron detalles del producto.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8, fontWeight: '700'
  }, textDentro: {
    fontWeight: '400'
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, // Add some padding to the bottom
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
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
