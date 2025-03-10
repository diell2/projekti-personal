
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CelestialBodiesScreen from './screens/CelestialBodiesScreen';
import SpaceMissionsScreen from './screens/SpaceMissionsScreen';
import SearchScreen from './screens/SearchScreen';
import MissionDetailsScreen from './screens/MissionDetailsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import SearchDetailScreen from './screens/SearchDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CelestialBodies" component={CelestialBodiesScreen} />
        <Stack.Screen name="SpaceMissions" component={SpaceMissionsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MissionDetails" component={MissionDetailsScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        <Stack.Screen name="SearchDetail" component={SearchDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
