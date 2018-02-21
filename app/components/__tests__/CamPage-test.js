import 'react-native';
import React from 'react';
import CamPage from '../CamPage';
import { users } from '../../../config/jest/mockData'

import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<CamPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });