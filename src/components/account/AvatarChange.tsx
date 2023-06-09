import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../../constants/parseObject';
import {CSButton, CSLoading, CSText} from '../core';
import {COLORS} from '../../constants/color';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SPACING} from '../../constants/spacing';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';

interface Avatar {
  name: string;
  url: string;
}

interface AvatarChangeProps {
  refRBSheet: React.MutableRefObject<RBSheet | undefined>;
}

const AvatarChange = ({refRBSheet}: AvatarChangeProps) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<Avatar>();

  const handlePressImage = (avatar: Avatar) => {
    setActiveAvatar(avatar);
  };

  const handleSubmit = () => {
    if (activeAvatar === undefined) {
      return;
    }
    AppDispatch(USER_ACTION.CHANGE_AVATAR, activeAvatar?.url);
    refRBSheet.current?.close();
  };

  const getAvatarQuery = async () => {
    const avatarQuery = new Parse.Query(PARSE_OBJ.avatar);
    try {
      const queryResultArr: Parse.Object[] = await avatarQuery.find();
      const avatarArr: Avatar[] = queryResultArr.map(avatar => {
        return {
          name: avatar.attributes.name,
          url: avatar.attributes.image?._url,
        };
      });
      setAvatars(avatarArr);
    } catch (error) {
      console.log('error get avatars', error);
    }
  };

  useEffect(() => {
    getAvatarQuery();
  }, []);
  return (
    <>
      <View style={styles.container}>
        {avatars.length > 0 ? (
          avatars.map((avatar: Avatar, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => handlePressImage(avatar)}>
              <>
                <Image
                  source={{uri: avatar.url}}
                  style={[
                    styles.image,
                    avatar.name === activeAvatar?.name && styles.imageActive,
                  ]}
                />
                <CSText style={styles.nameAvatar}>{avatar.name}</CSText>
              </>
            </TouchableOpacity>
          ))
        ) : (
          <CSLoading />
        )}
      </View>
      <View style={styles.btnGroup}>
        <CSButton title="Chọn làm avatar" onPress={handleSubmit} />
        <CSButton
          title="Hủy"
          variant="secondary"
          onPress={() => refRBSheet.current?.close()}
        />
      </View>
    </>
  );
};

export default AvatarChange;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    rowGap: 40,
    marginBottom: 50,
  },
  item: {
    alignItems: 'center',
  },
  image: {
    width: (SPACING.screenWidth - SPACING.px * 4) * 0.25,
    height: (SPACING.screenWidth - SPACING.px * 4) * 0.25,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  nameAvatar: {
    position: 'absolute',
    bottom: -30,
  },
  imageActive: {
    borderColor: COLORS.primaryLight,
    borderWidth: 6,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
