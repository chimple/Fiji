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
    statuses={['Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z','Z']}
    statusStyles={{
      Z: {
        View: {
          backgroundColor: '#24B2EA'
        },
        Text: {
          color: '#FFFFFF'
        }    
      }
    }}
    style={{
      width: 300,
      height: 400
    }}
    onPress={(id, ref)=>{
      ref.zoomIn(250)
    }}
  />
));
