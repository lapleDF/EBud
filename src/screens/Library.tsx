import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import HeaderScreen from '../components/HeaderScreen';
import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';

const Library = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => HeaderScreen({iconLeft: 'heart', iconRight: 'search'}),
    });
  });
  return (
    <CSContainer>
      <CSText>Library</CSText>
    </CSContainer>
  );
};

export default Library;
