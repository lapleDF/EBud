import React, {useRef} from 'react';

import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';
import CSButton from '../components/core/CSButton';
import CSModal from '../components/core/CSModal';

const Home = () => {
  const ref = useRef<any>(null);
  return (
    <CSContainer>
      <CSText>Welcome to the home page</CSText>
      <CSModal refRBSheet={ref}>
        <CSText>this is the modal</CSText>
      </CSModal>
      <CSButton
        onPress={() => {
          ref.current.open();
        }}
        title="press me"
      />
    </CSContainer>
  );
};

export default Home;
