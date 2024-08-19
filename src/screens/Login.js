import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons';

export default function LoginScreen({ navigation }) {

    const  ip = Constantes.IP;

    const [isContra, setIsContra] = React.useState(true);
    const [usuario, setUsuario] = React.useState('');
    const [contrasenia, setContrasenia] = React.useState('');


    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
  
      const data = await response.json();
  
      if (data.status === 1) {
        navigation.navigate('Dashboard');
        console.log("Se ingresa con la sesión activa")
      } else {
        console.log("No hay sesión activa")
        return
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  }

  

  const handlerLogin = async () => {
    if (!usuario || !contrasenia) {
      Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('correoCliente', usuario);
      formData.append('claveCliente', contrasenia);

      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('')
        setUsuario('')
        navigation.navigate('Dashboard');
      } else {
        console.log(data);
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('Register');
  };

  const login = async () => {
    handlerLogin();
  }

  useEffect(() => { validarSesion() }, [])


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>

        
        <View style={styles.circle2} />
        <View style={styles.circle1} />
        <Image source={require('../img/logoSF.png')} style={styles.logo} />
        <Text style={styles.title}>Inicia sesión</Text>
        <Text style={styles.brand}>Sports<Text style={styles.brandHighlight}>Fusion</Text></Text>
        
        <InputEmail
        placeHolder='Correo'
        setValor={usuario}
        setTextChange={setUsuario}
      />
      <Input
        placeHolder='Contraseña'
        setValor={contrasenia}
        setTextChange={setContrasenia}
        contra={isContra} />

        <TouchableOpacity onPress={() => navigation.navigate('RecuContra')}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        <Buttons
        textoBoton='Iniciar Sesión'
        accionBoton={login} />

        <View style={styles.footer} />
        <TouchableOpacity onPress={irRegistrar}>
          <Text style={styles.text}>¿No tienes una cuenta? <Text style={styles.createAccount}>Crea una</Text></Text>
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
  text:{
    color: '#636363',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular'
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
  },
  forgotPassword: {
    alignSelf: 'baseline',
    color: '#636363',
    fontWeight: '600',
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  createAccount: {
    color: '#FFA500',
    fontWeight: '600',
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
