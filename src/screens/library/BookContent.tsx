import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Animated, TouchableOpacity, View} from 'react-native';
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
import {COLORS} from '../../constants/color';
import {
  getDataObjAsyncStorage,
  getDisplayedTimeVideo,
  storeDataObjAsyncStorage,
} from '../../utils';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import type {TrackAudio} from '../../types';
import type {LibraryScreenProps} from '../../types/navigation/types';
import {BookContentStyles as styles} from './BookContent.styles';

export interface BookContinueRead {
  bookId: string;
  currenPage: number;
}
const BookContent = () => {
  const route = useRoute<LibraryScreenProps<'Conttent'>['route']>();
  const {bookItem} = route.params;
  const navigation =
    useNavigation<LibraryScreenProps<'Conttent'>['navigation']>();

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
    trackAudioList.forEach(trackAudio => {
      if (
        params.currentPage !== params.totalPages &&
        trackAudio.pageIndex !== params.currentPage &&
        trackAudio.endTime > currentTime &&
        trackAudio.startTime < currentTime
      ) {
        refPdf.current?.setPage(trackAudio.pageIndex);
      }
    });
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
        bookContinueRead?.filter(item => item.bookId === bookItem.id)[0]
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
          bookContinueRead?.filter(item => item.bookId === bookItem.id).length >
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

export default BookContent;
