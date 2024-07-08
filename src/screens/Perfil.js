import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons';

export default function Perfil({ navigation }) {

  const ip = Constantes.IP;

  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(true);

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
        setClave(data.dataset.clave);
        setConfirmarClave(data.dataset.confirmarClave);
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

  // Función para manejar la actualización de los datos del perfil
  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('Nombre', nombre);
      formData.append('Correo', correo);
      formData.append('Teléfono', telefono);
      formData.append('Dirección', direccion);
     

      const url = (`${ip}/sportfusion/api/services/public/cliente.php?action=editProfile`);
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados exitosamente');
      formData.append('Confirmar contraseña', confirmarClave);
        initialState.current = { nombre, correo, telefono, direccion, }; // Actualiza el estado inicial
      } else {
        Alert.alert('Error', 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
    }
    setModalVisible(true);
  };


  const handleSaveProfile = () => {
    if (clave !== confirmarClave) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    // Aquí puedes agregar lógica para guardar los datos editados
    // Por ejemplo, puedes enviar los datos a un servidor
    setModalVisible(false);
    Alert.alert("Perfil actualizado", "Tus datos han sido actualizados.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://example.com/profile-pic-url' }} // Reemplaza con la URL de la imagen de perfil
          style={styles.profilePic}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.infoText}
            value={nombre}
            editable={false}
          />
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.infoText}
            value={correo}
            editable={false}
          />
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.infoText}
            value={telefono}
            editable={false}
          />
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.infoText}
            value={direccion}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.likesContainer}>
        <Text style={styles.likesTitle}>Tus me gustas</Text>
        <View style={styles.itemsContainer}>
          <View style={styles.item}>
            <Image
              source={{ uri: 'https://example.com/bvb-jersey-url' }} // Reemplaza con la URL de la imagen de la camiseta
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>BVB Jersey</Text>
            <Text style={styles.itemSubText}>Mán. 2024/25</Text>
          </View>
          <View style={styles.item}>
            <Image
              source={{ uri: 'https://example.com/chelsea-jersey-url' }} // Reemplaza con la URL de la imagen de la camiseta
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>Chelsea Jersey</Text>
            <Text style={styles.itemSubText}>Mán. 2024/25</Text>
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
        
            <TouchableOpacity style={styles.confirmButton} onPress={handleSaveProfile}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
  editButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 32,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
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
  likesContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  likesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    width: '48%',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubText: {
    color: '#777',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalProfilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  chooseButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  chooseButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#1E90FF',
    fontSize: 16,
  },
});
