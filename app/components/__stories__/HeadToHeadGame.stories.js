import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import HeadToHeadGame from '../games/HeadToHeadGame'
import ReflexBoard from '../games/ReflexBoard'

storiesOf('HeadToHeadGame', module)
  .add('basic header', () => (
    <HeadToHeadGame
      myScore={10}
      play='TRIES'
      onEnd={action('onEnd')}
      onScore={action('onScore')}
      gameComponent={ReflexBoard}
      gameData={[{
        serial: ['A94', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      }]}
    />
  ))