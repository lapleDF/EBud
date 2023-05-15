export interface Book {
  objectId: string;
  title: string;
  author: string;
  cover: string;
  desc: string;
  content: string;
  type: 'comic' | 'magazine';
}
