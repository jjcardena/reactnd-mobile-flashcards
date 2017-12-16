import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { white, gray } from '../utils/colors';

export default function DeckView({ deck, navigateToDeck }){
    return (
      <TouchableOpacity onPress={() => navigateToDeck(deck)}>
        <View style={styles.item}>
          <View>
            <Text style={{fontSize: 25,textAlign: 'center'}}>
              {deck.title}
            </Text>
            <Text style={{fontSize: 20, color: gray, textAlign: 'center'}}>
              {deck.questions.length} cards
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  item:  {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    height: 130,
    flex: 1 
  }
})
