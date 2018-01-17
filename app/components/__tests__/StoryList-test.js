import 'react-native';
import React from 'react';
import StoryList from '../StoryList';
import { titles } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <StoryList 
      titles = { titles } />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
