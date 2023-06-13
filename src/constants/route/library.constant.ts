import BookContent from '../../screens/library/BookContent';
import BookPreview from '../../screens/library/BookPreview';
import FavoriteList from '../../screens/library/FavoriteList';
import Library from '../../screens/library/Library';
import type {LibraryStackParamList} from '../../types/navigation/types';

interface LibraryRouteProps {
  name: keyof LibraryStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const LIBRARY_ROUTE: LibraryRouteProps[] = [
  {
    name: 'Library',
    component: Library,
    options: {headerShown: true},
  },
  {
    name: 'Preview',
    component: BookPreview,
    options: {headerShown: true},
  },
  {
    name: 'Conttent',
    component: BookContent,
    options: {headerShown: false},
  },
  {
    name: 'Favorite',
    component: FavoriteList,
    options: {headerShown: true},
  },
];
