import 'react-native';
import React from 'react';
import Tabbed from '../TabbedView';
import { users, messages, stickersData, stickerPacksData } from '../../../config/jest/mockData'

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

it('TabbedView component', () => {
    const tree = renderer.create(
        <Tabbed
            // packs={stickerPacksData}
            // friend={users[1]}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

// FAIL  app\components\__tests__\TabbedView-test.js
// × TabbedView component (31ms)

// ● TabbedView component

//   Invariant Violation: Native animated module is not available

