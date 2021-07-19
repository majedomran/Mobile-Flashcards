import React, { useEffect } from 'react';
import { View, Text, Button, ListView } from 'react-native';


import Deck from './Deck';
import { useSelector, useDispatch } from 'react-redux';
import { addDeckAction,setCurrentDeckAction } from '../redux/reducers/cardsReducer';
const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const { decks, currentDeck} = useSelector((state) => state.cards);
  useEffect(() => {
      if(!decks) return 
    console.log('decks: ', decks);
    console.log('currentDeck: ', currentDeck);
  }, [decks,currentDeck]);
  const handleDeck = (id) => {
    dispatch(setCurrentDeckAction(id))
    navigation.navigate('deck')
  }
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignSelf: 'center',
      }}
    >

      <View style={{ marginTop: '20%', width: 200, alignSelf: 'center' }}>
        
              {
                  Object.values(decks).map((deck) => {
                      return (
                          <View style={{borderColor:'black',borderWidth:1, marginTop:5}} onTouchEnd={() => {handleDeck(deck.id)}}>

                              <Text> {deck.title}</Text>
                          </View>
                      )
                  })
              }
      </View>
      {/* <Deck/> */}
    </View>
  );
};

export default Home;
