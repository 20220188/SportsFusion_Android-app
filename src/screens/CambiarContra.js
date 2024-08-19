import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';
import { Ionicons } from '@expo/vector-icons';

export default function CambiarContra({ route, navigation }) {
  const ip = Constantes.IP;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id_cliente, email } = route.params; // Obtiene el id_cliente de los parámetros de la ruta

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
  
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
  
    try {

      const form = new FormData();
      console.log('Valor id cliente',id_cliente);
      form.append('id_cliente', id_cliente);
      form.append('nuevaClave', newPassword);
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=cambiarClaveConPin`, {
        method: 'POST',
        body: form,
      });
  
      const data = await response.json();
      console.log('Server Response:', data); // Imprime la respuesta del servidor
  
      if (data.status === 1) {
        Alert.alert('Éxito', 'Contraseña cambiada exitosamente', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Ocurrió un error al cambiar la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.circle2} />
        <View style={styles.circle1} />
        <Image source={require('../img/logoSF.png')} style={styles.logo} />
        <Text style={styles.title}>Código de recuperación</Text>
        <Text style={styles.brand}>Sports<Text style={styles.brandHighlight}>Fusion</Text></Text>
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Nueva contraseña"
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
            <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Confirmar nueva contraseña"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>

        <View style={styles.footer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  circle1: {
    position: 'absolute',
    top: -180,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 400,
    backgroundColor: '#FFEBB7',
  },
  circle2: {
    position: 'absolute',
    top: -200,
    right: -150,
    width: 400,
    height: 400,
    borderRadius: 400,
    backgroundColor: '#FFF2CC',
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  brandHighlight: {
    color: '#FFA500',
  },
  button: {
    backgroundColor: '#FFC600',
    width: '80%',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
});
