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

const sticker=[stickers];

it('this is user 0', () => {
  console.log('this is stickers',sticker)
  const tree = renderer.create(
  <FacebookTabBar tabData={sticker} />
).toJSON();
  expect(tree).toMatchSnapshot();
});


it('Mocking the function', () => {
  const tree = renderer.create(
    <FacebookTabBar 
    tabData={sticker}
    goToPage={jest.fn()}
    onPressTab={jest.fn()}
    />
).getInstance()
tree.updatedId(sticker[0])
  expect(tree).toMatchSnapshot();
});
