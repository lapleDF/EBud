export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  totalStreak?: number;
  totalMedal?: number;
  createdAt?: Date;
  desc?: string;
  learntLesson: number;
}
