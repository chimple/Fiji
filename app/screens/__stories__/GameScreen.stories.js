import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import GameScreen from '../GameScreen';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../redux'
// import configureMockStore from 'redux-mock-store'

// const mockStore = configureMockStore([thunk]);
// const store = mockStore({
//   game: {
//     data:['a', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
//     isFetching: false,
//   },
//   score: {
//     myScore: 0
//   }
// });

// storiesOf('GameScreen', module)
//   .addDecorator(story => <Provider store={store}>{story()}</Provider>)
//   .add('with reflex', () => (
//     <GameScreen
//     />
//   ));
