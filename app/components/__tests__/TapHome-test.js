import 'react-native';
import React from 'react';
import { Dimensions } from 'react-native'
import TapHome from '../games/TapHome'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const window = Dimensions.get("window")

it('renders correctly', () => {
  const tree = renderer.create(
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
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
