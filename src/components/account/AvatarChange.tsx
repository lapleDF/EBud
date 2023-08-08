import {Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Parse from 'parse/react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {PARSE_OBJ} from '../../constants/parseObject';
import {CSButton, CSLoading, CSText} from '../core';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {AvatarChangeStyles as styles} from './AvatarChange.styles';

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
