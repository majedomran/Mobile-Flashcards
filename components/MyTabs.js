import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import NewDeck from './NewDeck';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="newdeck" component={NewDeck} />
    </Tab.Navigator>
  );
}
export default MyTabs