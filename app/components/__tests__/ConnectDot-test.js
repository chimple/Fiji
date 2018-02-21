import 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import ConnectDotsScreen from '../../screens/ConnectDotsScreen';

import renderer from 'react-test-renderer';
const window = Dimensions.get("window")
it('renders correctly', () => {
  const tree = renderer.create(
    <ConnectDotsScreen
    data={{
      serial: ['1','2','3','4','5'],
      others: ['10','23','30']
    }}
    style = {{
      width: window.width,
      height: window.height
    }}
    setProgress={()=>{}}
    onScore={()=>{} }
    onEnd={()=>{}}
    _clickTile={() => {id:1, view}}
  
  />
 ).toJSON()
  expect(tree).toMatchSnapshot()
})
