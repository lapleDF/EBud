export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  totalStreak?: number;
  totalMedal?: number;
  createdAt?: Date;
  desc?: string;
}
