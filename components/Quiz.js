import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';

const Quiz = ({ navigation }) => {
  const { decks, currentDeck } = useSelector((state) => state.cards);

  const [cards, setcards] = useState('');
  const [value, setValue] = useState(0);
  const [show, setShow] = useState('');
  const [page, setPage] = useState('');
  const [correct, setCorrect] = useState(0);
  useEffect(() => {
    if (!decks || !currentDeck) return;
    const tempDeck = Object.values(decks).filter((d) => {
      return d.id === currentDeck;
    })[0];
    const cards = Object.values(tempDeck.cards);

    setcards(cards);
  }, [currentDeck]);
  useEffect(() => {
    setValue(0);
  }, []);
  useEffect(() => {
    if (cards) {
      if (cards.length - (value + 1) < 0) setPage('done');
      else {
        setPage('');
      }
    }
  }, [value]);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignSelf: 'center',
      }}
    >
      {!cards.length ? (
        <Text> No cards exist</Text>
      ) : page === 'done' ? (
        <View style={{ marginTop: '20%', width: 200, alignSelf: 'center' }}>
          <Button
            onPress={() => {
              setValue(0);
              setPage('');
            }}
            title={'Restart Quiz'}
          ></Button>
          <Button
            onPress={() => {
              setValue(value + 1);
            }}
            title={'Back to Deck'}
          ></Button>
        </View>
      ) : (
        <View style={{ marginTop: '20%', width: 200, alignSelf: 'center' }}>
          <Text> Questions remaining: {cards.length - value}</Text>
          <Text> Question: {cards[value]?.question}</Text>

          {show === 'show' ? <Text> Answer: {cards[value].answer}</Text> : null}

          <Button
            onPress={() => {
              setCorrect(correct + 1);
              setValue(value + 1);
            }}
            title={'Correct'}
          ></Button>
          <Button
            onPress={() => {
              setValue(value + 1);
            }}
            title={'Not correct'}
          ></Button>
          <Button
            onPress={() => {
              setShow('show');
            }}
            title={'Show Answer'}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default Quiz;
