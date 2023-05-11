import Courses from '../../screens/course/Courses';
import GrammarLesson from '../../screens/course/GrammarLesson';
import PronounciationLesson from '../../screens/course/PronounciationLesson';
import VocabLesson from '../../screens/course/VocabLesson';

export const COURSE_ROUTE = [
  {
    name: 'course',
    component: Courses,
    options: {headerShown: true},
  },
  {
    name: 'grammar',
    component: GrammarLesson,
    options: {headerShown: false},
  },
  {
    name: 'vocab',
    component: VocabLesson,
    options: {headerShown: false},
  },
  {
    name: 'pronounce',
    component: PronounciationLesson,
    options: {headerShown: false},
  },
];
