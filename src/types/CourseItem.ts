import {ImageSourcePropType} from 'react-native';

export interface CourseItem {
  objectId: string;
  skill: 'vocab' | 'grammar' | 'pronounce';
  name: string;
  cover: ImageSourcePropType; // todo: replace with string
  totalLesson: number;
  learnedLesson: number;
}
