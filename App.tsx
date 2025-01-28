import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screen/login';
import Dashboard from './src/screen/dashboard';
import Form from './src/components/form';
import Active from './src/screen/active';
import Expire from './src/screen/expire';
import CustomerDetails from './src/screen/customerDetails';


const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Active" component={Active} />
        <Stack.Screen name="Expire" component={Expire} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;