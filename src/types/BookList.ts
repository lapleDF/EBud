import {Book} from './Book';

export interface BookList {
  list: Book[];
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  fetchingStatus: 'loading' | 'idle' | 'error';
}
