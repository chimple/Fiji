import 'react-native';
import React from 'react';
import MessageList from '../MessageList';
import { users, messages } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <MessageList 
      messages = { messages }
      user = { users[0] } 
      friend = { users[1] }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders no messages correctly', () => {
  const tree = renderer.create(
    <MessageList 
      messages = { [] }
      user = { users[0] } 
      friend = { users[1] }
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
