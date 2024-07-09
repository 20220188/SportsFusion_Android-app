import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductoCard({ ip, id_producto, nombre_producto, imagen, precio }) {
    return (
        <View style={styles.productItems}>
            <View style={styles.productCard}>
                <View style={styles.productItem}>
                    <Image
                        source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.productId}>{id_producto}</Text>
                    <Text style={styles.productName}>{nombre_producto}</Text>
                    <Text style={styles.productPrice}>{precio}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productCard: {
        marginVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productId: {
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
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
    },
    categoryItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productItem: {
        alignItems: 'center',
    },
    productsList: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});
