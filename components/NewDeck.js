import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { addDeckAction } from '../redux/reducers/cardsReducer';
import { useDispatch } from 'react-redux';
import { generateGuid } from '../helpers';
const NewDeck = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    console.log('title: ', title);
    const deck = {
      id: generateGuid(),
      title,
    };
    dispatch(addDeckAction(deck));
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
        <TextInput
          style={{ width: 200, height: 50, backgroundColor: 'lightblue' }}
          placeholder="title"
          onChangeText={setTitle}
        />
        <Button title={'Add Deck'} onPress={handleSubmit}></Button>
      </View>
    </View>
  );
};

export default NewDeck;
