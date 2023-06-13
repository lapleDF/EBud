import Parse from 'parse/react-native';
import type {
  Book,
  Game,
  GuessTheWordItem,
  LearningLesson,
  Lesson,
} from '../types';

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
          (item: Parse.Object) => item.attributes?.lessonId?.id === lesson.id,
        ).length !== 0,
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
        ).length !== 0,
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

export const convertBookData = (
  bookArr: Parse.Object[],
  favoriteArr: Parse.Object[],
) => {
  const books: Book[] = bookArr.map((book: Parse.Object) => {
    return {
      id: book.id,
      author: book.attributes.author,
      fileUrl: book.attributes.fileUrl,
      cover: book.attributes.cover,
      desc: book.attributes.desc,
      title: book.attributes.title,
      type: book.attributes.type,
      audioUrl: book.attributes?.audioUrl,
      trackAudio: book.attributes?.trackAudio,
      isSaved:
        favoriteArr.filter(item => item.attributes?.bookId?.id === book.id)
          .length !== 0,
    };
  });
  return books;
};

export const convertGameData = (gameArr: Parse.Object[]) => {
  const games: Game[] = gameArr.map((game: Parse.Object) => {
    return {
      id: game.id,
      name: game.attributes?.name,
      cover: game.attributes?.cover?._url,
      rule: game.attributes?.rule,
      type: game.attributes?.type,
    };
  });
  return games;
};

export const convertGuessTheWordGameData = (
  guessTheWordGameArr: Parse.Object[],
) => {
  const result: GuessTheWordItem[] = guessTheWordGameArr.map(
    (game: Parse.Object) => {
      return {
        id: game.id,
        image: game.attributes?.image,
        word: game.attributes?.word,
        level: game.attributes?.level,
      };
    },
  );
  return result;
};
