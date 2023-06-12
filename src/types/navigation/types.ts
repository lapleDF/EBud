import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import {CourseItem} from '../CourseItem';
import {Game} from '../Game';
import {Book} from '../Book';

export type RootStackParamList = {
  Onboarding: undefined;
  Authentication: NavigatorScreenParams<AuthStackParamList> | undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined;
  CourseNavigator: NavigatorScreenParams<CourseStackParamList> | undefined;
  LibraryNavigator: NavigatorScreenParams<LibraryStackParamList> | undefined;
  GameNavigator: NavigatorScreenParams<GameStackParamList> | undefined;
  AccountNavigator: NavigatorScreenParams<AccountStackParamList> | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type BottomTabParamList = {
  Course: NavigatorScreenParams<CourseStackParamList> | undefined;
  Library: NavigatorScreenParams<LibraryStackParamList> | undefined;
  Game: NavigatorScreenParams<GameStackParamList> | undefined;
  Account: NavigatorScreenParams<AccountStackParamList> | undefined;
};

export type CourseStackParamList = {
  Course: undefined;
  Lesson: {course: CourseItem};
  VocabStared: undefined;
};

export type LibraryStackParamList = {
  Library: undefined;
  Preview: {bookId: string};
  Conttent: {bookItem: Book};
  Favorite: undefined;
};

export type GameStackParamList = {
  Game: undefined;
  GamePlaying: {gameItem: Game};
};

export type AccountStackParamList = {
  Account: undefined;
  Appearance: undefined;
  UserInfo: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  StackScreenProps<BottomTabParamList, T>;

export type CourseScreenProps<T extends keyof CourseStackParamList> =
  StackScreenProps<CourseStackParamList, T>;

export type GameScreenProps<T extends keyof GameStackParamList> =
  StackScreenProps<GameStackParamList, T>;

export type AccountScreenProps<T extends keyof AccountStackParamList> =
  StackScreenProps<AccountStackParamList, T>;

export type LibraryScreenProps<T extends keyof LibraryStackParamList> =
  StackScreenProps<LibraryStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
