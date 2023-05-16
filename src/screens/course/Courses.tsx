import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import CSContainer from '../../components/core/CSContainer';
import {RootState} from '../../store/store';
import {CourseItem, CourseList, User} from '../../types';
import {SectionList, StyleSheet, View} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {splitChunkArray} from '../../utils/handleArray';
import CSText from '../../components/core/CSText';
import GroupCourseRender from '../../components/course/GroupCourseRender';
import {CSButton} from '../../components/core/CSButton';

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

  const courseSectionArr = (skill: string) => {
    const filteredArr = course.list.filter(item => item.skill === skill);
    return splitChunkArray(filteredArr, 3);
  };

  const renderSectionFooter = (section: sectionProps) => (
    <View style={styles.footerSection}>
      <CSButton
        title="Xem thêm"
        onPress={() => {
          console.log(section.skill);
        }}
      />
    </View>
  );

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
    <CSContainer>
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
    </CSContainer>
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
