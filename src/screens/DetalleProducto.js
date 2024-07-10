import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert, SafeAreaView, ScrollView } from 'react-native';
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
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readOnePublica`,{
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
            <Text style={styles.description}>{product.imagen}</Text>
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
