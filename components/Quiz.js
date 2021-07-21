import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';

const Quiz = ({ navigation }) => {
  const { decks, currentDeck } = useSelector((state) => state.cards);

  const [cards, setcards] = useState('');
  const [value, setValue] = useState(0);
  const [show, setShow] = useState('');
  const [page, setPage] = useState('');
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [firstRun, setFirstRun] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    console.log('cards.length - (value + 1) < 0: ', cards.length - (value + 1));
    console.log(
      'value 1: ',
      value
    );
    console.log('cards length',cards.length);
    console.log('firstRun:', firstRun);

    if (value !== cards.length){
      setFirstRun(true)
      console.log('value === cards.length', value === cards.length);
      navigation.addListener('beforeRemove', (e) => {
        if(firstRun){
          schedulePushNotification()
        }
        setFirstRun(true)

      }),
        [ value];
    }
  }, [value]);
  useEffect(() => {
    if (!decks || !currentDeck) return;
    const tempDeck = Object.values(decks).filter((d) => {
      return d.id === currentDeck;
    })[0];
    const cards = Object.values(tempDeck.cards);

    setcards(cards);
  }, [currentDeck]);
  useEffect(() => {
    setCorrect(0);
    setValue(0);
  }, []);
  useEffect(() => {
    if (cards) {
      if (cards.length - (value + 1) < 0) {
        setPage('done');
      } else {
        setPage('');
      }
      setScore(correct);
      setShow('');
    }
  }, [value]);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
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
          <Text>
            {' '}
            score: {score}/{cards.length}
          </Text>
          <Button
            onPress={() => {
              setCorrect(0);
              setValue(0);
              setPage('');
            }}
            title={'Restart Quiz'}
          ></Button>
          <Button
            onPress={() => {
              setValue(value + 1);
              navigation.push('deck')
            }}
            title={'Back to Deck'}
          ></Button>
        </View>
      ) : (
        <View style={{ marginTop: '20%', width: 200, alignSelf: 'center' }}>
          <Text> Questions remaining: {cards.length - value}</Text>
          <Text> Question: {cards[value]?.question}</Text>

          {show === 'show' && cards.length - (value + 1) >= 0 ? (
            <Text> Answer: {correct}</Text>
          ) : null}

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
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Quiz!! 📬',
      body: "You haven\'t completed your Quiz!",
    },
    trigger: { seconds: 120 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
export default Quiz;
