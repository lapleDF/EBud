import React from 'react';
import {CSLayout, CSLoading, CSText} from '../../components/core';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

const BookContent = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const {bookItem} = route.params;
  const handleReadContent = async () => {};
  handleReadContent();
  return (
    <CSLayout style={styles.container}>
      <Pdf
        source={{uri: bookItem.fileUrl}}
        onLoadComplete={(numberOfPages, filePath, _size) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
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
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CSText>Thoát</CSText>
        </TouchableOpacity>
      </View>
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
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 150,
    backgroundColor: COLORS.overlay,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
export default BookContent;
