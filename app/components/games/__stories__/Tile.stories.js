import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Tile from '../Tile';

storiesOf('Tile', module)
  .add('with text', () => (
    <Tile
      id={1}
      onPress={action('clicked-text')}
      tileColor='skyblue'
      edgeColor='deepskyblue'
      pressedTileColor='goldenrod'
      pressedEdgeColor='darkgoldenrod'
      textColor='purple'
      text='A'
      style={{
        height: 100,
        width: 100
      }}
      toggle={true}
    />
  ));
