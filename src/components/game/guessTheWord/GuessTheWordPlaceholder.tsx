import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {COLORS} from '../../../constants/color';
import {SPACING} from '../../../constants/spacing';
import {GuessTheWordPlaceholderStyles as styles} from './GuessTheWordPlaceholder.styles';

const LAYOUT_IMAGE = [
  ...Array(6).fill({
    width: '45%',
    height: SPACING.screenHeight * 0.18,
    borderRadius: 10,
  }),
];

const LAYOUT_ANSWER = [
  ...Array(6).fill({
    width: '45%',
    height: SPACING.screenHeight * 0.08,
    borderRadius: 10,
  }),
];

const LAYOUTS = LAYOUT_IMAGE.concat(LAYOUT_ANSWER);

const GuessTheWordPlaceholder = () => {
  return (
    <SkeletonContent
      containerStyle={styles.container}
      boneColor={COLORS.bgHeader}
      highlightColor={COLORS.bgGrey}
      animationDirection="diagonalDownLeft"
      layout={LAYOUTS}
      isLoading={true}
    />
  );
};

export default GuessTheWordPlaceholder;
