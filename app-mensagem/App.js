import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
// import ChatScreen from './src/screens/ChatScreen'; // descomente quando criar a ChatScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Contatos' }} />
        {/* <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params.contatoNome })} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
