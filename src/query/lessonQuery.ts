import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {convertLessonData} from '../utils';
import type {Lesson, PayloadAction} from '../types';

export const getLessonList = async (action: PayloadAction, userId: string) => {
  const lessonQuery = new Parse.Query(PARSE_OBJ.lesson);
  const favoriteListQuery = new Parse.Query(PARSE_OBJ.favoriteList);
  const learningLessonQuery = new Parse.Query(PARSE_OBJ.learningLesson);

  const lessonArr = await lessonQuery
    .contains('idCourse', action.payload.courseId)
    .find();
  const favoriteList = await favoriteListQuery
    .contains('userId', userId)
    .find();
  const learningLessonList = await learningLessonQuery
    .contains('idUser', userId)
    .find();

  const lessons: Lesson[] = convertLessonData(
    lessonArr,
    favoriteList,
    learningLessonList,
  );
  return lessons;
};

export const addLessonToFavoriteList = async (id: string, userId: string) => {
  const favoriteListQuery = new Parse.Query(PARSE_OBJ.favoriteList);
  const favoriteListObj = new Parse.Object(PARSE_OBJ.favoriteList);
  const favoriteList: Parse.Object[] = await favoriteListQuery
    .contains('lessonId', id)
    .contains('userId', userId)
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
  const userQuery = new Parse.User();
  lessonQuery.set('objectId', id);
  userQuery.set('objectId', userId);

  try {
    favoriteListObj.set('lessonId', lessonQuery);
    favoriteListObj.set('userId', userQuery);
    await favoriteListObj.save();
    return true;
  } catch (error) {
    console.log('Error add favorite list: ', error);
  }
};

export const completeLessonQuery = async (userId: string, lessonId: string) => {
  const lessonQuery = new Parse.Object(PARSE_OBJ.lesson);
  const userQuery = new Parse.User();

  lessonQuery.set('objectId', lessonId);
  userQuery.set('objectId', userId);

  const learningLessonObj = new Parse.Object(PARSE_OBJ.learningLesson);
  learningLessonObj.set('idLesson', lessonQuery);
  learningLessonObj.set('idUser', userQuery);

  try {
    await learningLessonObj.save();
  } catch (error) {
    console.log('learning lesson query error: ', error);
  }
};
