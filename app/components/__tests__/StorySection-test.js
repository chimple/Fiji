import 'react-native';
import React from 'react';
import StorySection from '../StorySection';
import { stories } from '../../../config/jest/mockData'

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
  <StorySection
  story={stories}  
  item={stories[1]} 
  index={0} 
  page={0} 
  count={1} 
  bg={stories.pages[0].bg} />
).toJSON();
  expect(tree).toMatchSnapshot();
});


// FAIL  app\components\__tests__\StorySection-test.js
//   × this is user 0 (6ms)

//   ● this is user 0

//     TypeError: Cannot read property '0' of undefined

//       30 |   page={0}
//       31 |   count={1}
//     > 32 |   bg={stories.pages[0].bg} />
//       33 | ).toJSON();
//       34 |   expect(tree).toMatchSnapshot();
//       35 | });

//       at Object.<anonymous> (app/components/__tests__/StorySection-test.js:32:27)

// Test Suites: 1 failed, 1 total
// Tests:       1 failed, 1 total

