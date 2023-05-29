export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  desc: string;
  type: 'comic' | 'magazine';
  fileUrl: string;
  audioUrl?: string;
  isSaved: boolean;
}
