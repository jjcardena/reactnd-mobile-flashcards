import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,
        TextInput, Animated, ScrollView, KeyboardAvoidingView } from 'react-native';
import { white, black, gray, red } from '../utils/colors';
import { connect } from 'react-redux';
import { mergeDeck } from '../actions';
import { addCardToDeck, getDeck } from '../utils/api';

class NewCardView extends Component {
  state = {
    question: '',
    answer:'' ,
    questionBounceValue: new Animated.Value(1),
    answerBounceValue: new Animated.Value(1),
    questionBorderColor: gray,
    answerBorderColor: gray
  }
  addCardToDeck = () =>{
    let errors = false;

    const { questionBounceValue, questionBorderColor } = this.state;
    if(!this.state.question || this.state.question===''){
      //Animation for manadatory field
      Animated.sequence([
        Animated.timing(questionBounceValue, { duration: 200, toValue: 1.04}),
        Animated.spring(questionBounceValue, { toValue: 1, friction: 4})
      ]).start();
      this.setState(() => ({ questionBorderColor: red }));
      errors = true;
    }

    const { answerBounceValue, answerBorderColor } = this.state;
    if(!this.state.answer || this.state.answer===''){
      //Animation for manadatory field
      Animated.sequence([
        Animated.timing(answerBounceValue, { duration: 200, toValue: 1.04}),
        Animated.spring(answerBounceValue, { toValue: 1, friction: 4})
      ]).start();
      this.setState(() => ({ answerBorderColor: red }));
      errors = true;
    }

    if(!errors){
      const {deck} = this.props.navigation.state.params;
      const card = {question: this.state.question, answer: this.state.answer};
      addCardToDeck(deck, card)
        .then(() => getDeck(deck.title)
          .then((updatedDeck) => { this.props.dispatch(mergeDeck(updatedDeck));
                            return updatedDeck; })
            .then((deck) => this.props.navigation.navigate(
                            'IndividualDeckView',
                            {deck}))
        )
        .then(() => this.setState(() => ({ question: null })));
    }
  }

  render(){
    const { questionBounceValue, questionBorderColor,
            answerBounceValue, answerBorderColor  } = this.state;
    return (
      <ScrollView style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.item}>
          <View style={styles.container}>
            <Animated.View style={{alignSelf: 'stretch', transform: [{scale: questionBounceValue}]}}>
            <TextInput
              style={{height: 45, borderColor: questionBorderColor, borderWidth: 2, borderRadius: 5, marginTop:30, alignSelf: 'stretch' }}
              placeholderTextColor={gray} placeholder={'Question text'}
              onChangeText={(question) => this.setState({question: question})}
              value={this.state.question}
            />
            </Animated.View>
            <Animated.View style={{alignSelf: 'stretch', transform: [{scale: answerBounceValue}]}}>
            <TextInput
              style={{height: 45, borderColor: answerBorderColor, borderWidth: 2, borderRadius: 5, marginTop:30, alignSelf: 'stretch' }}
              placeholderTextColor={gray} placeholder={'Answer text'}
              onChangeText={(answer) => this.setState({answer: answer})}
              value={this.state.answer}
            />
            </Animated.View>
            <TouchableOpacity style={[styles.btn,{backgroundColor: black, marginTop:30}]}
                              onPress={this.addCardToDeck} >
              <Text style={[styles.buttonText, {color: white}]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    flex: 0.7
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:50,
    alignItems:'center',
    alignSelf: 'stretch'
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

function mapStateToProps(state){
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(NewCardView);
