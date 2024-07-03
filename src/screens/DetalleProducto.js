import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetailScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image
        source={{ uri: 'url_to_man_city_jersey_image' }} // replace with actual image URL
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Man City Jersey</Text>
        <Text style={styles.productCategory}>Men • 2024/25</Text>
        <Text style={styles.sectionTitle}>Tallas</Text>
        <Text style={styles.productSizes}>XS – S – M – L – XL</Text>
        <Text style={styles.sectionTitle}>Precio</Text>
        <Text style={styles.productPrice}>$7.500</Text>
        <Text style={styles.sectionTitle}>Información:</Text>
        <Text style={styles.productDescription}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Carrito</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="heart-outline" size={24} color="#f00" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 16,
    color: '#888',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  productSizes: {
    fontSize: 16,
    color: '#000',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  cartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  cartButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 270,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
  },
});

export default ProductDetailScreen;
