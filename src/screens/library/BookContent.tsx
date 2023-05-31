import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Easing} from 'react-native-reanimated';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';

import {
  CSButton,
  CSLayout,
  CSLoading,
  CSModal,
  CSText,
} from '../../components/core';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {
  getDataObjAsyncStorage,
  getDisplayedTimeVideo,
  storeDataObjAsyncStorage,
} from '../../utils';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {TrackAudio} from '../../types';

export interface BookContinueRead {
  bookId: string;
  currenPage: number;
}
const BookContent = () => {
  const route = useRoute<any>();
  const {bookItem} = route.params;
  const navigation = useNavigation();

  const trackAudioList: TrackAudio[] = bookItem.trackAudio;
  const refPdf = useRef<Pdf>(null);
  const refModal = useRef<RBSheet>(null);
  const refVideo = useRef<Video>(null);
  const animatedValue = useRef(new Animated.Value(-100)).current;

  const translateY = {
    transform: [{translateY: animatedValue}],
  };

  const [params, setParams] = useState({
    totalPages: 1,
    currentPage: 1,
    isComplete: false,
    isShowControls: true,
    isPlayAudio: false,
    currentTime: 0,
    durationTime: 0,
  });

  const handleOnload = ({duration}: OnLoadData) => {
    setParams({...params, durationTime: duration});
  };

  const handleOnEnd = () => {
    setParams({...params, currentTime: 0, isPlayAudio: false});
  };

  const handleOnProgress = ({currentTime}: OnProgressData) => {
    for (let index = 0; index < trackAudioList.length; index++) {
      if (params.currentPage !== params.totalPages) {
        if (
          trackAudioList[index].pageIndex === params.currentPage &&
          trackAudioList[index].endTime < currentTime
        ) {
          refPdf.current?.setPage(params.currentPage + 1);
        }
      }
    }
    setParams({...params, currentTime: currentTime});
  };

  const handleOnChangeValueSlider = (slide: number) => {
    refVideo.current?.seek(slide * params.durationTime);
    setParams({...params, currentTime: slide * params.durationTime});
  };

  const onLoadComplete = async (numberOfPage: number) => {
    setParams({
      ...params,
      totalPages: numberOfPage,
      isComplete: true,
      isShowControls: true,
    });
  };

  const onPageChange = (page: number) => {
    setParams({...params, currentPage: page});
  };

  const onSlidingStart = () => {
    setParams({...params, isPlayAudio: false});
  };

  const onSlidingComplete = () => {
    setParams({...params, isPlayAudio: true});
  };

  const handleExit = async () => {
    let bookContinueReadArr: BookContinueRead[] = [];
    bookContinueReadArr = await getDataObjAsyncStorage(
      ASYNC_STORAGE.bookContinueRead,
    );

    if (bookContinueReadArr === null) {
      bookContinueReadArr = [];
    }
    const bookContinueRead: BookContinueRead = {
      bookId: bookItem.id,
      currenPage: params.currentPage,
    };

    let isExits = false;
    bookContinueReadArr.forEach(item => {
      if (item.bookId === bookContinueRead.bookId) {
        item.currenPage = bookContinueRead.currenPage;
        isExits = true;
      }
    });

    if (!isExits) {
      bookContinueReadArr.push(bookContinueRead);
    }
    storeDataObjAsyncStorage(
      ASYNC_STORAGE.bookContinueRead,
      bookContinueReadArr,
    );

    navigation.goBack();
  };

  const continueRead = async () => {
    const bookContinueRead: BookContinueRead[] = await getDataObjAsyncStorage(
      ASYNC_STORAGE.bookContinueRead,
    );
    if (bookContinueRead !== null) {
      refPdf.current?.setPage(
        bookContinueRead.filter(item => item.bookId === bookItem.id)[0]
          .currenPage,
      );
    }
    refModal.current?.close();
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: params.isShowControls ? 0 : -100,
      duration: 200,
      easing: params.isShowControls ? Easing.linear : Easing.cubic,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, params.isShowControls]);

  useEffect(() => {
    const handleLoadCompleted = async () => {
      if (params.isComplete) {
        const bookContinueRead: BookContinueRead[] =
          await getDataObjAsyncStorage(ASYNC_STORAGE.bookContinueRead);
        if (
          bookContinueRead.filter(item => item.bookId === bookItem.id).length >
          0
        ) {
          refModal.current?.open();
        }
      }
    };
    handleLoadCompleted();
  }, [bookItem.id, params.isComplete]);

  return (
    <CSLayout style={styles.container}>
      <Video
        source={{
          uri: bookItem.audioUrl,
        }}
        ref={refVideo}
        playInBackground
        paused={!params.isPlayAudio}
        onLoad={handleOnload}
        onProgress={handleOnProgress}
        onEnd={handleOnEnd}
        style={styles.audioFile}
      />
      <Pdf
        source={{uri: bookItem.fileUrl}}
        ref={refPdf}
        onLoadComplete={onLoadComplete}
        onPageChanged={onPageChange}
        onPageSingleTap={() =>
          setParams({...params, isShowControls: !params.isShowControls})
        }
        onError={error => {
          console.log('error=>', error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        trustAllCerts={false}
        horizontal
        enablePaging
        enableAntialiasing
        enableAnnotationRendering
        renderActivityIndicator={progress => (
          <CSLoading text={`Đang tải ${Math.round(progress * 100)}%...`} />
        )}
        style={styles.pdf}
      />
      {params.isComplete && (
        <Animated.View style={[styles.controlsGroup, translateY]}>
          <View style={styles.controls}>
            <TouchableOpacity onPress={handleExit}>
              <CSText>Thoát</CSText>
            </TouchableOpacity>
            <CSText
              textProps={{numberOfLines: 2}}
              variant="PoppinsBold"
              style={styles.bookTitle}
              color="primaryDark">
              {bookItem.title}
            </CSText>
            <CSText>{`${params.currentPage}/${params.totalPages}`}</CSText>
          </View>
          <View style={styles.audio}>
            <TouchableOpacity
              onPress={() =>
                setParams({...params, isPlayAudio: !params.isPlayAudio})
              }>
              <Icon
                name={params.isPlayAudio ? 'pause' : 'play'}
                size={35}
                color={COLORS.primaryDark}
              />
            </TouchableOpacity>
            <View style={styles.sliderGroup}>
              <View style={styles.timer}>
                <CSText size={'sm'}>
                  {getDisplayedTimeVideo(params.currentTime)}
                </CSText>
                <CSText size={'sm'}>
                  {getDisplayedTimeVideo(params.durationTime)}
                </CSText>
              </View>
              <Slider
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={COLORS.primaryLighter}
                maximumTrackTintColor={COLORS.primaryLight}
                thumbTintColor={COLORS.primaryDark}
                value={
                  params.currentTime > 0
                    ? params.currentTime / params.durationTime
                    : 0
                }
                onValueChange={handleOnChangeValueSlider}
                style={styles.slider}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSlidingComplete}
              />
            </View>
          </View>
        </Animated.View>
      )}
      <CSModal refRBSheet={refModal}>
        <CSText variant="PoppinsBold" size={'xlg'} style={styles.titleModal}>
          Tiếp tục đọc hoặc đọc lại từ đầu?
        </CSText>
        <View style={styles.btns}>
          <CSButton
            title="Đọc lại từ đầu"
            variant="secondary"
            onPress={() => refModal.current?.close()}
          />
          <CSButton title="Tiếp tục đọc" onPress={continueRead} />
        </View>
      </CSModal>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: SPACING.screenWidth,
    height: SPACING.screenHeight,
    backgroundColor: COLORS.bgDark,
  },
  audioFile: {},
  controlsGroup: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: COLORS.overlay,
    padding: SPACING.px,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleModal: {
    textAlign: 'center',
  },
  bookTitle: {
    textAlign: 'center',
    width: '65%',
  },
  audio: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderGroup: {
    width: '90%',
    height: 50,
  },
  slider: {
    width: '100%',
    height: 50,
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
export default BookContent;
