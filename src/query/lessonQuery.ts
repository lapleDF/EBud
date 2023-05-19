import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {convertLessonData} from '../utils';
import {Lesson, PayloadAction} from '../types';

export const getLessonList = async (action: PayloadAction) => {
  const lessonQuery = new Parse.Query(PARSE_OBJ.lesson);

  const lessonArr = await lessonQuery
    .contains('idCourse', action.payload.courseId)
    .find();

  const lessons: Lesson[] = convertLessonData(lessonArr);
  return lessons;
};
