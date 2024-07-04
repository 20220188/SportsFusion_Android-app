import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Puedes elegir otros íconos como FontAwesome, MaterialIcons, etc.

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchText} placeholder="Buscar..." />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.sectionTitle}>Nuestras categorías</Text>
          <Image 
            source={{ uri: 'https://example.com/some-image.jpg' }} 
            style={styles.mainImage}
          />
        </View>
        <View style={styles.categoryList}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoryItems}>
            <View style={styles.categoryItem}>
              <Image source={require('../img/basket.jpg')} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Baloncesto</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image source={{ uri: 'https://example.com/futbol.jpg' }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Fútbol</Text>
            </View>
            <View style={styles.categoryItem}>
              <Image source={{ uri: 'https://example.com/voleibol.jpg' }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>Voleibol</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('VistaFutbol')}>
          <Icon name="home-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Carrito')}>
          <Icon name="cart-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Perfil')}>
          <Icon name="person-outline" size={25} color="#000" />
          <Text style={styles.tabText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 60,
    marginTop: 50,
  },
  searchText: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#f1f1f1',
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#f08080',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  mainImage: {
    width: '100%',
    height: width * 0.5, // Adjust height to maintain aspect ratio
    borderRadius: 10,
  },
  categoryList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
    width: 80,
    fontFamily: 'Poppins-Regular',
  },
  bottomTabContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#D9D9D9',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
  },
});
