import 'react-native';
import React from 'react';
import WordGrid from '../games/WordGrid';
import { titles } from '../../../config/jest/mockData'
import { Dimensions } from 'react-native'
const window = Dimensions.get("window")

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <WordGrid 
    data={{
        word: ['D', 'O', 'G'],
        others: ['O']
      }}
      style = {{
        width: window.width,
        height: window.height
      }}
      onPress={{clickTile()}}
       />
  ).getInstance()
  tree._clickTile()
  expect(tree).toMatchSnapshot()
})
