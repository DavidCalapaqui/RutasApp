import React from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const HomeScreen = () => {
  return (
    <View>
        <Icon 
            name='home'
            size={100}
        />
        <Text>Home</Text>
    </View>
  )
}
