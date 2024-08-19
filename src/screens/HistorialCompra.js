import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import HistorialCard from '../components/Cards/CardHistorial'; // Asegúrate de que este componente está bien implementado
import * as Constantes from '../utils/constantes'; // Asegúrate de que tienes este archivo y que contiene la IP correcta

export default function Historial({ navigation }) {
  const ip = Constantes.IP; // Asegúrate de que este valor es correcto
  const [dataHistorialCompra, setDataHistorialCompra] = useState([]);
  const [selectedHistorial, setSelectedHistorial] = useState(null);
  const [detallesHistorial, setDetallesHistorial] = useState(null);

  // Función para obtener el historial de compras
  const getHistorialPedido = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readHistorial`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "Data desde getHistorialPedido"); // <-- Log importante

      if (data.status) {
        setDataHistorialCompra(data.dataset);
        console.log("Historial cargado correctamente:", data.dataset); // <-- Log importante
      } else {
        console.log("No hay detalles del historial disponibles");
      }
    } catch (error) {
      console.error("Error al obtener el historial de pedidos", error);
      Alert.alert('Error', 'Ocurrió un error al listar los pedidos');
    }
  };

  // Función para obtener los detalles del historial
  const getDetallesHistorial = async (idPedido) => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readDetalleHistorial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPedido }),
      });

      const data = await response.json();
      console.log(data, "Detalles recibidos"); // <-- Log importante

      if (data.status) {
        setDetallesHistorial(data.dataset);
        console.log("Detalles del pedido cargados:", data.dataset); // <-- Log importante
      } else {
        console.log("No hay detalles del historial disponibles");
      }
    } catch (error) {
      console.error("Error al obtener detalles del historial", error);
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del pedido');
    }
  };

  // Efecto para cargar los detalles al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    useCallback(() => {
      console.log("Cargando historial de pedidos..."); // <-- Log importante
      getHistorialPedido();
    }, [])
  );

  // Función para manejar el clic en un historial y obtener sus detalles
  const handleHistorialPress = (idPedido) => {
    console.log("Historial seleccionado con ID:", idPedido); // <-- Log corregido
    setSelectedHistorial(idPedido);
    getDetallesHistorial(idPedido);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perfil')}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {dataHistorialCompra.length > 0 ? (
          dataHistorialCompra.map((item) => (
            <HistorialCard
              key={item.id_detalle_producto}
              ip={ip}
              id_detalle_producto={item.id_detalle_producto}
              nombre_producto={item.nombre_producto}
              imagen={`${ip}/sportfusion/api/images/productos/${item.imagen}`} // Formando correctamente la URL de la imagen
              precio={item.precio}
              cantidad_pedido={item.cantidad_pedido}
              fecha_registro={item.fecha_registro}
              onPress={() => handleHistorialPress(item.id_detalle_producto)} // Enviando correctamente el ID
            />
          ))
        ) : (
          <Text>No hay datos de historial disponibles.</Text>
        )}
      </ScrollView>

      {selectedHistorial && detallesHistorial && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detalles del Pedido</Text>
          {detallesHistorial.map((detalle, index) => (
            <View key={index} style={styles.detailItem}>
              <Text>{detalle.nombreProducto}: {detalle.cantidad}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
