import {Book} from './Book';

export interface BookFavoriteList {
  list: Book[];
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
}
