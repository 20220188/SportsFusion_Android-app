import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono({telefono, setTelefono}) {
    return (
            <TextInputMask
                style={styles.Input}
                placeholder="Teléfono"
                placeholderTextColor="#000000"
                type={'custom'}
                options={{
                    mask: '9999-9999' // Formato para el número de teléfono
                }}
                value={telefono}
                onChangeText={setTelefono}
            />
    );
}

const styles = StyleSheet.create({
    Input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontFamily: 'Poppins_400Regular',
        color: '#000000',
    },
  
  });