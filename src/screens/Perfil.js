import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Button } from 'react-native';

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [alias, setAlias] = useState('');
  const [name, setName] = useState('Kevin Rodriguez');
  const [email, setEmail] = useState('kevin@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = () => {
    setModalVisible(false);
    // Aquí puedes agregar lógica para guardar los datos editados
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
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.infoText}
            value={email}
            onChangeText={setEmail}
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
              placeholder="Alias"
              value={alias}
              onChangeText={setAlias}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
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
