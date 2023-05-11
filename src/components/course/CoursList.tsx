import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import GroupCourseRender from './GroupCourseRender';

interface CourseListProps {
  skillFilter: string;
}
const CoursList = (props: CourseListProps) => {
  console.log(props.skillFilter);
  return (
    <FlatList
      renderItem={() => <GroupCourseRender />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      data={[...Array(6)]}
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
