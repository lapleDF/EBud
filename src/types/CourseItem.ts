export interface CourseItem {
  id: string;
  skill: 'vocab' | 'grammar' | 'pronounce';
  name: string;
  cover: string;
  totalLesson: number;
  learnedLesson: number;
}
