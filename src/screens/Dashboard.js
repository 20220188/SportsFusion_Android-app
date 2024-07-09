import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';
import Icon from 'react-native-vector-icons/Ionicons';
import Categoriacard from '../components/Cards/Categoriascard'; 
import ProductoCard from '../components/Cards/CardProducto'; 

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const ip = Constantes.IP;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=readProfile`);
        const data = await response.json();

        if (data.status) {
          setUserName(data.dataset.nombre_cliente);
        } else {
          console.error('Error fetching user profile:', data);
          Alert.alert('Error', 'Ocurrió un error al obtener el perfil del usuario');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Ocurrió un error al obtener el perfil del usuario');
      }
    };

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

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil`);
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

    fetchUserProfile();
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
          <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>
          <Text style={styles.sectionTitle}>Nuestras categorías</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContainer}
          >
            {categories.map((category) => (
              <Categoriacard 
                key={category.id_categoria} 
                ip={ip} 
                nombre_categoria={category.nombre_categoria} 
                imagen_categoria={category.imagen_categoria} 
              />
            ))}
          </ScrollView>
        </View>
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
      </ScrollView>
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Dashboard')}>
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
  categoryScrollContainer: {
    paddingHorizontal: 10,
  },
});
