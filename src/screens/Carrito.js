// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Botones/Buttons';
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
      const response = await fetch(`${ip}/SportFusion/api/services/public/pedido.php?action=readDetail`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, "Data desde getDetalleCarrito")
      if (data.status) {
        setDataDetalleCarrito(data.dataset);
      } else {
        console.log("No hay detalles del carrito disponibles")
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };

  const finalizarPedido = async () => {
    try {
      const response = await fetch(`${ip}/SportFusion/api/services/public/pedido.php?action=finishOrder`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        Alert.alert("Se finalizó la compra correctamente")
        setDataDetalleCarrito([]);
        navigation.navigate('TabNavigator', { screen: 'Productos' });
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al finalizar pedido');
    }
  };

  const handleEditarDetalle = (idDetalle, existenciasProducto) => {
    setModalVisible(true);
    setIdDetalle(idProducto);
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
      

      <Text style={styles.title}>Carrito de Compras</Text>

      {dataDetalleCarrito.length > 0 ? (
        <FlatList
          data={dataDetalleCarrito}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
          contentContainerStyle={styles.flatListContent} // Estilo para la lista
        />
      ) : (
        <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
      )}

      <View style={styles.containerButtons}>
        {dataDetalleCarrito.length > 0 && (
          <Buttons
            textoBoton='Finalizar Pedido'
            accionBoton={finalizarPedido}
            buttonStyle={styles.button} // Estilo para el botón
            textStyle={styles.buttonText} // Estilo para el texto del botón
          />
        )}
        <Buttons
          textoBoton='Regresar a productos'
          accionBoton={backProducts}
          buttonStyle={styles.button} // Estilo para el botón
          textStyle={styles.buttonText} // Estilo para el texto del botón
        />
      </View>
      
    </View>
  );
};

export default Carrito;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight + 40, // Ajusta el paddingTop para mover el contenido hacia abajo
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
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#5C3D2E',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContent: {
    paddingBottom: 100, // Ajusta el espacio inferior del contenido de la lista
    paddingTop: 20, // Espacio superior dentro de la lista para mover el contenido hacia abajo
  },
});
