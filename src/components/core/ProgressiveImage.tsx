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
  backgroundColor: COLORS.bgHeader,
};

const unvisible: StyleProp<ImageStyle> = {
  display: 'none',
};

const ProgressiveImage = ({source, style}: ProgressiveImageProps) => {
  const [isEndLoad, setIsEndLoad] = useState(false);

  return (
    <>
      {!isEndLoad && (
        <View style={[container, style]}>
          <ActivityIndicator size={'large'} color={COLORS.primaryDark} />
        </View>
      )}
      <Image
        source={source}
        style={isEndLoad ? style : unvisible}
        onLoadEnd={() => setIsEndLoad(true)}
      />
    </>
  );
};

export default ProgressiveImage;
