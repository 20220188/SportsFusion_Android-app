import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function Perfil({ navigation }) {
  const ip = Constantes.IP;

  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataHistorialCompra, setDataHistorialCompra] = useState([]);

  const getHistorialPedido = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=readHistorial`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, "Data desde getHistorialPedido");
      if (data.status) {
        setDataHistorialCompra(data.dataset);
      } else {
        console.log("No hay detalles del historial disponibles");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar las categorias');
    }
  };

  // Función para obtener y mostrar el perfil del usuario
  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=readProfile`);
      const data = await response.json();

      if (data.status) {
        setNombre(data.dataset.nombre_cliente);
        setCorreo(data.dataset.correo_cliente);
        setTelefono(data.dataset.telefono_cliente);
        setDireccion(data.dataset.dirección_cliente);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el perfil');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los detalles del perfil al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    React.useCallback(() => {
      validarSesion();
    }, [])
  );

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        console.log("Sesión Finalizada");
        Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente', [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login') // Navegar a la pantalla de inicio de sesión
          }
        ]);
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  // Función para manejar la actualización de los datos del perfil
  const handleEditProfile = async () => {
    try {
      const formData = new FormData();

      formData.append('nombreclientePerfil', nombre);
      formData.append('correoclientePerfil', correo);
      formData.append('telefonoclientePerfil', telefono);
      formData.append('direccionclientePerfil', direccion);
     
      const url = (`${ip}/sportfusion/api/services/public/cliente.php?action=editProfile`);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
        setModalVisible(false); // Cerrar el modal
      } else {
        Alert.alert('Error', 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
    }
  };

  const handleSaveProfile = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
        
      <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perfil')}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://example.com/profile-pic-url' }} // Reemplaza con la URL de la imagen de perfil
            style={styles.profilePic}
          />
          
          <View style={styles.infoContainer}>
            <View style={styles.nameAndEditContainer}>
              
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Image
                source={{ uri: 'https://example.com/profile-pic-url' }} // Reemplaza con la URL de la imagen de perfil
                style={styles.modalProfilePic}
              />
              <TouchableOpacity style={styles.chooseButton}>
                <Text style={styles.chooseButtonText}>Escoger</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar perfil</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
              />
          
              <TouchableOpacity style={styles.confirmButton} onPress={handleEditProfile}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  
  backButton: {
    position: 'absolute',
    top: 50, // Ajuste para evitar la superposición con el panel de control
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    color: '#777',
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
  },
  nameAndEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    marginLeft: 8,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 120,
    backgroundColor: 'red',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalProfilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  chooseButton: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FF69B4',
  },
  chooseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    fontSize: 16,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#FF69B4',
    fontSize: 16,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#000',
  },
});
