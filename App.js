import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import RestaurantesScreen from './src/pages/restaurantes';
import CardapioScreen from './src/pages/cardapio';
import DescricaoScreen from './src/pages/descricao';


const AppNavigator = createStackNavigator({
  
  Restaurantes: {
    screen: RestaurantesScreen
  },
  Cardapio: {
    screen: CardapioScreen
  },
  Descricao: {
    screen: DescricaoScreen
  },
}, {
    initialRouteName: 'Restaurantes',
});

export default createAppContainer(AppNavigator);