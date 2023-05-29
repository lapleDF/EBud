import BookContent from '../../screens/library/BookContent';
import BookPreview from '../../screens/library/BookPreview';
import FavoriteList from '../../screens/library/FavoriteList';
import Library from '../../screens/library/Library';

export const LIBRARY_ROUTE = [
  {
    name: 'library',
    component: Library,
    options: {headerShown: true},
  },
  {
    name: 'preview',
    component: BookPreview,
    options: {headerShown: true},
  },
  {
    name: 'content',
    component: BookContent,
    options: {headerShown: false},
  },
  {
    name: 'favorite',
    component: FavoriteList,
    options: {headerShown: false},
  },
];
