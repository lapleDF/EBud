import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import HeaderScreen from '../../components/HeaderScreen';
import CSText from '../../components/core/CSText';
import CSLayout from '../../components/core/CSLayout';

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
