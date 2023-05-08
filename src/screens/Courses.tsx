import React from 'react';

import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';
import axios from 'axios';

const Courses = () => {
  axios
    .get('http://192.168.88.100:1337/users')
    .then(res => console.log('Response', res.data))
    .catch(err => console.log('ERRORRRRR: ', err));
  return (
    <CSContainer>
      <CSText>Courses</CSText>
    </CSContainer>
  );
};

export default Courses;
