import {CourseItem} from './CourseItem';

export interface CourseList {
  list: CourseItem[];
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
}
