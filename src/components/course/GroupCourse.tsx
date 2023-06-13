import {View} from 'react-native';
import React from 'react';

import {CourseItem} from '../../types';
import {CircleProgress, Line, MainElement} from './material';
import {GroupCourseStyles as styles} from './GroupCourse.styles';

interface GroupCourseProps {
  groupItem: CourseItem[];
  filtedArray: CourseItem[];
}

const GroupCourse = ({groupItem, filtedArray}: GroupCourseProps) => {
  const [item1, ...item23] = groupItem;
  return (
    <>
      <View style={styles.first} key={item1.id}>
        <MainElement
          cover={item1.cover}
          learnedLesson={item1.learnedLesson}
          name={item1.name}
          totalLesson={item1.totalLesson}
        />
        {item1.id !== filtedArray[0].id && (
          <Line variant="line12" isActive={item1.learnedLesson > 0} />
        )}
        <CircleProgress filteredArray={filtedArray} courseItem={item1} />
      </View>

      <View style={styles.secondAndThird}>
        {item23.map((item, index) => {
          return (
            <View
              key={index}
              style={[styles.item23, index === 0 && styles.item2]}>
              <MainElement
                cover={item.cover}
                learnedLesson={item.learnedLesson}
                name={item.name}
                totalLesson={item.totalLesson}
              />
              <Line
                variant={index === 1 ? 'line3' : 'line12'}
                isActive={item.learnedLesson > 0}
              />
              <CircleProgress
                filteredArray={filtedArray}
                courseItem={item}
                isThirdCircle={index === 1}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default GroupCourse;
