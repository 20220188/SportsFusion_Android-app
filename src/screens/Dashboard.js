import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Categoriacard from '../components/Cards/Categoriascard'; // Importar el componente

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const [categories, setCategories] = useState([]);
  const ip = Constantes.IP; // Define tu IP aquí

  useEffect(() => {
    // Fetch categorias desde la API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/categoria.php?action=readAll`);
        const data = await response.json();
        
        if (data.dataset) {
          setCategories(data.dataset); // Asegúrate de que el nombre del campo coincida con tu respuesta
        } else {
          console.error('La respuesta no contiene el campo "dataset".', data);
          Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
        }
      } catch (error) {
        console.error('Error al obtener las categorías', error);
        Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
      }
    };

    fetchCategories();
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
      <View style={styles.contentContainer}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.sectionTitle}>Nuestras categorías</Text>
          <Image 
            source={{ uri: 'https://example.com/some-image.jpg' }} 
            style={styles.mainImage}
          />
        </View>
        <View style={styles.categoryList}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoryItems}>
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
      </View>
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
  mainImage: {
    width: '100%',
    height: width * 0.5, // Adjust height to maintain aspect ratio
    borderRadius: 10,
  },
  categoryList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Para que las tarjetas se ajusten automáticamente a la pantalla
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
