import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Constantes from '../utils/constantes';
import CarritoCard from '../components/Cards/CardCarrito';

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
        console.log("No hay detalles del carrito disponibles");
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
        Alert.alert("Se finalizó la compra correctamente");
        setDataDetalleCarrito([]);
        navigation.navigate('TabNavigator', { screen: 'Dashboard' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
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
        <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
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
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight + 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  titleDetalle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
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
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
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
});
