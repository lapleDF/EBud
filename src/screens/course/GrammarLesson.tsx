import React from 'react';
import Video from 'react-native-video';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../constants/color';
import {CSLayout, CSText} from '../../components/core';

const GrammarLesson = () => {
  return (
    <CSLayout>
      <View style={styles.header}>
        <CSText>{'Bài 1/3'}</CSText>
        <CSText variant="PoppinsBold">{'title'}</CSText>
        <TouchableOpacity onPress={() => {}}>
          <CSText color="primaryLighter">{'Bài tiếp theo'}</CSText>
        </TouchableOpacity>
      </View>
      <View style={styles.video}>
        <Video
          source={{
            uri: 'https://drive.google.com/file/d/1BaE5nZjwLh06Wvfdljb5RcZMf-OWWAmz/view?usp=sharing',
          }}
          onError={error => console.log(error)}
          style={styles.backgroundVideo}
        />
      </View>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  video: {
    width: '100%',
    height: 230,
    backgroundColor: COLORS.bgGrey,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  collasibleContainer: {},
  collasibleHeader: {},
  collasibleContent: {},
});

export default GrammarLesson;
