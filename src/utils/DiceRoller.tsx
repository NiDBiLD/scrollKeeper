import React from 'react';

class DiceRoller extends React.Component {

  static rollDice(die: 'd6' | 'd10', number = 1) {
    let min = 1;
    let max = 0;
    max = die === 'd6' ? 6 : 10;
    let numberArr: number[] = [];
    for (let i = 0; i < number; i++) {
      numberArr.push(Math.round(Math.random() * (max - min)) + min);
    }
    return numberArr;
  }
}

export default DiceRoller;
