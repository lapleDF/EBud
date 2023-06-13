import {PlayingGame} from './PlayingGame';

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  totalStreak: number;
  totalMedal: number;
  createdAt?: Date;
  desc: string;
  learntLesson: number;
  game: PlayingGame[];
}
