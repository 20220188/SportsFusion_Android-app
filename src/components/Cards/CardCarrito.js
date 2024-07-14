import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';

const CarritoCard = ({item, cargarCategorias, 
  modalVisible,
  setModalVisible,
  cantidadProductoCarrito,
  setCantidadProductoCarrito, 
  accionBotonDetalle,
  precio_pedido,
  idDetalle,
  setIdDetalle, getDetalleCarrito, updateDataDetalleCarrito}) => {

    const ip = Constantes.IP;
    
    const handleDeleteDetalleCarrito = async (idDetalle) => {
      try {
        // Mostrar un mensaje de confirmación antes de eliminar
        Alert.alert(
          'Confirmación',
          '¿Estás seguro de que deseas eliminar este elemento del carrito?',
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Eliminar',
              onPress: async () => {
                console.log('Eliminando detalle del carrito con ID:', idDetalle);
                const formData = new FormData();
                formData.append('idDetalle', idDetalle);
                console.log('FormData:', formData);
                const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=deleteDetail`, {
                  method: 'POST',
                  body: formData
                });
                const data = await response.json();
                console.log('Response data:', data);
                if (data.status) {
                  Alert.alert('Datos eliminados correctamente del carrito');
                  // Llamar a la función de actualización para actualizar la lista
                  updateDataDetalleCarrito(prevData => {
                    const updatedData = prevData.filter(item => item.id_detalle !== idDetalle);
                    console.log('Updated data:', updatedData);
                    return updatedData;
                  });
                } else {
                  Alert.alert('Error al eliminar del carrito', data.error);
                }
              }
            }
          ]
        );
      } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        Alert.alert("Error al eliminar del carrito");
      }
    };
     
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_pedido}</Text>
      <TouchableOpacity style={styles.modifyButton}
        onPress={()=>accionBotonDetalle(item.id_detalle, item.cantidad_producto)}
      >
        <Text style={styles.buttonText}>Modificar Cantidad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}
        onLongPress={()=>handleDeleteDetalleCarrito(item.id_detalle)}
      >
        <Text style={styles.buttonText}>Eliminar del carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarritoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E', // Brown color for the title
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff', // Light brown color for modify button
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'red', // Darker orange color for delete button
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: '#A0522D', // Sienna color for final action buttons
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButtons:{
    justifyContent:'center',
    alignItems:'center', 
  }
});
