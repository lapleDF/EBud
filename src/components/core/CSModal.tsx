import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import CSLayout from './CSLayout';

interface CSModalProps {
  refRBSheet: any;
  height?: number | string;
  closeBtn?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<any>;
}

const CSModal = (props: CSModalProps) => {
  const {refRBSheet, height = 'auto', closeBtn = true, children, style} = props;
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      animationType="slide"
      customStyles={{
        container: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: height,
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

          elevation: 6,
          ...style,
        },
        wrapper: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      {closeBtn && (
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={styles.closeBtn}>
          <Icon name="x" size={26} color={COLORS.red} />
        </TouchableOpacity>
      )}
      <CSLayout style={styles.container}>{children}</CSLayout>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: SPACING.px,
    paddingTop: 40,
    gap: 10,
  },
});

export default CSModal;
