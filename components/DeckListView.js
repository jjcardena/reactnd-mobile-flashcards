import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import { purple } from '../utils/colors';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import DeckView from './DeckView';
import { AppLoading } from 'expo';

class DeckListView extends Component {
  state = {
    ready: false
  }
  componentDidMount(){
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})));
  }
  navigateToDeck = (deck) => {
    this.props.navigation.navigate(
          'IndividualDeckView',
          {deck}
      )
  }
  render() {
    const decks = this.props.decks;
    if(!this.state.ready){
      return <AppLoading />
    }
    return (
          <ScrollView style={{flex:1}}>
          {Object.keys(decks).map((deck) =>
            <DeckView deck={decks[deck]} navigateToDeck={this.navigateToDeck} key={deck} />)}
          </ScrollView>
    )
  }
}

function mapStateToProps(state){
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckListView);
