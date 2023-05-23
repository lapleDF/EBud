import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import HeaderScreen from '../../components/HeaderScreen';
import {CSLayout, CSText} from '../../components/core';

const Library = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => HeaderScreen({iconLeft: 'heart', iconRight: 'search'}),
    });
  });
  return (
    <CSLayout>
      <CSText>Library</CSText>
    </CSLayout>
  );
};

export default Library;
