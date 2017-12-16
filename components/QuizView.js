import React, {Component} from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import QuizQuestion from './QuizQuestion';
import QuizSummary from './QuizSummary';
import { white, black, gray } from '../utils/colors';

class QuizView extends Component{
  state = {
    currentQuestion: 0,
    showAnswer: false,
    showSummary: false,
    correctAnswers: 0
  }
  nextQuestion = () => {
    const { deck } = this.props.navigation.state.params;
    if((this.state.currentQuestion+1)<deck.questions.length) {
      this.setState((state) => ({ currentQuestion: state.currentQuestion + 1 ,
                                  showAnswer: false}));
    }
    else {
      this.setState((state) => ({ showSummary: true,
                                  currentQuestion: 0 }));
    }
  }
  answerCorrect = () =>{
    this.setState((state) => ({ correctAnswers: state.correctAnswers + 1 }));
    this.nextQuestion();
  }
  answerIncorrect = () =>{
    this.nextQuestion();
  }
  restartQuiz = () => {
    this.setState((state) => ({ currentQuestion: 0,
                                showAnswer: false,
                                showSummary: false,
                                correctAnswers: 0 }));
  }
  render(){
    const { deck } = this.props.navigation.state.params;
    const { showSummary, currentQuestion, correctAnswers } = this.state;
    const question = deck.questions[currentQuestion];
    const navigation = this.props.navigation;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.item}>
          {!showSummary &&
            <Text style={{textAlign: 'left', alignSelf: 'stretch', fontSize: 20, marginLeft:5}}>
              {((currentQuestion+1).toString() + '/' + deck.questions.length)}
            </Text>
          }
          {!showSummary
            ?  <QuizQuestion  question={question}
                              answerCorrect={this.answerCorrect}
                              answerIncorrect={this.answerIncorrect} />
            : <QuizSummary  correctAnswers={(correctAnswers/deck.questions.length)*100}
                            navigation={navigation}
                            restartQuiz={this.restartQuiz} />
            }
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

export default QuizView;
