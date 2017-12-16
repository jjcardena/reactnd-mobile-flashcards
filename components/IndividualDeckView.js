import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { white, black, gray } from '../utils/colors';
import { clearLocalNotification } from '../utils/helpers';

class IndividualDeckView extends Component{
  static navigationOptions = ({ navigation }) =>
  ({
    title: navigation.state.params.deck.title
  })
  openQuiz = (deck) =>{
    clearLocalNotification();
    this.props.navigation.navigate('QuizView',{deck});
  }
  render(){
    const { deck } = this.props.navigation.state.params;
    const navigation = this.props.navigation;
    return (
      <ScrollView style={{flex:1}}>
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center', paddingTop:20, marginBottom: 20}}>
            <Text style={{fontSize: 40,textAlign: 'center'}}>
              {deck.title}
            </Text>
            <Text style={{fontSize: 25, color: gray, textAlign: 'center'}}>
              {deck.questions.length} cards
            </Text>
          </View>
          <TouchableOpacity style={[styles.btn,{backgroundColor: white}]}
                            onPress={() => navigation.navigate('NewCardView',{deck})} >
            <Text style={[styles.buttonText, {color: black}]}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn,{backgroundColor: black}]}
                            onPress={() => this.openQuiz(deck)} >
            <Text style={[styles.buttonText, {color: white}]}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
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
    flex: 1
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
})

export default IndividualDeckView;
