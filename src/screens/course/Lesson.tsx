import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import VocabLesson from './VocabLesson';
import HeaderScreen from '../../components/HeaderScreen';
import {AppDispatch} from '../../store/store';
import {LESSON_ACTION} from '../../store/actions';
import Content from '../../components/course/grammarAndPronouce/Content';
import {
  CourseScreenProps,
  CourseStackParamList,
} from '../../types/navigation/types';

const Lesson = () => {
  const route = useRoute<RouteProp<CourseStackParamList, 'Lesson'>>();
  const {course} = route.params;
  const navigation = useNavigation<CourseScreenProps<'Lesson'>['navigation']>();

  useEffect(() => {
    AppDispatch(LESSON_ACTION.GET_LESSON_LIST, {
      courseId: course.id,
      skill: course.skill,
    });
  }, [course]);

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
            navigation.navigate('VocabStared');
          },
          iconRight: course.skill === 'vocab' ? 'star' : undefined,
        }),
    });
  }, [course.name, course.skill, navigation]);

  if (course.skill === 'vocab') {
    return <VocabLesson />;
  }
  if (course.skill === 'grammar') {
    return <Content skill="grammar" />;
  }
  return <Content skill="pronounce" />;
};

export default Lesson;
