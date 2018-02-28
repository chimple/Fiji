import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import ConnectDots from '../ConnectDots';;

const window = Dimensions.get("window")

storiesOf('ConnectDotsScreen', module)
  .add('with text', () => (
    <ConnectDots
      data={{
        serial: ['4','5','6','7','8','9'],
        others: ['10','23','30']
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
      setProgress={()=>{}}
      onScore={()=>{} }
      onEnd={()=>{}}
    
    />
  )
);