import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './redux';
import { Provider as ReduxProvider } from 'react-redux';
import Home from './components/Home';
import newCard from './components/newCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './components/MyTabs';
import Deck from './components/Deck';
import Quiz from './components/Quiz';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={MyTabs} />
          <Stack.Screen name="newcard" component={newCard} />
          <Stack.Screen name="deck" component={Deck} />
          <Stack.Screen name="quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
