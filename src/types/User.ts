export interface User {
  objectId: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  totalStreak?: number;
  totalMedal?: number;
  createdAt?: Date;
  desc?: string;
}
