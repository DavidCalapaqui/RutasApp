import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { permissions } = useContext( PermissionsContext )

  if( permissions.locationStatus === 'unavailable' ){
    return <LoadingScreen></LoadingScreen>
  }

  return (
    <Stack.Navigator
      initialRouteName='PermissionsScreen'
      screenOptions={{
        headerShown:false, //mostar el header
        cardStyle: {
         backgroundColor:'white'
        }
      }}
    
    >
      {
        (permissions.locationStatus === 'granted')
        ? <Stack.Screen name="MapScreen" component={MapScreen} />
        : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }
      
    </Stack.Navigator>
  )
}
