import React from 'react';

import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';
import CSButton from '../components/core/CSButton';

const Home = () => {
  return (
    <CSContainer>
      <CSText>Welcome to the home page</CSText>
      <CSButton onPress={() => {}} title="test" />
    </CSContainer>
  );
};

export default Home;
