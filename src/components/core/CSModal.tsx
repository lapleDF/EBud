import {StyleProp, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {CSLayout} from './CSLayout';
import {CSModalStyles as styles} from './CSModal.styles';

interface CSModalProps {
  refRBSheet: any;
  height?: number | string;
  isShowCloseBtn?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<any>;
  styleContainer?: StyleProp<any>;
}

const CSModal = (props: CSModalProps) => {
  const {
    refRBSheet,
    height = 'auto',
    isShowCloseBtn = true,
    children,
    style,
    styleContainer,
  } = props;
  const containerRBS = {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    width: SPACING.screenWidth - SPACING.px * 2,
    position: 'absolute',
    shadowColor: COLORS.black,
    backgroundColor: COLORS.bgDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    height: height,
    elevation: 6,
    ...style,
  };
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      animationType="slide"
      customStyles={{
        container: containerRBS,
        wrapper: styles.wrapper,
      }}>
      {isShowCloseBtn && (
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={styles.closeBtn}>
          <Icon name="x" size={26} color={COLORS.red} />
        </TouchableOpacity>
      )}
      <CSLayout style={[styles.container, styleContainer]}>{children}</CSLayout>
    </RBSheet>
  );
};

export {CSModal};
