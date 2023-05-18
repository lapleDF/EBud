import HeaderScreen from '../../components/HeaderScreen';
import Courses from '../../screens/course/Courses';
import Lesson from '../../screens/course/Lesson';
import VocabStared from '../../screens/course/VocabStared';

export const COURSE_ROUTE = [
  {
    name: 'course',
    component: Courses,
    options: {headerShown: true},
  },
  {
    name: 'lesson',
    component: Lesson,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Lesson'}),
    },
  },
  {
    name: 'vocabStared',
    component: VocabStared,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Từ vựng đã lưu'}),
    },
  },
];
