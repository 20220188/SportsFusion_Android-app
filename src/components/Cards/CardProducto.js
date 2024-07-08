import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductoCard({ ip, id_producto, nombre_producto, imagen }) {

    return (
        <View style={styles.categoryItems}>
            <View style={styles.categoryItem}>
                <Image
                    source={{ uri: `${ip}/sportfusion/api/images/productos/${imagen}` }}
                    style={styles.categoryImage}
                    resizeMode="contain" // Ajustar la imagen al contenedor
                />
                <Text style={styles.categoryTexttext}>{id_producto}</Text>
                <Text style={styles.categoryText}>{nombre_producto}</Text>
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
