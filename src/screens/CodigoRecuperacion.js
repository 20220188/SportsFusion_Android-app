import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function CodigoRecuperacion({ route, navigation }) {

  const ip = Constantes.IP;
   // Estado para almacenar el PIN ingresado por el usuario
   const [pin, setPin] = useState('');
   // Extraer el email de los parámetros de la ruta
   const { email } = route.params;
 
   // Función para manejar la verificación del PIN
   const handleVerifyPin = async () => {
     try {
       // Verificar que el PIN no esté vacío
       if (!pin.trim()) {
         Alert.alert('Error', 'Por favor, ingresa el PIN.');
         return;
       }
 
       // Realizar una solicitud POST al servidor para verificar el PIN
       const response =  await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=verificarPin`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: `correo=${email}&pin=${pin}`,
       });
 
       const data = await response.json();
 
       if (data.status === 1) {
         // Si el PIN es válido, mostrar una alerta de éxito y navegar a la pantalla de nueva contraseña
         Alert.alert('Éxito', 'PIN verificado correctamente', [
           { text: 'OK', onPress: () => navigation.navigate('CambiarContra', { id_cliente: data.id_cliente, email: email }) }
         ]);
       } else {
         // Si el PIN no es válido, mostrar una alerta
         Alert.alert('Error', data.error || 'PIN inválido o expirado');
       }
     } catch (error) {
       // Mostrar una alerta en caso de error de conexión
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
        
        
        <TextInput
        style={styles.input}
        placeholder="Ingrese el PIN"
        onChangeText={text => setPin(text)}
        value={pin}
        keyboardType="numeric"
      />

        <TouchableOpacity style={styles.button} onPress={handleVerifyPin}>
          <Text style={{ color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Verificar PIN</Text>
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
    marginBottom: 30, // Ajusta este valor para el espacio deseado
  },
  brandHighlight: {
    color: '#FFA500',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#007BFF',
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  createAccount: {
    color: '#007BFF',
  },
  loginButton: {
    color: '#FFFFFF',
    backgroundColor: '#FFC600',
    width: '100%',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    fontFamily: 'Poppins_700Bold',
  },
});
