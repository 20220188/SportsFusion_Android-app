import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';

export default function SelectProduct({
  ip, imagen, idProducto, nombre_producto, descripcion, precio, cantidad_disponible, accionBotonProducto
}) {
  const [cantidad, setCantidad] = useState('');

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/sportsfusion/api/images/productos/${imagen}` }}
          style={styles.imagen}
          resizeMode="contain"
          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        />
      </View>
      <Text style={styles.text}>{idProducto}</Text>
      <Text style={styles.textTitle}>{nombre_producto}</Text>
      <Text style={styles.text}>{descripcion}</Text>
      <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precio}</Text></Text>
      <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{cantidad_disponible} {(cantidad_disponible === 1) ? 'Unidad' : 'Unidades'}</Text></Text>
      <TouchableOpacity style={styles.button} onPress={accionBotonProducto}>
        <Text style={styles.buttonText}>Seleccionar Producto</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text>Ingresar Cantidad: </Text>
        <TextInput
          style={styles.input}
          value={cantidad}
          onChangeText={text => setCantidad(text)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '700'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#AF8260',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  imagen: {
    width: '65%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center', // Centrar imagen horizontalmente
  },
  textDentro: {
    fontWeight: '400'
  }
});
