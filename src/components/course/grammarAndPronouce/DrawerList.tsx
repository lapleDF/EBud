import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import React, {useEffect, useImperativeHandle, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../../core';
import {COLORS} from '../../../constants/color';
import {SPACING} from '../../../constants/spacing';

interface DrawerListProps {
  data: string[];
  ref: React.Ref<any>;
  onPressItem: () => void;
}

const WIDTH = SPACING.screenWidth - 80;

const DrawerList = ({data, onPressItem, ref}: DrawerListProps) => {
  const refDrawer = useRef(new Animated.Value(0)).current;

  const transformAnimate = {
    transform: [{translateX: refDrawer}],
  };

  useImperativeHandle(ref, () => ({
    handleClose,
  }));
  const handleClose = () => {
    Animated.spring(refDrawer, {
      toValue: -WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.timing(refDrawer, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  }, [refDrawer]);
  return (
    <Animated.View style={[styles.container, transformAnimate]}>
      <TouchableOpacity onPress={handleClose}>
        <Icon name="close" size={40} color={COLORS.red} />
      </TouchableOpacity>
      {data.map((_, idx: number) => (
        <TouchableOpacity
          style={styles.drawerItem}
          key={idx}
          onPress={onPressItem}>
          <CSText textProps={{numberOfLines: 2}}>
            <CSText>{`Bài ${idx + 1}:`}</CSText> Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Voluptas, iusto!
          </CSText>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default DrawerList;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: COLORS.bgHeader,
    position: 'absolute',
    zIndex: 2,
    height: SPACING.screenHeight - 60,
    left: 0,
    paddingHorizontal: SPACING.px,
  },
  drawerItem: {
    width: '100%',
    paddingBottom: 15,
  },
});
