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

// it('Mocking the function', () => {
//   const tree = renderer.create(
//     <StoryTitle 
//     title = { titles[0] }
//     onPressItem={jest.fn()}
//   />
// ).getInstance()
// tree._onPress()
// // tree._onPress(users[3])
//   expect(tree).toMatchSnapshot();
// });

it('Mocking the function', () => {
  const tree = renderer.create(
    <StoryTitle 
    title = { titles[0] }
    onPressItem={jest.fn()}
  />
).getInstance()
tree.handler(jest.fn())
// tree._onPress(users[3])
  expect(tree).toMatchSnapshot();
});

// it('Mocking the function', () => {
//   const tree = renderer.create(
//     <StoryTitle 
//     title = { titles[0] }
//     onPressItem={jest.fn()}
//   />
// ).getInstance()
// tree.componentWillMount()
// // tree._onPress(users[3])
//   expect(tree).toMatchSnapshot();
// });

// it('Mocking the function', () => {
//   const tree = renderer.create(
//     <StoryTitle 
//     title = { titles[0] }
//     onPressItem={jest.fn()}
//   />
// ).getInstance()
// tree.componentWillUnmount()
// // tree._onPress(users[3])
//   expect(tree).toMatchSnapshot();
// });
