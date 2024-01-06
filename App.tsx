import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {DiscountsScreen, MainScreen} from './src/screens';

export type RootStackParamList = {
  Discounts: {discountIds: number[]};
  Main: {discountIds: number[]};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{presentation: 'modal'}}
        initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Discounts"
          component={DiscountsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
