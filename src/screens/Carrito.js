import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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
    padding: wp('5%'),
  },
  header: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  image: {
    width: wp('15%'),
    height: wp('15%'),
    marginRight: wp('5%'),
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  price: {
    fontSize: hp('2%'),
    color: '#888',
    marginBottom: hp('1%'),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: wp('2%'),
    fontSize: hp('2%'),
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: wp('1%'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  total: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#000',
  },
});

export default ShoppingCart;
