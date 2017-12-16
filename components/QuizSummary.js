import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { white, black, gray } from '../utils/colors';

export default function QuizSummary({ correctAnswers, navigation, restartQuiz }){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch', marginTop:30}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 35,textAlign: 'center'}}>
            Quiz Finished!
            </Text>
            <Text style={{fontSize: 30,textAlign: 'center'}}>
            {correctAnswers}% of correct answers
            </Text>
          </View>
          <View style={{ alignSelf: 'stretch', justifyContent: 'flex-end', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={[styles.btn,{backgroundColor: white}]}
                              onPress={restartQuiz} >
              <Text style={[styles.buttonText, {color: black}]}>
                Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,{backgroundColor: black}]}
                              onPress={() => navigation.goBack()} >
              <Text style={[styles.buttonText, {color: white}]}>
                Back to Deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    flex: 0.8
  },
  btn: Platform.OS === 'ios'
  ? {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    width: 200,
    height: 70,
    marginBottom: 10
  }
  : {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    width: 200,
    height: 70,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center'
  }
});
