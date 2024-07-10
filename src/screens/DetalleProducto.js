import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, Alert, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        {product ? (
          <>
            <Image
              source={{ uri: `${ip}/sportfusion/api/images/productos/${product.imagen}` }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.productDetails}>
              <Text style={styles.title}>{product.nombre_producto}</Text>
              <Text style={styles.subtitle}>{product.descripcion}</Text>
              <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{product.cantidad_disponible} {(product.cantidad_disponible === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Precio</Text>
                <Text style={styles.price}>{product.precio}</Text>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>Carrito</Text>
                  <Icon name="cart" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
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
  backButton: {
    position: 'absolute',
    top: 50, // Ajuste para evitar la superposición con el panel de control
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  productDetails: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8, 
    fontWeight: '700',
  }, 
  textDentro: {
    fontWeight: '400',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTitle: {
    fontSize: 16,
    color: 'red',
  },
  price: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cartButtonText: {
    color: '#fff',
    marginRight: 5,
  },
});
