import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Dimensions, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Categoriacard from '../components/Cards/Categoriascard'; 
import ProductoCard from '../components/Cards/CardProducto'; 

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const ip = Constantes.IP;
  const productos = products;

  useEffect(() => {
    // Fetch categorias desde la API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/categoria.php?action=readAll`);
        const data = await response.json();
        
        if (data.dataset) {
          setCategories(data.dataset);
        } else {
          console.error('La respuesta no contiene el campo "dataset".', data);
          Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
        }
      } catch (error) {
        console.error('Error al obtener las categorías', error);
        Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
      }
    };

    // Fetch productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil`);
        const data = await response.json();
        console.log(data.dataset, 'data');
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

    fetchCategories();
    fetchProducts();
  }, []);

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchText} placeholder="Buscar..." />
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.sectionTitle}>Nuestras categorías</Text>
          <View style={styles.categoryList}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Categoriacard 
                  key={category.id_categoria} 
                  ip={ip} 
                  nombre_categoria={category.nombre_categoria} 
                  imagen_categoria={category.imagen_categoria} 
                />
              ))
            ) : (
              <Text>No hay categorías disponibles.</Text>
            )}
          </View>
        </View>
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Nuestros productos</Text>

          {
            products ? (
              <View>
                <Text>{productos.nombre_producto} productos disponibles.</Text>
              <Text>{productos.precio} productos disponibles.</Text>
              </View>
             
            ) : (
              <Text>No hay productos disponibles.</Text>
            )
          }

        </View>
      </ScrollView>
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VistaFutbol')}>
          <Icon name="home-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Carrito')}>
          <Icon name="cart-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Perfil')}>
          <Icon name="person-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 60,
    marginTop: 50,
  },
  searchText: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#f1f1f1',
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#f08080',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  categoryList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
  },
});
