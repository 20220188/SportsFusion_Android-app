import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';

export default function RecuperarContraseñas({ navigation }) {

  const [email, setEmail] = useState('');
  const ip = Constantes.IP;
  
  // Función para manejar el proceso de recuperación de contraseña
  const handleRecovery = async () => {
    console.log("Iniciando proceso de recuperación"); // Log para saber que la función handleRecovery se ha ejecutado

    // Verifica que el campo de email no esté vacío
    if (!email.trim()) {
      console.log("Correo electrónico vacío"); // Log cuando el campo de correo está vacío
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      console.log(`Enviando solicitud POST a ${ip}`); // Log para ver a dónde se está enviando la solicitud
    
      // Realizar una solicitud POST al servidor para solicitar el PIN de recuperación
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=solicitarPinRecuperacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${email}`,
      });
    
      const responseText = await response.text(); // Obtener la respuesta como texto
      console.log("Respuesta recibida como texto:", responseText); // Log para ver el contenido completo de la respuesta
    
      // Intentar convertir la respuesta a JSON
      const data = JSON.parse(responseText);
    
      console.log("Datos recibidos:", data); // Log para ver el contenido de la respuesta procesada como JSON
    
      if (data.status === 1) {
        console.log("Solicitud exitosa, navegando a la pantalla de verificación de PIN"); // Log para confirmar el flujo correcto
        Alert.alert('Éxito', 'Se ha enviado un PIN a tu correo electrónico', [
          { text: 'OK', onPress: () => navigation.navigate('CodigoRecu', { email }) }
        ]);
      } else {
        console.log("Error en la solicitud:", data.error); // Log para ver el error devuelto por el backend
        Alert.alert('Error', data.error || 'Ocurrió un error al solicitar el PIN');
      }
    } catch (error) {
      console.log("Error de conexión:", error); // Log para detectar problemas de red o errores inesperados
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
        <Text style={styles.title}>Recuperación de contraseña</Text>
        <Text style={styles.brand}>Sports<Text style={styles.brandHighlight}>Fusion</Text></Text>
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleRecovery}>
          <Text style={{ color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Enviar código de verificación</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Volver al inicio de sesión</Text>
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
  link: {
    color: '#007bff',
    fontSize: 16,
  },
});
