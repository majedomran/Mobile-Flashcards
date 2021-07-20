import React, { useState, useEffect } from 'react'
import { View,Text,Button,TextInput } from 'react-native'
import {addCardAction} from '../redux/reducers/cardsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { generateGuid } from '../helpers';

const Deck = () => {
    const disptach = useDispatch()

    const {currentDeck} = useSelector((state) => state.cards)
    
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const handleSubmit = () => {
        disptach(addCardAction({id:currentDeck,card: {id: generateGuid(), question, answer}}))
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
          <TextInput style={{width:200,height:50, backgroundColor:'lightblue'}} placeholder='question' onChangeText={setQuestion}/>
          <TextInput style={{width:200,height:50, backgroundColor:'lightblue'}} placeholder='Asnwer' onChangeText={setAnswer}/>
        <Button title={'Add Card'} onPress={handleSubmit}></Button>
      </View>
      {/* <Deck/> */}
    </View>
    ) 
}

export default Deck