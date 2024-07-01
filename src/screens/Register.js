import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function Register({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.circle2} />
        <View style={styles.circle1} />
        <Image source={require('../img/logoSF.png')} style={styles.logo} />
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.brand}>Sports<Text style={styles.brandHighlight}>Fusion</Text></Text>
        
        <TextInput style={styles.input} placeholder="Nombre" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Alias" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry />
        
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#000000', textAlign: 'center', fontWeight: 'bold' }}>Registrarse</Text>
        </TouchableOpacity>
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
    fontFamily: 'Poppins_400Regular',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins_500Bold'
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold'
  },
  brandHighlight: {
    color: '#FFC600',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: 'Poppins_400Regular'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular'
  },
  loginButton: {
    backgroundColor: '#FFC600',
    width: '100%',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    fontFamily: 'Poppins_700Bold'
  },
  footer: {
    marginTop: 20,
    fontFamily: 'Poppins_400Bold'
  },
  createAccount: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold'
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
});
