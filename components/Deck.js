import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';

const Deck = ({navigation}) => {
  const {decks, currentDeck } = useSelector((state) => state.cards);

  const [ deck, setDeck] = useState('')
  useEffect(() => {
    if (!decks || !currentDeck) return;
    const tempDeck = Object.values(decks).filter((d) => {
        return d.id === currentDeck
    })[0]
    setDeck(tempDeck)
  }, [currentDeck, decks]);

  const handleAddCard = () => {
    navigation.navigate('newcard');
  };
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
        <Text> {deck.title}</Text>
        {
            deck.cards ?
            <Text>  {Object.values(deck.cards).length} Cards</Text>
            :
            null
        }
        <Button title={'Add Card'} onPress={handleAddCard}></Button>
        <Button title={'Take Quiz'} onPress={() => {navigation.navigate('quiz')}}></Button>
      </View>
    </View>
  );
};

export default Deck;
