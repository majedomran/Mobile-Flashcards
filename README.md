Flash cards is a quiz app


used redux toolkit to be up to date with the newest technoligies out there 

-   Components :
        Home:
            has decks in it and is the main page 
        Deck:
            displays number of cards and option to take quiz or add card
        NewDeck:
            for adding a new deck takes a title 
        NewCard:
            adds a card to a deck takes question and answer
        Quiz:
            for quizing in a deck of cards 

-   Redux:
    addDeckAction:
        this action adds to the decks object by adding a deck
    setCurrentDeckAction: 
        this action sets the current deck id for when opening a new deck page
    addCardAction: 
        this action is for adding a card to a cetian deck by providing the id of the deck and a new id for the card

*to start the app type in the command line*
$ yarn 
$ yarn start

*or*

npm install 
npm start

-   platforms tested : 
    -   vertual Pixel 3 Android 10
