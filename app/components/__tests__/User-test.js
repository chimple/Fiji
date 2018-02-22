import 'react-native';
import React from 'react';
import User from '../User';
import { users } from '../../../config/jest/mockData'

import renderer from 'react-test-renderer';

//npm test -- --updateSnapshot
//this above command is used to update the snapshot in windows

//npm test -- --coverage
//this above command is used to see the total coverage of the tested file in windows


//jest --updateSnapshot
//this above command is used to update the snapshot in IOS

//jest --coverage
//this above command is used to see the total coverage of the tested file in IOS

//npm test -- --coverage User-test
//this above command is used to test indivisual component

it('this is user 0', () => {
  const tree = renderer.create(<User user={users[3]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Rendering all the users', () => {
  const tree = [];
  for (i = 0; i < users.length; i++)
    tree.push(renderer.create(<User user={users[i]} />).toJSON());
  expect(tree).toMatchSnapshot();
});

it('Mocking the function', () => {
  const tree = renderer.create(
  <User 
  user={users[3]}
  />
).getInstance()
tree.onLayoutHandler(100,100)
// tree._onPress(users[3])
  expect(tree).toMatchSnapshot();
});

// it('Mocking the function', () => {


//   const LoginScreen = renderer.create(
//     <LoginScreen/>
//   ).getInstance()

//   const User = renderer.create(
//   <User 
//   user={users[3]}
//   onPressItem={LoginScreen._handleLogin.bind(this)}
//   />
// ).getInstance()
// User.onLayoutHandler(100,100)
// User._onPress(users[3])
//   expect(User).toMatchSnapshot();
// });