import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import CSContainer from '../../components/core/CSContainer';
import {RootState} from '../../store/store';
import {CourseItem, User} from '../../types';
import {SectionList, StyleSheet, View} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {myCourseList} from '../../../data';
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
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        if (user !== null) {
          return HeaderScreen({
            avatar: user.avatar,
            textLeft: user.username,
            textRight: user.totalStreak?.toString(),
            iconRight: 'flame',
          });
        } else {
          return null;
        }
      },
    });
  });

  const courseSectionArr = (skill: string) => {
    const filteredArr = myCourseList.filter(item => item.skill === skill);
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
            filtedArray={myCourseList.filter(
              course => course.skill === section.skill,
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
