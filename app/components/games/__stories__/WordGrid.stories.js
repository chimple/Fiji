import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native'
import WordGrid from '../WordGrid';

const window = Dimensions.get("window")

storiesOf('WordGrid', module)
  .add('with text', () => (
    <WordGrid
      data={{
        word: ['D','O','G'],
        others: ['T']
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
      onProgress={()=> {}}
      onScore={()=> {}}
      onEnd={()=> {}}
    />
  ));
