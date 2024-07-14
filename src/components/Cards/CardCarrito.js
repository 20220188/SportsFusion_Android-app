import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert, Modal, TextInput, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';

const CarritoCard = ({
  item, imagen_producto, updateDataDetalleCarrito
}) => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newQuantity, setNewQuantity] = useState('');

  const ip = Constantes.IP;

  const handleDeleteDetalleCarrito = async (idDetalle) => {
    try {
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
                body: formData,
              });
              const data = await response.json();
              console.log('Response data:', data);
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                updateDataDetalleCarrito(prevData => {
                  const updatedData = prevData.filter(item => item.id_detalle !== idDetalle);
                  console.log('Updated data:', updatedData);
                  return updatedData;
                });
              } else {
                Alert.alert('Error al eliminar del carrito', data.error || 'No se pudo eliminar el elemento.');
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

  const handleUpdateDetalleCarrito = async (idDetalle, newQuantity) => {
  try {
    const formData = new FormData();
    formData.append('idDetalle', idDetalle);
    formData.append('cantidadProducto', newQuantity);

    const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=updateDetail`, {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON, but received: ${text}`);
    }

    const data = await response.json();
    if (data.status) {
      Alert.alert('Cantidad actualizada correctamente');
      updateDataDetalleCarrito(prevData => {
        const updatedData = prevData.map(item => {
          if (item.id_detalle === idDetalle) {
            return { ...item, cantidad_producto: newQuantity };
          }
          return item;
        });
        return updatedData;
      });
      setUpdateModalVisible(false);
    } else {
      Alert.alert('Error al actualizar cantidad', data.error || 'No se pudo actualizar la cantidad.');
    }
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    Alert.alert('Error al actualizar cantidad', error.message);
  }
};


  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_pedido}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_pedido}</Text>
      <TouchableOpacity style={styles.modifyButton}
        onPress={() => {
          setNewQuantity(item.cantidad_producto ? item.cantidad_producto.toString() : '');
          setUpdateModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Modificar Cantidad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton}
        onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}
      >
        <Text style={styles.buttonText}>Eliminar del carrito</Text>
      </TouchableOpacity>

      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modificar Cantidad</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={newQuantity}
              onChangeText={setNewQuantity}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleUpdateDetalleCarrito(item.id_detalle, newQuantity)}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
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
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  }
});
