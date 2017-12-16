import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, formatDeckResults } from './_decks';

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => formatDeckResults(data))
    .then((result) => result[title]);
}

export function saveDeckTitle (deckTitle) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
          title: deckTitle,
          questions: []
    }
  }));
}

export function addCardToDeck (deck, card) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.title]: {
          ...deck,
          questions: [...deck.questions, card]
    }
  }));
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => formatDeckResults(data));
}
