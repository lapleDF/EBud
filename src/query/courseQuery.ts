import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {LearningLesson, Lesson} from '../types';
import {convertLearningLessonData, convertLessonData} from '../utils';

export const getCourseList = async (idUser: string) => {
  const courseQuery = new Parse.Query(PARSE_OBJ.course);
  const learningLessonQuery = new Parse.Query(PARSE_OBJ.learningLesson);
  const lessonQuery = new Parse.Query(PARSE_OBJ.lesson);
  const LIMITATION = 20;

  const coursesArr = await courseQuery.limit(LIMITATION).find();
  const lessonArr = await lessonQuery.find();
  const learningLessonArr = await learningLessonQuery
    .contains('idUser', idUser)
    .find();

  const lessons: Lesson[] = convertLessonData(lessonArr);

  const learningLessons: LearningLesson[] =
    convertLearningLessonData(learningLessonArr);

  const courses = coursesArr.map((courseItem: Parse.Object) => {
    return {
      id: courseItem.id,
      cover: courseItem.attributes.cover._url,
      name: courseItem.attributes.name,
      skill: courseItem.attributes.skill,
      totalLesson: lessons.filter(
        (lessonItem: Lesson) => lessonItem.courseId === courseItem.id,
      ).length,
      learnedLesson: learningLessons.filter(
        (learning: LearningLesson) => learning.courseId === courseItem.id,
      ).length,
    };
  });

  return courses;
};
