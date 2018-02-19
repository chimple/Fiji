import 'react-native';
import React from 'react';
import GameCategoryList from '../GameCategoryList'
import { games } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <GameCategoryList
      games = { games }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
