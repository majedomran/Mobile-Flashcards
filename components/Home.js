import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, ListView } from 'react-native';

import Deck from './Deck';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentDeckAction,
  setQuizTakenAction,
} from '../redux/reducers/cardsReducer';
import * as Notifications from 'expo-notifications';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { decks, currentDeck, quizTaken } = useSelector((state) => state.cards);

  useEffect(async () => {
    if (!quizTaken) await schedulePushNotification();
    setQuizTakenAction(true);
  }, [quizTaken]);
  useEffect(() => {
    if (!decks) return;
  }, [decks, currentDeck]);
  const handleDeck = (id) => {
    dispatch(setCurrentDeckAction(id));
    navigation.navigate('deck');
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
        {Object.values(decks).map((deck) => {
          return (
            <View
              key={deck.id}
              style={{ borderColor: 'black', borderWidth: 1, marginTop: 5 }}
              onTouchEnd={() => {
                handleDeck(deck.id);
              }}
            >
              <Text> {deck.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Home;
