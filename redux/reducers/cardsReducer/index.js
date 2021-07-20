import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  decks:{},
  quizTaken: false,
  currentDeck: ''
};

const cardsReducer = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearAll: () => initialState,
    addDeck: (state, action) => {
      state.decks[action.payload.id] = action.payload
      state.decks[action.payload.id]['cards'] = {}
    },
    setCurrentDeck: (state, action) => {
      state.currentDeck = action.payload
    },
    addCard: (state, action) => {
      state.decks[action.payload.id]['cards'][action.payload.card.id] = action.payload.card
    },
    setQuizTaken: (state, action) => {
      state.quizTaken = action.payload
    },
  },
});

export const {
  addDeck: addDeckAction,
  setCurrentDeck: setCurrentDeckAction,
  addCard: addCardAction,
  setQuizTaken: setQuizTakenAction
} = cardsReducer.actions;

export default cardsReducer.reducer;
