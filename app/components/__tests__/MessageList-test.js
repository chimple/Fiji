import 'react-native';
import React from 'react';
import MessageList from '../MessageList';
import { users, messages, stickersData, stickerPacksData } from '../../../config/jest/mockData'

// Note: test renderer must be required after react-native.
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

it('renders correctly', () => {
  const tree = renderer.create(
    <MessageList
      messages={messages}
      user={users[0]}
      friend={users[1]}

    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

// FAIL  app\components\__tests__\MessageList-test.js
// × renders correctly (156ms)

// ● renders correctly

//   Invariant Violation: Could not find "store" in either the context or props of "Connect(TabbedView)". 
//   Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(TabbedView)".