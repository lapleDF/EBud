import HeaderScreen from '../../components/HeaderScreen';
import Courses from '../../screens/course/Courses';
import Lesson from '../../screens/course/Lesson';
import VocabStared from '../../screens/course/VocabStared';
import {CourseStackParamList} from '../../types/navigation/types';

interface CourseRouteProps {
  name: keyof CourseStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const COURSE_ROUTE: CourseRouteProps[] = [
  {
    name: 'Course',
    component: Courses,
    options: {headerShown: true},
  },
  {
    name: 'Lesson',
    component: Lesson,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Lesson'}),
    },
  },
  {
    name: 'VocabStared',
    component: VocabStared,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Từ vựng đã lưu'}),
    },
  },
];
