import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#FFC600',
        width: '100%',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        fontFamily: 'Poppins_400Bold'
    },
    buttonText: {
        textAlign: 'center',
        color: "#000000", fontWeight: '800',
    }
});