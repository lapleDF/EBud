import {PlayingGame} from './PlayingGame';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  totalStreak: number;
  totalMedal: number;
  createdAt?: Date;
  desc: string;
  learntLesson: number;
  game: PlayingGame[];
}
