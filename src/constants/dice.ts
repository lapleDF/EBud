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
  imageUrl: string;
}

export const PLAY_ITEMS: PlayItem[] = [
  {
    index: 0,
    valueX: 0,
    valueY: 0,
    type: 'start',
    imageUrl: '',
  },
  {
    index: 1,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 2,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 3,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: '',
  },
  {
    index: 4,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 5,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 6,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 7,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: '',
  },
  {
    index: 8,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 9,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 10,
    valueX: 0,
    valueY: 0,
    type: 'question',
    imageUrl: '',
  },
  {
    index: 11,
    valueX: 0,
    valueY: 0,
    type: 'secret',
    imageUrl: '',
  },
];
