import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import VocabLesson from './VocabLesson';
import GrammarLesson from './GrammarLesson';
import PronounceLesson from './PronounceLesson';

interface LessonProps {
  navigation: NavigationProp<any>;
  route: RouteProp<ParamListBase>;
}

const Lesson = (props: LessonProps) => {
  const {course}: any = props.route.params;

  if (course.skill === 'vocab') {
    return <VocabLesson />;
  } else if (course.skill === 'grammar') {
    return <GrammarLesson />;
  } else {
    return <PronounceLesson />;
  }
};

export default Lesson;
