import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Dimensions, FlatList, Image } from 'react-native';
import * as Constantes from '../utils/constantes';
import Icon from 'react-native-vector-icons/Ionicons';
import Categoriacard from '../components/Cards/Categoriascard'; 
import CardDeporte from '../components/Cards/CardDeporte'; 
import ProductoCard from '../components/Cards/CardProducto'; 

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
          Alert.alert('Error', 'Ocurrió un error al obtener el perfil del usuario');
        }
      } catch (error) {
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
          Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener las categorías');
      }
    };

    const fetchSports = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/deporte.php?action=readAll`);
        const data = await response.json();
        if (data.dataset) {
          setSports(data.dataset);
        } else {
          Alert.alert('Error', 'Ocurrió un error al obtener los deportes');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener los deportes');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil`);
        const data = await response.json();
        if (data.dataset) {
          setProducts(data.dataset);
          setFilteredProducts(data.dataset);
        } else {
          Alert.alert('Error', 'Ocurrió un error al obtener los productos');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener los productos');
      }
    };

    fetchUserProfile();
    fetchCategories();
    fetchSports();
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

  const handleCategorySelect = async (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(category);
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil&id_categoria=${category.id_categoria}`);
        const data = await response.json();
        if (data.dataset) {
          setFilteredProducts(data.dataset);
        } else {
          Alert.alert('Error', 'Ocurrió un error al obtener los productos de la categoría');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener los productos de la categoría');
      }
    }
  };

  const handleSportSelect = async (sport) => {
    if (sport === selectedSport) {
      setSelectedSport(null);
      setFilteredProducts(products);
    } else {
      setSelectedSport(sport);
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil&id_deporte=${sport.id_deporte}`);
        const data = await response.json();
        if (data.dataset) {
          setFilteredProducts(data.dataset);
        } else {
          Alert.alert('Error', 'Ocurrió un error al obtener los productos del deporte');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al obtener los productos del deporte');
      }
    }
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
            <Text style={styles.sectionTitle}>Categorías</Text>
            <FlatList
              horizontal
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id_categoria}
                  onPress={() => handleCategorySelect(item)}
                  style={[
                    styles.categoryItem,
                    selectedCategory && selectedCategory.id_categoria === item.id_categoria && styles.selectedCategory,
                  ]}
                >
                  <Categoriacard
                    ip={ip}
                    nombre_categoria={item.nombre_categoria}
                    imagen_categoria={item.imagen_categoria}
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategory && selectedCategory.id_categoria === item.id_categoria && styles.selectedText
                  ]}>
                    {item.nombre_categoria}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id_categoria.toString()}
              contentContainerStyle={styles.categoryScrollContainer}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Deportes</Text>
            <FlatList
              horizontal
              data={sports}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id_deporte}
                  onPress={() => handleSportSelect(item)}
                  style={[
                    styles.sportItem,
                    selectedSport && selectedSport.id_deporte === item.id_deporte && styles.selectedSport,
                  ]}
                >
                  <CardDeporte
                    ip={ip}
                    nombre_deporte={item.nombre_deporte}
                    imagen_deporte={item.imagen_deporte}
                  />
                  <Text style={[
                    styles.sportText,
                    selectedSport && selectedSport.id_deporte === item.id_deporte && styles.selectedText
                  ]}>
                    {item.nombre_deporte}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id_deporte.toString()}
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
  welcomeText: {
    fontSize: 24,
    color: '#f08080',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 20, // Aumentar tamaño de fuente
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center', // Centrar texto
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
    justifyContent: 'center', // Centrar categorías
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryText: {
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  selectedText: {
    color: 'red',
  },
  sportItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  selectedSport: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  sportText: {
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
});
