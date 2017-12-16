import React from 'react';
import { View, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator, StackNavigator, NavigationActions, HeaderBackButton } from 'react-navigation';
import { StatusBar } from 'react-native';
import { Constants } from 'expo';
import { yellow, gray, white, purple, blue, black } from './utils/colors';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import IndividualDeckView from './components/IndividualDeckView';
import QuizView from './components/QuizView';
import NewCardView from './components/NewCardView';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';

function MobileStatusBar({backgroundColor, ...props}) {
    return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-card-outline' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : yellow,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  IndividualDeckView: {
    screen: IndividualDeckView,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      headerLeft: <HeaderBackButton onPress={() => {
                                      const resetAction = NavigationActions.reset({
                                        index: 0,
                                        actions: [
                                          NavigationActions.navigate({ routeName: 'Home'})
                                        ]
                                      })
                                      navigation.dispatch(resetAction)
                                    }}
                  tintColor={white} />
    })
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTitle: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  NewCardView: {
    screen: NewCardView,
    navigationOptions: {
      headerTitle: 'Add card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
});


export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MobileStatusBar backgroundColor={gray} barStyle='light-content' />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
