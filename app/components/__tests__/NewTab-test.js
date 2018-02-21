import 'react-native';
import React from 'react';
import FacebookTabBar from '../NewTab';
import stickers from '../../assets/stickers/stickers.json'

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
  const tree = renderer.create(
  <FacebookTabBar tabData={stickers} />
).toJSON();
  expect(tree).toMatchSnapshot();
});

