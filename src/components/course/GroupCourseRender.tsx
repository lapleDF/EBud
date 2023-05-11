import {StyleSheet, View} from 'react-native';
import React from 'react';

import {CourseItem} from '../../types';
import {CircleProgress, Line, MainElement} from './GroupCourseRenderMaterial';

interface GroupCourseRenderProps {
  groupItem: CourseItem[];
  filtedArray: CourseItem[];
}

const GroupCourseRender = ({
  groupItem,
  filtedArray,
}: GroupCourseRenderProps) => {
  return (
    <>
      {groupItem.map((item, index) => {
        if (index === 0) {
          return (
            <View style={styles.first} key={item.id}>
              <MainElement
                cover={item.cover}
                learnedLesson={item.learnedLesson}
                name={item.name}
                totalLesson={item.totalLesson}
              />
              {item.id !== filtedArray[0].id && (
                <Line variant="line12" isActive={item.learnedLesson > 0} />
              )}
              <CircleProgress
                idCourse={item.id}
                skill={item.skill}
                value={(item.learnedLesson / item.totalLesson) * 100}
              />
            </View>
          );
        }
      })}

      <View style={styles.secondAndThird}>
        {groupItem.map((item, index) => {
          if (index !== 0) {
            return (
              <View key={index} style={styles.item23}>
                <MainElement
                  cover={item.cover}
                  learnedLesson={item.learnedLesson}
                  name={item.name}
                  totalLesson={item.totalLesson}
                />
                <Line
                  variant={index === 2 ? 'line3' : 'line12'}
                  isActive={item.learnedLesson > 0}
                />
                <CircleProgress
                  idCourse={item.id}
                  skill={item.skill}
                  value={(item.learnedLesson / item.totalLesson) * 100}
                  isThirdCircle={index === 2}
                />
              </View>
            );
          }
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
  },
  secondAndThird: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item23: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GroupCourseRender;
