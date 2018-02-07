import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import TileGrid from '../TileGrid';

storiesOf('TileGrid', module)
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
    onPress={(id, ref)=>{
      ref.zoomIn(250)
    }}
  />
));
