import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {GameList, User} from '../../types';
import {RootState} from '../../store/store';
import {CSLayout, CSLoading, CSModal, CSText} from '../../components/core';
import {SPACING} from '../../constants/spacing';
import GameItem from '../../components/game/GameItem';
import {GameScreenProps} from '../../types/navigation/types';

const Game = () => {
  const navigation = useNavigation<GameScreenProps<'Game'>['navigation']>();
  const rootState: RootState = useSelector((state: RootState) => state);
  const user: User = rootState.user;
  const gameList: GameList = rootState.game;
  const refModal = useRef<RBSheet>(null);
  const [gameRule, setGameRule] = useState('');

  const handleHelp = (rule: string) => {
    setGameRule(rule);
    refModal.current?.open();
  };

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          iconRight: 'trophy',
          textRight: user.totalMedal?.toString(),
        }),
    });
  });
  return (
    <CSLayout>
      {gameList.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <FlatList
          data={gameList.list}
          renderItem={({item}) => (
            <GameItem gameItem={item} handleHelp={handleHelp} />
          )}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      <CSModal refRBSheet={refModal}>
        <CSText variant="PoppinsBold" color="primaryDark" size={'xlg'}>
          Luật chơi
        </CSText>
        <CSText style={styles.gameRule}>{gameRule}</CSText>
      </CSModal>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SPACING.px,
    paddingBottom: SPACING.heightBottomTab,
    marginTop: 20,
    gap: 20,
  },
  gameRule: {
    textAlign: 'justify',
  },
});

export default Game;
