import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {convertLessonData} from '../utils';
import {Lesson, PayloadAction} from '../types';

export const getLessonList = async (action: PayloadAction) => {
  const lessonQuery = new Parse.Query(PARSE_OBJ.lesson);
  const favoriteListQuery = new Parse.Query(PARSE_OBJ.favoriteList);
  const learningLessonQuery = new Parse.Query(PARSE_OBJ.learningLesson);

  const lessonArr = await lessonQuery
    .contains('idCourse', action.payload.courseId)
    .find();
  const favoriteList = await favoriteListQuery.find();
  const learningLessonList = await learningLessonQuery.find();

  const lessons: Lesson[] = convertLessonData(
    lessonArr,
    favoriteList,
    learningLessonList,
  );
  return lessons;
};

export const addLessonToFavoriteList = async (id: string) => {
  const favoriteListQuery = new Parse.Query(PARSE_OBJ.favoriteList);
  const favoriteListObj = new Parse.Object(PARSE_OBJ.favoriteList);
  const favoriteList: Parse.Object[] = await favoriteListQuery
    .contains('lessonId', id)
    .find();

  if (favoriteList.length !== 0) {
    try {
      favoriteListObj.set('objectId', favoriteList[0].id);
      await favoriteListObj.destroy();
      return false;
    } catch (error) {
      console.log('Error delete favorite list: ', error);
    }
  }
  const lessonQuery = new Parse.Object(PARSE_OBJ.lesson);
  lessonQuery.set('objectId', id);

  try {
    favoriteListObj.set('lessonId', lessonQuery);
    await favoriteListObj.save();
    return true;
  } catch (error) {
    console.log('Error add favorite list: ', error);
  }
};
