import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductoCard from '../components/Cards/CardProducto'; // Importar el componente

export default function VistaFutbol({ navigation }) {
  const [productos, setProductos] = useState([]);
  const ip = Constantes.IP; // Define tu IP aquí
  
  useEffect(() => {
    // Fetch categorias desde la API
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${ip}/sportfusion/api/services/public/producto.php?action=readAllMovil`);
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

    fetchProductos();
  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fútbol</Text>
        <Icon name="search-outline" size={24} color="black" />
      </View>
      <View style={styles.filters}>
        <Text style={styles.filterText} onPress={() => navigation.navigate('DetalleProducto')}>Popular</Text>
        <Text style={styles.filterText}>Hombre</Text>
        <Text style={styles.filterText}>Mujer</Text>
        <Text style={styles.filterText}>Retro</Text>
        <Text style={styles.filterText}>Deportes</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterText: {
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  itemName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  trendingLabel: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff6347',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    zIndex: 1,
  },
});


