import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {CSText} from '../../core';
import {COLORS} from '../../../constants/color';
import {SPACING} from '../../../constants/spacing';
import type {Lesson} from '../../../types';

export interface PlaylistProps {
  data: Lesson[];
  onPressItem: (index: number) => void;
  activeIndex: number;
  open: boolean;
}

const WIDTH = SPACING.screenWidth - 80;

const Playlist = ({
  data,
  onPressItem,
  activeIndex,
  open = false,
}: PlaylistProps) => {
  const refDrawer = useRef(new Animated.Value(-WIDTH)).current;

  const transformAnimate = {
    transform: [{translateX: refDrawer}],
  };

  useEffect(() => {
    if (open) {
      Animated.timing(refDrawer, {
        toValue: 0,
        useNativeDriver: true,
        duration: 300,
      }).start();
    } else {
      Animated.spring(refDrawer, {
        toValue: -WIDTH,
        useNativeDriver: true,
      }).start();
    }
  }, [open, refDrawer]);

  return (
    <>
      <Animated.View style={[styles.container, transformAnimate]}>
        {data.map((item, idx: number) => (
          <TouchableOpacity
            style={styles.drawerItem}
            key={idx}
            onPress={() => onPressItem(idx)}>
            <CSText
              textProps={{numberOfLines: 2}}
              color={activeIndex === idx ? 'primaryDark' : 'whiteText'}>
              {`Bài ${idx + 1}: ${item?.title}`}
            </CSText>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: COLORS.bgHeader,
    position: 'absolute',
    zIndex: 3,
    height: SPACING.screenHeight - 60,
    left: 0,
    paddingHorizontal: SPACING.px,
  },
  drawerItem: {
    width: '100%',
    paddingBottom: 15,
  },
});
