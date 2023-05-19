import React, {useEffect} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

import VocabLesson from './VocabLesson';
import GrammarLesson from './GrammarLesson';
import PronounceLesson from './PronounceLesson';
import HeaderScreen from '../../components/HeaderScreen';

interface LessonProps {
  navigation: NavigationProp<any>;
  route: RouteProp<ParamListBase>;
}

const Lesson = (props: LessonProps) => {
  const {course}: any = props.route.params;
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          textLeft: `${
            course.skill === 'vocab'
              ? 'Từ vựng'
              : course.skill === 'grammar'
              ? 'Ngữ pháp'
              : 'Phát âm'
          } - ${course.name}`,
          backBtn: true,
          onPressRight() {
            navigation.navigate('vocabStared');
          },
          iconRight: course.skill === 'vocab' ? 'star' : undefined,
        }),
    });
  }, [course.name, course.skill, navigation]);

  if (course.skill === 'vocab') {
    return <VocabLesson courseItem={course} />;
  } else if (course.skill === 'grammar') {
    return <GrammarLesson />;
  } else {
    return <PronounceLesson />;
  }
};

export default Lesson;
