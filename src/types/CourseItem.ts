export interface CourseItem {
  objectId: string;
  skill: 'vocab' | 'grammar' | 'pronounce';
  name: string;
  cover: string;
  totalLesson: number;
  learnedLesson: number;
}
