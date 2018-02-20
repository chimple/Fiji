import 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import MemoryMatching from '../games/MemoryMatching';

const window = Dimensions.get("window")

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
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
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
