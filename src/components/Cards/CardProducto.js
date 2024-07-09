import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductoCard = ({ ip, id_producto, nombre_producto, imagen, precio }) => {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productId}>ID: {id_producto}</Text>
      <Text style={styles.productName}>{nombre_producto}</Text>
      <Text style={styles.productPrice}>Precio: {precio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    width: width - 40, // Adjust width as needed
    maxWidth: 300, // Maximum width if needed
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productId: {
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  productName: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
  productPrice: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 5,
    color: '#f08080',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductoCard;
