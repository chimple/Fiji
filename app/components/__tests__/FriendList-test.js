import 'react-native';
import React from 'react';
import FriendList from '../FriendList'
import { users } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <FriendList 
      users = { users }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
