import React from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import CSContainer from '../../components/core/CSContainer';
import CSText from '../../components/core/CSText';

interface LessonProps {
  navigation: NavigationProp<any>;
  route: RouteProp<ParamListBase>;
}

const Lesson = (props: LessonProps) => {
  const {course}: any = props.route.params;

  return (
    <CSContainer>
      <CSText>Lesson of topic {course?.name}</CSText>
    </CSContainer>
  );
};

export default Lesson;
