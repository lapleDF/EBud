import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {sizeText} from '../../components/core';
import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';
import {SPACING} from '../../constants/spacing';

const Search = () => {
  const [value, setValue] = useState('');
  const offsetValue = useRef(new Animated.Value(SPACING.screenWidth)).current;
  const refInput = useRef<TextInput>(null);
  const [isOpen, setIsOpen] = useState(false);

  const transformAnimate = {
    transform: [{translateX: offsetValue}],
  };
  const handleSubmit = () => {
    console.log('submited');
  };

  const handlePressIcon = () => {
    if (isOpen) {
      setValue('');
      refInput.current?.blur();
    } else {
      refInput.current?.focus();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    Animated.spring(offsetValue, {
      toValue: isOpen ? 0 : SPACING.screenWidth,
      useNativeDriver: false,
    }).start();
  }, [isOpen, offsetValue]);
  return (
    <KeyboardAvoidingView
      style={styles.searchContainer}
      enabled
      behavior="height">
      <Animated.View style={[styles.wrapInputFiled, transformAnimate]}>
        <TextInput
          onChangeText={text => setValue(text)}
          ref={refInput}
          defaultValue={value}
          placeholder="Tìm kiếm sách"
          onSubmitEditing={handleSubmit}
          style={styles.searchField}
        />
      </Animated.View>
      <TouchableOpacity
        style={styles.searchIcon}
        activeOpacity={0.7}
        onPress={handlePressIcon}>
        <Icon
          name={isOpen ? 'close' : 'search'}
          size={35}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '86%',
    height: 60,
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
  },
  wrapInputFiled: {
    width: '100%',
    height: '100%',
  },
  searchField: {
    width: '100%',
    height: '100%',
    paddingLeft: 15,
    fontFamily: FONTS.PoppinsRegular,
    backgroundColor: COLORS.bgHeader,
    fontSize: sizeText.md,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    backgroundColor: COLORS.bgHeader,
    paddingHorizontal: SPACING.px,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
