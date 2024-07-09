import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import ProductoCard from '../components/Cards/CardProducto'; 

export default function SelectProduct({ navigation }){

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const ip = Constantes.IP;

  const backProducts = () => {
    navigation.navigate('Dashboard');
  };

  useEffect(() => {

    

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readOnePublica`);
        const data = await response.json();
        
        console.log('API Response for Products:', data);
        
        if (data.dataset) {
          setProducts(data.dataset);
        } else {
          console.error('La respuesta no contiene el campo "dataset".', data);
          Alert.alert('Error', 'Ocurrió un error al obtener los productos');
        }
      } catch (error) {
        console.error('Error al obtener los productos', error);
        Alert.alert('Error', 'Ocurrió un error al obtener los productos');
      }
    };
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backProducts} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      
      <View style={styles.productsContainer}>
          {products.map((product) => (
            <ProductoCard 
              key={product.id_producto}
              ip={ip}
              id_producto={product.id_producto}
              nombre_producto={product.nombre_producto}
              imagen={product.imagen}
              precio={product.precio}
            />
          ))}
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
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
  },
  sizes: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
});
