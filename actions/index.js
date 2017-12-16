export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const MERGE_DECK = 'MERGE_DECK';

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function mergeDeck(deck){
  return {
    type: MERGE_DECK,
    deck
  }
}
