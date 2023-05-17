import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {LearningLesson, Lesson} from '../types';

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

  const lessons: Lesson[] = lessonArr.map((lesson: Parse.Object) => {
    return {
      id: lesson.id,
      courseId: lesson.attributes.idCourse.id,
      title: lesson.attributes.title,
      image: lesson.attributes.image,
      word: lesson.attributes.word,
      wordMeaning: lesson.attributes.wordMeaning,
      pronouncing: lesson.attributes.pronouncing,
      sentencesEg: lesson.attributes.sentencesEg,
      video: lesson.attributes.video,
      description: lesson.attributes.description,
      summarizeLesson: lesson.attributes.summarizeLesson,
      pronouncingUsage: lesson.attributes.pronouncingUsage,
    };
  });

  const learningLessons: LearningLesson[] = learningLessonArr.map(
    (learningLessonItem: Parse.Object) => {
      return {
        id: learningLessonItem.id,
        courseId: learningLessonItem.attributes.idLesson.attributes.idCourse.id,
        lessonId: learningLessonItem.attributes.idLesson.id,
        userId: learningLessonItem.attributes.idUser.id,
        result: learningLessonItem.attributes.result,
      };
    },
  );

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
