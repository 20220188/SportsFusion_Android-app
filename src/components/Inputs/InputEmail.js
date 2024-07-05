
import { StyleSheet, TextInput, Platform} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000000'}
    onChangeText={setTextChange}
    keyboardType="email-address"
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