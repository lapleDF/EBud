import {FlatList, StyleSheet} from 'react-native';
import React from 'react';

import GroupCourseRender from './GroupCourseRender';
import {myCourseList} from '../../../data';
import {splitChunkArray} from '../../utils/splitChunkArray';

interface CourseListProps {
  skillFilter: string;
}
const CoursList = (props: CourseListProps) => {
  const GROUP_COURSE_LENGTH = 3;

  const filteredCourseList = myCourseList.filter(
    item => item.skill === props.skillFilter,
  );

  const chunkArrays = splitChunkArray(filteredCourseList, GROUP_COURSE_LENGTH);

  return (
    <FlatList
      renderItem={({item}) => (
        <GroupCourseRender filtedArray={filteredCourseList} groupItem={item} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      data={chunkArrays}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
});

export default CoursList;
