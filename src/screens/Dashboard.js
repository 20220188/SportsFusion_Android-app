import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, FlatList, Image } from 'react-native';
import * as Constantes from '../utils/constantes';
import Icon from 'react-native-vector-icons/Ionicons';
import Categoriacard from '../components/Cards/Categoriascard'; 
import ProductoCard from '../components/Cards/CardProducto'; 

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para productos filtrados
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para categoría seleccionada
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la consulta de búsqueda
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
          setFilteredProducts(data.dataset); // Inicializar productos filtrados
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

  console.log('Productos:', products);

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

  const renderItem = ({ item }) => (
    <ProductoCard
      key={item.id_detalle_producto.toString()}
      ip={ip}
      nombre_producto={item.nombre_producto}
      imagen={item.imagen}
      precio={item.precio}
      onPress={() => navigation.navigate('DetalleProducto', { id_producto: item.id_detalle_producto })}
    />
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = products.filter(product =>
        product.nombre_producto.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filteredData = products.filter(product => product.categoria_id === category.id_categoria);
    setFilteredProducts(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={require('../img/logoSF.png')} style={styles.logo} />
        <TextInput
          style={styles.searchText}
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>
            <Text style={styles.sectionTitle}>Nuestras categorías</Text>
            <FlatList
              horizontal
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id_categoria} onPress={() => handleCategorySelect(item)}>
                  <Categoriacard 
                    ip={ip} 
                    nombre_categoria={item.nombre_categoria} 
                    imagen_categoria={item.imagen_categoria} 
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id_categoria.toString()}
              contentContainerStyle={styles.categoryScrollContainer}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Productos</Text>
          </>
        }
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_detalle_producto.toString()}
        contentContainerStyle={styles.productsContainer}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginLeft: 70,
  },
  welcomeText: {
    fontSize: 24,
    color: '#f08080',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    marginLeft: 15,
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
