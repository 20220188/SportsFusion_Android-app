import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as Constantes from '../../utils/constantes';

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, id_producto, cantidad, setCantidad }) => {

    const ip = Constantes.IP;

    const handleCreateDetail = async () => {
        
        try {
            if ((cantidad <= 0)) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else {
                const formData = new FormData();
                formData.append('idProducto', id_producto);
                formData.append('cantidadProducto', cantidad);
                console.log("formData", formData);

                const response = await fetch(`${ip}/sportfusion/api/services/public/pedido.php?action=createDetail`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log("data despues del response", data);
                if (data.status) {
                    Alert.alert('Datos Guardados correctamente');
                    cerrarModal(false);
                } else {
                    Alert.alert('Error', data.error);
                }
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al crear detalle');
        }
    };

    const handleCancelCarrito = () => {
        cerrarModal(false);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                cerrarModal(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{nombreProductoModal}</Text>
                    <Text style={styles.modalText}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidad}
                        onChangeText={text => setCantidad(text)}
                        keyboardType="numeric"
                        placeholder="Ingrese la cantidad"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCreateDetail}
                    >
                        <Text style={styles.buttonText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleCancelCarrito}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black semi-transparent background
    },
    modalView: {
        backgroundColor: '#ffffff', // White background
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: '#000000', // Black border color
        borderWidth: 1,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000', // Black text color
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff', // Blue background
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#ffffff', // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalCompra;
