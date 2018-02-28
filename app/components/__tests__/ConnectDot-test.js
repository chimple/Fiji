import 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import ConnectDots from '../games/ConnectDots';

import renderer from 'react-test-renderer';
const window = Dimensions.get("window")
it('renders correctly', () => {
 

  const tree = renderer.create(
    <ConnectDots
    
    data={{
      serial: ['1','2','3','4','5'],
      others: ['10','23','30']
    }}
  
    style = {{
      width: window.width,
      height: window.height
    }}
    
    
   />
 ).getInstance()
 tree._clickTile(1,)
 
  expect(tree).toMatchSnapshot()
});
