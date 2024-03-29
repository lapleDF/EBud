import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {COURSE_ROUTE} from '../constants/route/course.constant';
import type {CourseStackParamList} from '../types/navigation/types';

const CourseStack = createStackNavigator<CourseStackParamList>();

const CourseNavigator = () => {
  return (
    <CourseStack.Navigator>
      {COURSE_ROUTE.map(route => (
        <CourseStack.Screen
          name={route.name}
          key={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </CourseStack.Navigator>
  );
};

export default CourseNavigator;
