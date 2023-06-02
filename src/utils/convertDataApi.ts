import Parse from 'parse/react-native';
import {LearningLesson, Lesson} from '../types';

export const convertLessonData = (
  lessonArr: Array<Parse.Object>,
  favoriteList: Array<Parse.Object>,
  learningLessonArr: Array<Parse.Object> = [],
) => {
  const lessons: Lesson[] = lessonArr.map((lesson: Parse.Object) => {
    return {
      id: lesson.id,
      courseId: lesson.attributes.idCourse.id,
      title: lesson.attributes.title,
      image: lesson.attributes.image?._url,
      poster: lesson.attributes?.posterVideo,
      stared:
        favoriteList.filter(
          (item: Parse.Object) => item.attributes.lessonId.id === lesson.id,
        ).length !== 0
          ? true
          : false,
      word: lesson.attributes.word,
      wordMeaning: lesson.attributes.wordMeaning,
      pronouncing: lesson.attributes.pronouncing,
      sentencesEg: lesson.attributes.sentencesEg,
      video: lesson.attributes.video,
      description: lesson.attributes.description,
      summarizeLesson: lesson.attributes.summarizeLesson,
      pronouncingUsage: lesson.attributes.pronouncingUsage,
      isLearned:
        learningLessonArr.filter(
          item => item?.attributes?.idLesson?.id === lesson.id,
        ).length !== 0
          ? true
          : false,
    };
  });
  return lessons;
};

export const convertLearningLessonData = (
  learningLessonArr: Array<Parse.Object>,
) => {
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
  return learningLessons;
};
