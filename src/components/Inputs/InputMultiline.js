
import { StyleSheet, Platform, TextInput} from 'react-native';

export default function InputMultiline({placeHolder, setValor, contra, valor}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={valor}
    onChangeText={setValor}
    placeholderTextColor={'#000000'}
    secureTextEntry={contra} 
    multiline={true}
    numberOfLines={4}
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
    marginVertical: 10,
  },

});