import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const ShoppingCart = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Carrito de compras</Text>

      <View style={styles.item}>
        <Image source={{ uri: 'https://link_a_imagen_jersey_1' }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>Real Madrid Jersey</Text>
          <Text style={styles.price}>$65.99</Text>
          <View style={styles.quantityContainer}>
            <Button icon={<Icon name="minus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
            <Text style={styles.quantity}>01</Text>
            <Button icon={<Icon name="plus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="close" type="font-awesome" />
        </TouchableOpacity>
      </View>

      {/* Repetir para cada artículo */}
      <View style={styles.item}>
        <Image source={{ uri: 'https://link_a_imagen_jersey_2' }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>Real Madrid Jersey</Text>
          <Text style={styles.price}>$55.00</Text>
          <View style={styles.quantityContainer}>
            <Button icon={<Icon name="minus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
            <Text style={styles.quantity}>01</Text>
            <Button icon={<Icon name="plus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="close" type="font-awesome" />
        </TouchableOpacity>
      </View>

      {/* Repetir para cada artículo */}
      <View style={styles.item}>
        <Image source={{ uri: 'https://link_a_imagen_jersey_3' }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>Celtics Jersey</Text>
          <Text style={styles.price}>$50.00</Text>
          <View style={styles.quantityContainer}>
            <Button icon={<Icon name="minus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
            <Text style={styles.quantity}>01</Text>
            <Button icon={<Icon name="plus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="close" type="font-awesome" />
        </TouchableOpacity>
      </View>

      {/* Repetir para cada artículo */}
      <View style={styles.item}>
        <Image source={{ uri: 'https://link_a_imagen_jersey_4' }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>Golden State Warriors</Text>
          <Text style={styles.price}>$65.99</Text>
          <View style={styles.quantityContainer}>
            <Button icon={<Icon name="minus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
            <Text style={styles.quantity}>01</Text>
            <Button icon={<Icon name="plus" type="font-awesome" />} buttonStyle={styles.quantityButton} />
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="close" type="font-awesome" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: $95.00</Text>
        <Button title="Pagar" buttonStyle={styles.payButton} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#000',
  },
});

export default ShoppingCart;