import 'react-native';
import React from 'react';
import StoryTitle from '../StoryTitle';
import { titles } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <StoryTitle 
      title = { titles[0] }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
