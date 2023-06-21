import React from 'react';

import {GameItemStyles as styles} from './GameItem.styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {COLORS} from '../../constants/color';

const GameItemPlaceholder = () => {
  return (
    <SkeletonContent
      boneColor={COLORS.bgHeader}
      containerStyle={styles.containerPlaceholder}
      highlightColor={COLORS.bgGrey}
      animationDirection="diagonalDownLeft"
      layout={[...Array(2).fill(styles.gameItem)]}
      isLoading={true}
    />
  );
};

export default GameItemPlaceholder;
