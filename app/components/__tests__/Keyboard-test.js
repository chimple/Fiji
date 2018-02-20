import 'react-native';
import React from 'react';
import Keyboard from '../Keyboard';
import { users } from '../../../config/jest/mockData'
import * as Emojis from '../Emojis';
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

it('User List Component', () => {
    const tree = renderer.create(
        <Keyboard tabLabel="😃" data={Emojis.people} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
