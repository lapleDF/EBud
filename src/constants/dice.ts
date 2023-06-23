import {ImageSourcePropType} from 'react-native';

export const DICES = [
  {
    img: require('../assets/images/dice/dice_1.1.png'),
    value: 1,
  },
  {
    img: require('../assets/images/dice/dice_1.2.png'),
    value: 1,
  },
  {
    img: require('../assets/images/dice/dice_1.3.png'),
    value: 1,
  },
  {
    img: require('../assets/images/dice/dice_1.4.png'),
    value: 1,
  },
  {
    img: require('../assets/images/dice/dice_2.1.png'),
    value: 2,
  },
  {
    img: require('../assets/images/dice/dice_2.2.png'),
    value: 2,
  },
  {
    img: require('../assets/images/dice/dice_2.3.png'),
    value: 2,
  },
  {
    img: require('../assets/images/dice/dice_2.4.png'),
    value: 2,
  },
  {
    img: require('../assets/images/dice/dice_3.1.png'),
    value: 3,
  },
  {
    img: require('../assets/images/dice/dice_3.2.png'),
    value: 3,
  },
  {
    img: require('../assets/images/dice/dice_3.3.png'),
    value: 3,
  },
  {
    img: require('../assets/images/dice/dice_3.4.png'),
    value: 3,
  },
  {
    img: require('../assets/images/dice/dice_4.1.png'),
    value: 4,
  },
  {
    img: require('../assets/images/dice/dice_4.2.png'),
    value: 4,
  },
  {
    img: require('../assets/images/dice/dice_4.3.png'),
    value: 4,
  },
  {
    img: require('../assets/images/dice/dice_4.4.png'),
    value: 4,
  },
  {
    img: require('../assets/images/dice/dice_5.1.png'),
    value: 5,
  },
  {
    img: require('../assets/images/dice/dice_5.2.png'),
    value: 5,
  },
  {
    img: require('../assets/images/dice/dice_5.3.png'),
    value: 5,
  },
  {
    img: require('../assets/images/dice/dice_5.4.png'),
    value: 5,
  },
  {
    img: require('../assets/images/dice/dice_6.1.png'),
    value: 6,
  },
  {
    img: require('../assets/images/dice/dice_6.2.png'),
    value: 6,
  },
  {
    img: require('../assets/images/dice/dice_6.3.png'),
    value: 6,
  },
  {
    img: require('../assets/images/dice/dice_6.4.png'),
    value: 6,
  },
];

export interface PlayItem {
  index: number;
  valueX: number;
  valueY: number;
  type: 'start' | 'question' | 'secret';
  imageUrl: ImageSourcePropType;
}

export const PLAY_ITEMS: PlayItem[] = [
  {
    index: 0,
    valueX: 0,
    valueY: 0,
    type: 'start',
    imageUrl: require('../assets/images/dicePlayblock/start.png'),
  },
  {
    index: 1,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/Iceberg.png'),
  },
  {
    index: 2,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/coral.png'),
  },
  {
    index: 3,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: require('../assets/images/dicePlayblock/closeBox.png'),
  },
  {
    index: 4,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/beach1.png'),
  },
  {
    index: 5,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/beach2.png'),
  },
  {
    index: 6,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/mountain.png'),
  },
  {
    index: 7,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: require('../assets/images/dicePlayblock/closeBox.png'),
  },
  {
    index: 8,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/seaWaves.png'),
  },
  {
    index: 9,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/iceOcean.png'),
  },
  {
    index: 10,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: require('../assets/images/dicePlayblock/park.png'),
  },
  {
    index: 11,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: require('../assets/images/dicePlayblock/closeBox.png'),
  },
];

export interface MysteryBoxProps {
  type: 'forward' | 'back' | 'return';
  step: number;
  title: string;
}

export const MYSTERY_BOXES: MysteryBoxProps[] = [
  {
    type: 'forward',
    step: 2,
    title: 'Tiến 2 bước',
  },
  {
    type: 'back',
    step: -1,
    title: 'Lùi 1 bước',
  },
  {
    type: 'return',
    title: 'Đến điểm bắt đầu',
    step: 0,
  },
  {
    type: 'back',
    step: -3,
    title: 'Lùi 3 bước',
  },
  {
    type: 'forward',
    step: 4,
    title: 'Tiến 4 bước',
  },
];
