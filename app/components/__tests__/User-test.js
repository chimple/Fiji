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

it('this is user 1', () => {
  const tree = renderer.create(<User user={users[2]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
