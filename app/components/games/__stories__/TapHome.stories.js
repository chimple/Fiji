import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import TapHome from '../TapHome';

const window = Dimensions.get("window")

storiesOf('TapHome', module)
  .add('with text', () => (
    <TapHome
      data={{
        answer: 15,
        serial: ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
      setProgress={()=>{}}
      onScore={()=>{}}
      onEnd={()=>{}}
    />
  ));
