import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';

const App = () => {
  return (
    //Se puede envolver en cualquier provider que se necesite
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>

    
  )
}

export default App;
