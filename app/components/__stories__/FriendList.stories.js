import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import FriendList from '../FriendList';
import {users} from '../../../config/jest/mockData'

storiesOf( 'FriendList', module ) 
    .add('with photo', () =>(
        <FriendList
            users = { users }
            onPressItem={action('clicked-story')}
        />
    ));