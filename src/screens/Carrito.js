import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Constantes from '../utils/constantes';
import CarritoCard from '../components/Cards/CardCarrito';

// Importa la imagen aquí
import emptyCartImage from '../img/carrito.png'; // Asegúrate de que la ruta sea correcta

const Carrito = ({ navigation }) => {
  const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
  const [idDetalle, setIdDetalle] = useState(null);
  const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const ip = Constantes.IP;

  const backProducts = () => {
    navigation.navigate('Dashboard');
  };

  useFocusEffect(
    React.useCallback(() => {
      getDetalleCarrito();
    }, [])
  );

  const getDetalleCarrito = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, "Data desde getDetalleCarrito");
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay items en el carrito disponibles");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };
  

  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=finishOrder`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setDataDetalleCarrito([]);
        navigation.navigate({ screen: 'Dashboard' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (status) {
      Alert.alert("Se finalizó la compra correctamente");
    }
  };

  const updateDetalleCarrito = async (idDetalle, nuevaCantidad) => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert('Actualización', 'El detalle se actualizó correctamente');
        getDetalleCarrito(); // Actualiza la lista de detalles del carrito después de la actualización
      } else {
        Alert.alert('Error', 'Ocurrió un error al actualizar el detalle');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el detalle');
    }
  };

  const handleEditarDetalle = (idDetalle, existenciasProducto) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoCarrito(existenciasProducto);
  };

  const renderItem = ({ item }) => (
    <CarritoCard
      item={item}
      imagen={item.imagen}
      cargarCategorias={getDetalleCarrito}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadProductoCarrito={setCantidadProductoCarrito}
      cantidadProductoCarrito={cantidadProductoCarrito}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle}
      getDetalleCarrito={getDetalleCarrito}
      updateDataDetalleCarrito={setDataDetalleCarrito}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Carrito de Compras</Text>

      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image source={emptyCartImage} style={styles.emptyCartImage} />
          <Text style={styles.titleDetalle}>No hay items en el carrito.</Text>
        </View>
      )}

      {dataDetalleCarrito.length > 0 && (
        <TouchableOpacity
          onPress={finalizarPedido}
          style={styles.finalizarButton}
        >
          <Text style={styles.buttonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      )}

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
};

export default Carrito;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: Constants.statusBarHeight + 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000000',
  },
  titleDetalle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 100,
    paddingTop: 20,
  },
  finalizarButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
