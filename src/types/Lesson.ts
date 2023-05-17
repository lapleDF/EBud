import {SentenceEg} from './SentenceEg';

export interface Lesson {
  id: string;
  courseId: string;
  title?: string;
  image?: string;
  word?: string;
  wordMeaning?: string;
  pronouncing?: string;
  sentencesEg: SentenceEg[];
  video?: string;
  description?: string;
  summarizeLesson?: string;
  pronouncingUsage?: string;
}
