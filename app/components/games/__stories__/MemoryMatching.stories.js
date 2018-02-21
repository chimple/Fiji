import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import MemoryMatching from '../MemoryMatching';

const window = Dimensions.get("window")

storiesOf('MemoryMatching', module)
  .add('with text', () => (
    <MemoryMatching
      data={[["i","i"],["r", "r"],["J", "J"],["K", "K"],["P", "P"],["T", "T"],["U", "U"],["V", "V"]]}
      style = {{
        width: window.width,
        height: window.height
      }}
      setProgress={()=>{}}
      onScore={()=>{}}
      onEnd={()=>{}}
    />  
  ));
