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
  const {skill, idCourse}: any = props.route.params;

  return (
    <CSContainer>
      <CSText>
        Lesson of topic {skill} with id {idCourse}
      </CSText>
    </CSContainer>
  );
};

export default Lesson;
