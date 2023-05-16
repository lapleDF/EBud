import {SentenceEg} from './SentenceEg';

export interface Lesson {
  objectId: string;
  idCourse: string;
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
