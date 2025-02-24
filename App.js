
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CelestialBodiesScreen from './screens/CelestialBodiesScreen';
import SpaceMissionsScreen from './screens/SpaceMissionsScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CelestialBodies" component={CelestialBodiesScreen} />
        <Stack.Screen name="SpaceMissions" component={SpaceMissionsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
