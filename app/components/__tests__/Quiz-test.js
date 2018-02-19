import 'react-native';
import React from 'react';
import Quiz from '../games/Quiz';
import { Dimensions } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const { width, height } = Dimensions.get('window');

it('renders correctly', () => {
    const tree = renderer.create(
      <Quiz 
      data= {{
        question: 'A',
        choices: ['S', 'D', 'G', 'A'],
        answerIndex: 3  
      }}
      style= {{
          width: width,
          height: height
      }}
      setprogress={() => {}}
      onScore={() => {}}
      onEnd={() => {}}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  
