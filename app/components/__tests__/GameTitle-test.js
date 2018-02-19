import 'react-native';
import React from 'react';
import GameTitle from '../GameTitle'
import { games } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <GameTitle
      title = { games[0] }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
