import {StyleSheet} from 'react-native';
import React from 'react';

import {CSText} from '../core';
import {SectionBookProps} from '../../screens/library/Library';
import {SectionCourseProps} from '../../screens/course/Courses';

interface SectionHeaderProps {
  sectionCourse?: SectionCourseProps;
  sectionBook?: SectionBookProps;
}

const SectionHeader = ({sectionBook, sectionCourse}: SectionHeaderProps) => {
  return (
    <CSText
      size={'xlg'}
      variant="PoppinsBold"
      style={
        ((sectionBook && sectionBook?.type !== 'comic') ||
          (sectionCourse && sectionCourse?.skill !== 'vocab')) &&
        styles.headerSection
      }>
      {sectionBook?.title || sectionCourse?.title}
    </CSText>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  headerSection: {
    marginTop: 40,
  },
});
