import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, Modal, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import HistorialCard from '../components/Cards/CardHistorial';
import * as Constantes from '../utils/constantes';
import { AirbnbRating } from 'react-native-ratings';

export default function Historial({ navigation }) {
  const ip = Constantes.IP;
  const [dataHistorialCompra, setDataHistorialCompra] = useState([]);
  const [detallesHistorial, setDetallesHistorial] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const getHistorialPedido = async () => {
    setLoading(true);
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

      if (data.status) {
        setDataHistorialCompra(data.dataset);
        data.dataset.forEach(async (item) => {
          await getDetallesHistorial(item.id_pedido);
        });
      }
    } catch (error) {
      console.error("Error al obtener el historial de pedidos", error);
      Alert.alert('Error', 'Ocurrió un error al listar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const getDetallesHistorial = async (id_pedido) => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readDetalleHistorialMovil`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idDetalle: id_pedido }),
      });

      const text = await response.text();
      console.log("Detalles Historial Response:", text); // Añadido para depuración
      const data = JSON.parse(text);

      if (data.status) {
        setDetallesHistorial((prevDetalles) => ({
          ...prevDetalles,
          [id_pedido]: data.dataset,
        }));
      }
    } catch (error) {
      console.error("Error al obtener detalles del historial:", error);
      Alert.alert('Error', 'Ocurrió un error al obtener los detalles del pedido');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getHistorialPedido();
    }, [])
  );

  const handleValoracion = (id_pedido, nombre_producto) => {
    setSelectedProduct({ id_pedido, nombre_producto });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('Comentario', comment);
      formData.append('Valoracion', rating);
      formData.append('idDetalle', selectedProduct.id_pedido);
      
     
      const url = (`${ip}/sportfusion/api/services/public/valoracion.php?action=createRowValoracionMovil`);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Submit Valoracion Response:", data); // Añadido para depuración

      if (data.status) {
        Alert.alert('Gracias', 'Tu valoración ha sido enviada.');
        setModalVisible(false);
        setRating(0);
        setComment('');
      } else {
        Alert.alert('Error', 'No se pudo enviar la valoración');
      }
    } catch (error) {
      console.error('Error al enviar la valoración:', error);
      Alert.alert('Error', 'Ocurrió un error al enviar la valoración');
    }
  };

  const renderItem = (item) => {
    const productos = detallesHistorial[item.id_pedido];
    const subtotal = productos?.reduce((total, detalle) => total + (detalle.precio_pedido * detalle.cantidad_pedido), 0);
    
    return (
      <View key={item.id_pedido} style={styles.historialContainer}>
        {productos && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Detalles del Pedido</Text>
            <HistorialCard fecha_registro={item.fecha_registro} />
            {productos.map((detalle, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.productName}>Producto: {detalle.nombre_producto}</Text>
                <Text style={styles.productDetail}>Cantidad de compra: {detalle.cantidad_pedido}</Text>
                <Text style={styles.productDetail}>Precio unitario: {detalle.precio_pedido}</Text>
                <Text style={styles.productDetail}>Precio de compra: {detalle.precio_pedido * detalle.cantidad_pedido}</Text>
                <Image
                  source={{ uri: `${ip}/sportfusion/api/images/productos/${detalle.imagen}` }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.valorarButton}
                  onPress={() => handleValoracion(item.id_pedido, detalle.nombre_producto)}
                >
                  <Text style={styles.valorarButtonText}>Valorar producto</Text>
                </TouchableOpacity>
              </View>
            ))}
            <Text style={styles.subtotalText}>Subtotal: {subtotal}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perfil')}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {dataHistorialCompra.map((item) => renderItem(item))}
          {dataHistorialCompra.length === 0 && (
            <Text style={styles.noDataText}>No hay datos de historial disponibles.</Text>
          )}
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Valorar Producto</Text>
            {selectedProduct && (
              <>
                <Text style={styles.modalProduct}>Producto: {selectedProduct.nombre_producto}</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={30}
                  onFinishRating={setRating}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Escribe tu comentario aquí..."
                  value={comment}
                  onChangeText={setComment}
                  multiline={true}
                  numberOfLines={4}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Enviar Valoración</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollView: {
    padding: 16,
    paddingTop: 90,
  },
  historialContainer: {
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetail: {
    fontSize: 14,
    color: '#555',
  },
  productImage: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  valorarButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  valorarButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

