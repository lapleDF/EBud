import {StyleSheet, View} from 'react-native';
import React from 'react';

import type {CourseItem} from '../../types';
import {CircleProgress, Line, MainElement} from './renderMaterial';

interface GroupCourseRenderProps {
  groupItem: CourseItem[];
  filtedArray: CourseItem[];
}

const GroupCourseRender = ({
  groupItem,
  filtedArray,
}: GroupCourseRenderProps) => {
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

const styles = StyleSheet.create({
  first: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    zIndex: 1,
  },
  secondAndThird: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item2: {
    zIndex: 1,
  },
  item23: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GroupCourseRender;
