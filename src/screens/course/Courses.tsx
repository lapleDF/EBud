import {RefreshControl, SectionList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {AppDispatch, RootState} from '../../store/store';
import {CourseItem, CourseList, User} from '../../types';
import {SPACING} from '../../constants/spacing';
import {CSButton} from '../../components/core/CSButton';
import {splitChunkArray} from '../../utils';
import {CSLayout, CSLoading} from '../../components/core';
import {COURSE_ACTION} from '../../store/actions';
import SectionHeader from '../../components/sectionList/SectionHeader';
import {BottomTabScreenProps} from '../../types/navigation/types';
import GroupCourse from '../../components/course/GroupCourse';

export interface SectionCourseProps {
  title: string;
  skill: 'vocab' | 'grammar' | 'pronounce';
  data: CourseItem[][];
}

const Courses = () => {
  const navigation =
    useNavigation<BottomTabScreenProps<'CourseNavigator'>['navigation']>();
  const state: RootState = useSelector((rootState: RootState) => rootState);
  const user: User = state.user;
  const course: CourseList = state.course;

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          avatar: user.avatar,
          textLeft: user.username,
          textRight: user.totalStreak?.toString(),
          iconRight: 'flame',
        }),
    });
  });

  const handleSeeMore = (skill: string) => {
    console.log('See more ', skill);
  };

  const courseSectionArr = (skill: string) => {
    const filteredArr = course.list.filter(item => item.skill === skill);
    return splitChunkArray(filteredArr, 3);
  };

  const renderSectionFooter = (section: SectionCourseProps) => {
    const LIMIT = 12;
    if (course.list.length > LIMIT) {
      return (
        <View style={styles.footerSection}>
          <CSButton
            title="Xem thêm"
            onPress={() => handleSeeMore(section.skill)}
          />
        </View>
      );
    }
    return null;
  };

  const SECTION: SectionCourseProps[] = [
    {
      title: 'Từ vựng',
      skill: 'vocab',
      data: courseSectionArr('vocab'),
    },
    {
      title: 'Ngữ pháp',
      skill: 'grammar',
      data: courseSectionArr('grammar'),
    },
    {
      title: 'Phát âm',
      skill: 'pronounce',
      data: courseSectionArr('pronounce'),
    },
  ];

  const onRefresh = () => {
    AppDispatch(COURSE_ACTION.GET_LIST, user.id);
  };

  return (
    <CSLayout>
      {course.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <SectionList
          sections={SECTION}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section}) => (
            <SectionHeader sectionCourse={section} />
          )}
          renderSectionFooter={({section}) => renderSectionFooter(section)}
          contentContainerStyle={styles.contentContainerSection}
          renderItem={({item, section}) => (
            <GroupCourse
              filtedArray={course.list.filter(
                courseItem => courseItem.skill === section.skill,
              )}
              groupItem={item}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      )}
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  footerSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainerSection: {
    paddingHorizontal: SPACING.px,
    paddingBottom: SPACING.heightBottomTab,
  },
  headerSection: {
    marginTop: 40,
  },
});

export default Courses;
