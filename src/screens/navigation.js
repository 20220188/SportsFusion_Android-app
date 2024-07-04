import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importar las pantallas
import Register from './Register';
import Login from './Login';
import RecuContra from './RecuperarContraseña';
import CodigoRecu from './CodigoRecuperacion';
import CambiarCont from './CambiarContra';
import Dashboard from './Dashboard';
import VistaFutbol from './VistaFutbol';
import DetalleProducto from './DetalleProducto';
import Perfil from './Perfil';
import Carrito from './Carrito';


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
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="VistaFutbol" component={VistaFutbol} options={{ headerShown: false }} />
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
