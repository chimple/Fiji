import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import SingleGame from '../games/SingleGame'
import ReflexBoard from '../games/ReflexBoard'

storiesOf('SingleGame', module)
  .add('basic header', () => (
    <SingleGame
      myScore={10}
      play='TRIES'
      onEnd={action('onEnd')}
      onScore={action('onScore')}
      gameComponent={ReflexBoard}
      gameData={[{
        serial: ['A87', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      }]}
    />
  ))