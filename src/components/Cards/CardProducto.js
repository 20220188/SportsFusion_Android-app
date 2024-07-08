import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ProductoCard({ ip, id_producto, nombre_producto, imagen, precio }) {
    return (
        <View style={styles.productCard}>
            <Image
                source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }}
                style={styles.productImage}
                resizeMode="contain"
            />
            <Text style={styles.productId}>{id_producto}</Text>
            <Text style={styles.productName}>{nombre_producto}</Text>
            <Text style={styles.productPrice}>{precio}</Text>
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
});
