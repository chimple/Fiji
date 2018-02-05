import React from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable'

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import Tile from '../../app/components/games/Tile';
import TileGrid from '../../app/components/games/TileGrid';
import ReflexBoard from '../../app/components/games/ReflexBoard';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

storiesOf('Tile', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <View style={{
    }}>
    <Tile
      onPress={action('clicked-text')}
      tileColor='skyblue'
      edgeColor='deepskyblue'
      pressedTileColor='goldenrod'
      pressedEdgeColor='darkgoldenrod'
      textColor='purple'
      text='A'
      style={{
        height:100,
        width:100
      }}
      toggle={false}
    />
    <Tile
    onPress={action('clicked-text')}
    tileColor='skyblue'
    edgeColor='deepskyblue'
    pressedTileColor='goldenrod'
    pressedEdgeColor='darkgoldenrod'
    textColor='purple'
    text='A'
    style={{
      height:100,
      width:100
    }}
  toggle={true}
  />
  </View>
  ));

  storiesOf('TileGrid', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <TileGrid
      numRows={3}
      numCols={4}
      data={['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']}
      tileColor='skyblue'
      edgeColor='deepskyblue'
      pressedTileColor='goldenrod'
      pressedEdgeColor='darkgoldenrod'
      textColor='purple'        
      style={{
        width: 300,
        height: 400
      }}
      onPress={(ref)=>{
        ref.zoomIn(250)
        console.log(ref)
        ref.props.tileColor='goldenrod'
      }}
    />
  ));

  storiesOf('ReflexBoard', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <ReflexBoard
      data={['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']}
    />
  ));
