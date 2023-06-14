import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

import {COLORS} from '../../constants/color';
import {SearchStyles as styles} from './Search.styles';
import {SPACING} from '../../constants/spacing';

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({searchValue, setSearchValue}: SearchProps) => {
  const offsetValue = useRef(new Animated.Value(SPACING.screenWidth)).current;
  const refInput = useRef<TextInput>(null);

  const [isOpen, setIsOpen] = useState(false);

  const transformAnimate = {
    transform: [{translateX: offsetValue}],
  };

  const handlePressIcon = () => {
    if (isOpen) {
      setSearchValue('');
      refInput.current?.clear();
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[styles.wrapInputFiled, transformAnimate]}>
        <TextInput
          onChangeText={text => setSearchValue(text)}
          ref={refInput}
          defaultValue={searchValue}
          placeholder="Tìm kiếm sách"
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

export default Search;
