import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import ReflexBoard from '../ReflexBoard';

const window = Dimensions.get("window")

storiesOf('ReflexBoard', module)
  .add('with text', () => (
    <ReflexBoard
      data={{
        serial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
    />
  ));
