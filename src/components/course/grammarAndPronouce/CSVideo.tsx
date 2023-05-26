import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../../constants/color';
import {CSText} from '../../core';
import {getDisplayedTimeVideo} from '../../../utils';

interface VideoProps {
  videoUrl?: string;
  posterUrl?: string;
}

const CSVideo = ({videoUrl = '', posterUrl = ''}: VideoProps) => {
  const refVideo = useRef<Video>(null);
  const navigation = useNavigation();
  const [params, setParams] = useState({
    paused: true,
    currentTime: 0,
    duration: 0.1,
    fullScreen: false,
    overlay: true,
  });

  const handleOnload = ({duration}: OnLoadData) => {
    setParams({...params, duration: duration});
  };

  const handleOnProgress = ({currentTime}: OnProgressData) => {
    setParams({...params, currentTime: currentTime});
  };

  const handleOnChangeValueSlider = (slide: number) => {
    refVideo.current?.seek(slide * params.duration);
    setParams({...params, currentTime: slide * params.duration});
  };

  const handlePlayForward = () => {
    if (params.currentTime + 5 >= params.duration) {
      refVideo.current?.seek(params.duration);
      setParams({...params, currentTime: params.duration});
      return;
    }
    refVideo.current?.seek(params.currentTime + 5);
    setParams({...params, currentTime: params.currentTime + 5});
  };
  const handlePlayBack = () => {
    if (params.currentTime - 5 <= 0) {
      refVideo.current?.seek(0);
      setParams({...params, currentTime: 0});
      return;
    }
    refVideo.current?.seek(params.currentTime - 5);
    setParams({...params, currentTime: params.currentTime - 5});
  };

  const handleOnEnd = () => {
    setParams({...params, currentTime: 0, paused: true});
  };

  const onFullScreen = () => {
    const {fullScreen} = params;
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setParams({...params, fullScreen: !params.fullScreen});
  };

  useEffect(() => {
    if (params.fullScreen) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [navigation, params.fullScreen]);

  return (
    <View style={params.fullScreen ? styles.fullScreenVideo : styles.video}>
      <Video
        source={{
          uri: videoUrl,
        }}
        resizeMode="contain"
        ref={refVideo}
        poster={posterUrl}
        posterResizeMode="cover"
        style={styles.fullScreenVideo}
        playInBackground
        paused={params.paused}
        pictureInPicture
        onLoad={handleOnload}
        onProgress={handleOnProgress}
        onTouchStart={() => setParams({...params, overlay: !params.overlay})}
        onEnd={handleOnEnd}
      />
      {params.overlay && (
        <>
          <View style={styles.controlBtn}>
            <Icon
              name={'play-back'}
              size={40}
              color={COLORS.primaryDark}
              onPress={handlePlayBack}
            />
            <Icon
              name={params.paused ? 'play' : 'pause'}
              size={40}
              color={COLORS.primaryDark}
              onPress={() => setParams({...params, paused: !params.paused})}
            />
            <Icon
              name={'play-forward'}
              size={40}
              color={COLORS.primaryDark}
              onPress={handlePlayForward}
            />
          </View>
          <View style={styles.controls}>
            <View style={styles.sliderGroup}>
              <View style={styles.timer}>
                <CSText size={'sm'}>
                  {getDisplayedTimeVideo(params.currentTime)}
                </CSText>
                <CSText size={'sm'}>
                  {getDisplayedTimeVideo(params.duration)}
                </CSText>
              </View>
              <Slider
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={COLORS.primaryLighter}
                maximumTrackTintColor={COLORS.primaryLight}
                thumbTintColor={COLORS.primaryDark}
                value={params.currentTime / params.duration}
                onValueChange={handleOnChangeValueSlider}
                style={styles.slider}
              />
            </View>
            <Icon
              name={params.fullScreen ? 'contract' : 'expand'}
              size={35}
              color={COLORS.primaryDark}
              onPress={onFullScreen}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: COLORS.black,
  },
  video: {
    width: '100%',
    height: 230,
    backgroundColor: COLORS.black,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  sliderGroup: {
    width: '90%',
    height: 50,
  },
  slider: {
    width: '100%',
    height: 50,
  },
  controlBtn: {
    position: 'absolute',
    bottom: '50%',
    transform: [{translateY: 20}],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    width: '100%',
    zIndex: 2,
  },
  timer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default CSVideo;
