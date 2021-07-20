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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { decks, currentDeck, quizTaken } = useSelector((state) => state.cards);

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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Quiz!! 📬',
      body: "You haven't took any quizs for a while",
    },
    trigger: { seconds: 1 },
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
export default Home;
