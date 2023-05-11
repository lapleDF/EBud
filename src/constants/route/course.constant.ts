import Courses from '../../screens/course/Courses';
import Lesson from '../../screens/course/Lesson';

export const COURSE_ROUTE = [
  {
    name: 'course',
    component: Courses,
    options: {headerShown: true},
  },
  {
    name: 'lesson',
    component: Lesson,
    options: {headerShown: false},
  },
];
