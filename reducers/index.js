import { RECEIVE_DECKS, MERGE_DECK } from '../actions'

function decks(state = {}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case MERGE_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    default:
      return state;
  }
}

export default decks;
