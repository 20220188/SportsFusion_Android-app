import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function RecuperarContraseñas({ navigation }) {
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
        
        <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" />

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('CodigoRecu')}>
          <Text style={{ color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Enviar</Text>
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
