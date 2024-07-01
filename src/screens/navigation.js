import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Register';
import Login from './Login';
import RecuContra from './RecuperarContraseña';
import CodigoRecu from './CodigoRecuperacion';
import CambiarCont from './CambiarContra';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="RecuContra" component={RecuContra} options={{ headerShown: false }} />
        <Stack.Screen name="CodigoRecu" component={CodigoRecu} options={{ headerShown: false }} />
        <Stack.Screen name="CambiarCont" component={CambiarCont} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
