import {SectionList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {RootState} from '../../store/store';
import {CourseItem, CourseList, User} from '../../types';
import {SPACING} from '../../constants/spacing';
import GroupCourseRender from '../../components/course/GroupCourseRender';
import {CSButton} from '../../components/core/CSButton';
import {splitChunkArray} from '../../utils';
import {CSLayout, CSLoading, CSText} from '../../components/core';

interface sectionProps {
  title: string;
  skill: string;
  data: CourseItem[][];
}

const Courses = () => {
  const navigation = useNavigation();
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

  const renderSectionFooter = (section: sectionProps) => {
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
    } else {
      return null;
    }
  };

  const SECTION: sectionProps[] = [
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

  return (
    <CSLayout>
      {course.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <SectionList
          sections={SECTION}
          renderSectionHeader={({section}) => (
            <CSText size={'lg'} variant="PoppinsBold">
              {section.title}
            </CSText>
          )}
          renderSectionFooter={({section}) => renderSectionFooter(section)}
          contentContainerStyle={styles.contentContainerSection}
          renderItem={({item, section}) => (
            <GroupCourseRender
              filtedArray={course.list.filter(
                courseItem => courseItem.skill === section.skill,
              )}
              groupItem={item}
            />
          )}
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
    paddingBottom: 90,
  },
});

export default Courses;
