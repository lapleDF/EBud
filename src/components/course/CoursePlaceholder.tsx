import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {COLORS} from '../../constants/color';
import {CoursePlaceholderStyles as styles} from './CoursePlaceholder.styles';

const CoursePlaceholder = () => {
  return (
    <SkeletonContent
      boneColor={COLORS.bgHeader}
      containerStyle={styles.containerPlaceholder}
      highlightColor={COLORS.bgGrey}
      animationDirection="diagonalDownLeft"
      layout={[
        styles.courseItem,
        styles.courseItemText,
        styles.courseItemLeft,
        styles.courseItemLeftText,
        styles.courseItemRight,
        styles.courseItemRightText,
        styles.courseItem2,
        styles.courseItem2Text,
        styles.courseItemLeft2,
        styles.courseItemLeft2Text,
        styles.courseItemRight2,
        styles.courseItemRight2Text,
      ]}
      isLoading={true}
    />
  );
};

export default CoursePlaceholder;
