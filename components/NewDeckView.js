import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,
        TextInput, Animated, ScrollView, KeyboardAvoidingView } from 'react-native';
import { white, black, gray, red } from '../utils/colors';
import { connect } from 'react-redux';
import { mergeDeck } from '../actions';
import { saveDeckTitle, getDeck } from '../utils/api';

class NewDeckView extends Component {
  state = {
    deckName: null,
    textBounceValue: new Animated.Value(1),
    textBorderColor: gray
  }
  addDeck = () =>{
    const { textBounceValue, textBorderColor } = this.state;
    if(!this.state.deckName || this.state.deckName===''){
      //Animation for manadatory field
      Animated.sequence([
        Animated.timing(textBounceValue, { duration: 200, toValue: 1.04}),
        Animated.spring(textBounceValue, { toValue: 1, friction: 4})
      ]).start();
      this.setState(() => ({ textBorderColor: red }))
    }
    else {
      saveDeckTitle(this.state.deckName)
        .then(() => getDeck(this.state.deckName)
                    .then((deck) => { this.props.dispatch(mergeDeck(deck));
                                      return deck; })
                    .then((deck) => this.props.navigation.navigate(
                                    'IndividualDeckView',
                                    {deck}))
        )
        .then(() => this.setState(() => ({ deckName: null })));
    }

  }
  render(){
    const { textBounceValue, textBorderColor } = this.state;
    return (
      <ScrollView style={{flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.item}>
            <View style={styles.container}>
              <Text style={{fontSize: 35,textAlign: 'center', marginTop:30}}>
              What is the title of your new deck?
              </Text>
              <Animated.View style={{alignSelf: 'stretch', transform: [{scale: textBounceValue}]}}>
              <TextInput
                style={{height: 45, borderColor: textBorderColor, borderWidth: 2, borderRadius: 5, marginTop:30, alignSelf: 'stretch' }}
                placeholderTextColor={gray} placeholder={'Deck Title'}
                onChangeText={(deckName) => this.setState({deckName})}
                value={this.state.deckName}
              />
              </Animated.View>
              <TouchableOpacity style={[styles.btn,{backgroundColor: black, marginTop:30}]}
                                onPress={this.addDeck} >
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

export default connect(mapStateToProps)(NewDeckView);
