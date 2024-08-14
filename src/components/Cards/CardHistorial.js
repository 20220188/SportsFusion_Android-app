// HistorialCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const fetchHistorial = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readHistorial`);
      const data = await response.json();
      if (data.dataset) {
        setPedido(data.dataset);
        setFilteredProducts(data.dataset);
      } else {
        Alert.alert('Error', 'Ocurrió un error al obtener las compras');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener las compras');
    }
  };

export default function HistorialCard({ ip, id_detalle_producto, id_producto, nombre_producto, imagen, precio, onPress }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_pedido}</Text>
      <Text style={styles.itemText}>Fecha: {item.fecha_pedido}</Text>
      <Image 
        source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <TouchableOpacity style={styles.modifyButton}
        onPress={() => {
          setNewQuantity(item.cantidad_producto ? item.cantidad_producto.toString() : '');
          setUpdateModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Agregar Valoración</Text>
      </TouchableOpacity>

      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Valoración</Text>
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
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    width: 150,
    borderRadius: 10,
    resizeMode: 'stretch',
    marginLeft: 85
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 14,
    color: '#f08080',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});
