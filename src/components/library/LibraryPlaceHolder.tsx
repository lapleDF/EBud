import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {BookItemStyles as styles} from './BookItem.styles';
import {COLORS} from '../../constants/color';

const LibraryPlaceHolder = () => {
  return (
    <SkeletonContent
      boneColor={COLORS.bgHeader}
      containerStyle={styles.containerPlaceholder}
      highlightColor={COLORS.bgGrey}
      animationDirection="diagonalDownLeft"
      layout={[...Array(6).fill(styles.imgWrap)]}
      isLoading={true}
    />
  );
};

export default LibraryPlaceHolder;
