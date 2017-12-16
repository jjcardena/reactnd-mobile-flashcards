import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { white, black, gray, red, green } from '../utils/colors';
import TextButton from './TextButton';

class QuizQuestion extends Component{
  state = {
    showAnswer: false,
  }
  componentWillReceiveProps(nextProps) {
     if (nextProps.question !== this.props.question) {
       this.setState((state) => ({ showAnswer: false }));
     }
  }
  toggleQuestionAnswer = () =>{
    this.setState((state) => ({ showAnswer: !state.showAnswer }));
  }
  render(){
    const { question, answerCorrect, answerIncorrect } = this.props;
    const { showAnswer } = this.state;
    return (

       <View style={{flex: 1, justifyContent: 'center', alignSelf: 'stretch'}}>
          {!showAnswer
          ? <Text style={{fontSize: 35,textAlign: 'center'}}>
            {question.question}
            </Text>
          : <Text style={{fontSize: 35,textAlign: 'center'}}>
            {question.answer}
            </Text>
          }
          <TextButton style={{fontSize:20}} onPress={this.toggleQuestionAnswer}>
            {!showAnswer ? 'Answer' : 'Question'}
          </TextButton>
       <View style={{ alignSelf: 'stretch', justifyContent: 'flex-end', marginTop:20, alignItems:'center'}}>
        <TouchableOpacity style={[styles.btn,{backgroundColor: green}]}
          onPress={answerCorrect}>
          <Text style={[styles.buttonText, {color: white}]}>
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn,{backgroundColor: red}]}
          onPress={answerIncorrect}>
          <Text style={[styles.buttonText, {color: white}]}>
            Incorrect
          </Text>
        </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: Platform.OS === 'ios'
  ? {
    borderWidth: 0,
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

export default QuizQuestion;
