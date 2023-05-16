import {CourseItem} from './../../types/CourseItem';
import {put, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {COURSE_ACTION} from '../actions';
import {PARSE_OBJ} from '../../constants/parseObject';
import {LearningLesson, PayloadAction} from '../../types';

function* getList(action: PayloadAction) {
  const courseQuery = new Parse.Query(PARSE_OBJ.course);
  const learningLessonQuery = new Parse.Query(PARSE_OBJ.learningLesson);
  const lessonQuery = new Parse.Query(PARSE_OBJ.lesson);
  const LIMITATION = 6;

  try {
    const vocabArr: CourseItem[] = yield courseQuery
      .contains('skill', 'vocab')
      .limit(LIMITATION)
      .find();
    const grammarArr: CourseItem[] = yield courseQuery
      .contains('skill', 'grammar')
      .limit(LIMITATION)
      .find();
    const pronounceArr: CourseItem[] = yield courseQuery
      .contains('skill', 'pronounce')
      .limit(LIMITATION)
      .find();

    const combinedArr: CourseItem[] = JSON.parse(
      JSON.stringify(vocabArr.concat(grammarArr, pronounceArr)),
    );

    const resultArr = combinedArr.map((course: CourseItem) => {
      course.totalLesson = 10;
      course.learnedLesson = 0;
      course.cover = course.cover.url;
      return course;
    });

    const lessonLearned: LearningLesson = yield learningLessonQuery
      .contains('idUser', action.payload)
      .find();

    console.log('lessonLearned', lessonLearned);
    // combinedArr.forEach((course: CourseItem) => {
    //   const totalLesson = lessonQuery.contains('idCourse', course.objectId);

    //   console.log('lessonLearned', getResultQuery(lessonLearned));
    // });

    yield put({type: COURSE_ACTION.UPDATE_LIST, payload: resultArr});
  } catch (error) {
    console.log(error);
  }
}

export default function* courseSaga() {
  yield takeLatest(COURSE_ACTION.GET_LIST, getList);
}
