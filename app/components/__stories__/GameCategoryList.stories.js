import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import GameCategoryList from '../GameCategoryList'
import {games} from '../../../config/jest/mockData'

storiesOf( 'GameCategoryList', module ) 
    .add('with string', () =>(
        <GameCategoryList
            games = { games }
            onPressItem={action('clicked-story')}
        />
    ));