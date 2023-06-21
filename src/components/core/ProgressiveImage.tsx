import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/color';

interface ProgressiveImageProps {
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
}

const container: StyleProp<ViewStyle> = {
  justifyContent: 'center',
  alignItems: 'center',
};

const ProgressiveImage = ({source, style}: ProgressiveImageProps) => {
  const [isEndLoad, setIsEndLoad] = useState(false);

  return (
    <>
      {!isEndLoad && (
        <ActivityIndicator
          style={[container, style]}
          size={'large'}
          color={COLORS.primaryDark}
        />
      )}
      <Image
        source={source}
        style={style}
        onLoadEnd={() => setIsEndLoad(true)}
      />
    </>
  );
};

export default ProgressiveImage;
