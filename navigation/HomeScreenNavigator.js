import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import PostViewScreen from '../screens/PostViewScreen'


export default function HomeScreenNavigator() {

//const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PostViewScreen" component={PostViewScreen} />
    </Stack.Navigator>
  );
}