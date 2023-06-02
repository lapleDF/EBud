export interface Game {
  id: string;
  name: string;
  rule: string;
  cover: string;
  type: 'guessWord' | 'rollDice';
}
