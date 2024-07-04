import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {
    id: '1',
    name: 'Al-Nassr Jersey',
    price: '$65.99',
    rating: 4.3,
    reviews: 41,
    image: 'url_to_al_nassr_jersey_image', // replace with actual image URL
    trending: true,
  },
  {
    id: '2',
    name: 'Rolling Stone FC Barcelona',
    price: '$52',
    rating: 4.1,
    reviews: 87,
    image: 'url_to_rolling_stone_fc_barcelona_image', // replace with actual image URL
    trending: false,
  },
  {
    id: '3',
    name: 'Man United Jersey',
    price: '$59',
    rating: 4.3,
    reviews: 41,
    image: 'url_to_man_united_jersey_image', // replace with actual image URL
    trending: false,
  },
  {
    id: '4',
    name: 'PSG Jersey',
    price: '$60',
    rating: 4.8,
    reviews: 692,
    image: 'url_to_psg_jersey_image', // replace with actual image URL
    trending: true,
  },
];

const renderItem = ({ item }) => (
    <View style={styles.itemContainer} >
      {item.trending && <Text style={styles.trendingLabel}>Trending</Text>}
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewsText}>({item.reviews})</Text>
      </View>
    </View>
);

export default function VistaFutbol({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fútbol</Text>
        <Icon name="search-outline" size={24} color="black" />
      </View>
      <View style={styles.filters}>
        <Text style={styles.filterText} onPress={() => navigation.navigate('DetalleProducto')}>Popular</Text>
        <Text style={styles.filterText}>Hombre</Text>
        <Text style={styles.filterText}>Mujer</Text>
        <Text style={styles.filterText}>Retro</Text>
        <Text style={styles.filterText}>Deportes</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterText: {
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  itemName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  trendingLabel: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff6347',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    zIndex: 1,
  },
});


