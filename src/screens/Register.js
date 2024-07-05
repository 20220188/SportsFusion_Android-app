import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform , Alert} from 'react-native';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import Input from '../components/Inputs/inputs';
import InputEmail from '../components/Inputs/InputEmail';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Botones/Buttons';



export default function Register({ navigation }) {

  const ip = Constantes.IP;

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('')
  const [direccion, setDireccion] = useState('');

  const telefonoRegex = /^\d{4}-\d{4}$/;

  const handleLogout = async () => {
    /*
            try {
                const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
                    method: 'GET'
                });
    
                const data = await response.json();
    
                if (data.status) {
                    navigation.navigate('Sesion');
                } else {
                    console.log(data);
                    // Alert the user about the error
                    Alert.alert('Error', data.error);
                }
            } catch (error) {
                console.error(error, "Error desde Catch");
                Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
            } */
    navigation.navigate('Login');
};

const handleCreate = async () => {
  try {

// Calcular la fecha mínima permitida (18 años atrás desde la fecha actual)
const fechaMinima = new Date();
fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
      // Validar los campos
      if (!nombre.trim() || !correo.trim() || !direccion.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
          Alert.alert("Debes llenar todos los campos");
          return;
      } else if (!telefonoRegex.test(telefono)) {
          Alert.alert("El teléfono debe tener el formato correcto (####-####)");
          return;
}

      // Si todos los campos son válidos, proceder con la creación del usuario
      const formData = new FormData();
      formData.append('nombreCliente', nombre);
      formData.append('correoCliente', correo);
      formData.append('direccionCliente', direccion);
      formData.append('telefonoCliente', telefono);
      formData.append('claveCliente', clave);
      formData.append('confirmarClave', confirmarClave);

      const response = await fetch(`${ip}/sportfusion/api/services/public/cliente.php?action=signUpMovil`, {
          method: 'POST',
          body: formData
      });

      const data = await response.json();
      if (data.status) {
          Alert.alert('Datos Guardados correctamente');
          navigation.navigate('Login');
      } else {
          Alert.alert('Error', data.error);
      }
  } catch (error) {
      Alert.alert('Ocurrió un error al intentar crear el usuario');
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
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.brand}>Sports<Text style={styles.brandHighlight}>Fusion</Text></Text>
        
        <Input
         placeHolder='Nombre Cliente'
         setValor={nombre}
         setTextChange={setNombre}
          />

        <InputEmail
          placeHolder='Email Cliente'
          setValor={correo}
          setTextChange={setCorreo} /> 
          
        <MaskedInputTelefono
          telefono={telefono}
          setTelefono={setTelefono} />

        <InputMultiline
          placeHolder='Dirección Cliente'
          setValor={setDireccion}
          valor={direccion}
          setTextChange={setDireccion} />

        <Input
          placeHolder='Clave'
          contra={true}
          setValor={clave}
          setTextChange={setClave} />

        <Input
          placeHolder='Confirmar Clave'
          contra={true}
          setValor={confirmarClave}
          setTextChange={setConfirmarClave} />
        
        <Buttons
          textoBoton='Registrar Usuario'
          accionBoton={handleCreate}
                />
<View style={styles.footer} />
  <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>¿Ya tienes una cuenta?<Text style={styles.brandHighlight}> Inicia sesión</Text></Text>
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
  text:{
    color: '#636363',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular'
  },
  textHighlight: {
    color: '#FFC600',
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
    color: '#FFA500',
    fontWeight: '600',
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
})
