import React from 'react';
import DiceRoller from './utils/DiceRoller';
import {Rulebook} from './utils/RuleBook';
import { Flex, Box, Card, Button, Text } from 'rebass';

// @ts-ignore
import { Label, Select, Checkbox} from '@rebass/forms';

type SkillCheckerProps = {}
type SkillCheckerState = {
  diceRoll: number[];
  characterValue: number;
  gearLevel: number;
  hasSkill: boolean;
  extendedAction: boolean;
  difficulty: number;
  diceResult: number[];
}

const text = {
  header: 'Dice Roller',
  button: 'Roll',
  character: 'Character',
  gear: 'Gear level',
  skill: 'Skill',
  extendedAction: 'Extended Action',
  difficulty: 'Difficulty level'
}

class SkillChecker extends React.Component<SkillCheckerProps, SkillCheckerState> {
  constructor(props: SkillCheckerProps) {
    super(props);
    this.state = {
      diceRoll: [0],
      characterValue: 0,
      gearLevel: 0,
      hasSkill: false,
      extendedAction: false,
      difficulty: 0,
      diceResult: [0]
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleBoolChange = this.handleBoolChange.bind(this);
  }

  handleSkillCheck() {
    let diceResult = DiceRoller.rollDice('d10');
    let skillCheckResult: number[] = [];
    for (let i = 0; i < diceResult.length; i++) {
      skillCheckResult.push(diceResult[i] + this.calculateRollVariables());
    }
    console.log('skillCheckResult ', skillCheckResult);
    this.setState({
      diceRoll: diceResult,
      diceResult: skillCheckResult
    });
  }

  calculateRollVariables() {
    console.log('state ', this.state);
    let skillBonus = this.state.hasSkill ? 2 : 0;
    let extendedAction = this.state.extendedAction ? 2 : 0;
    let variableResult = this.state.characterValue + this.state.gearLevel + skillBonus + extendedAction + this.state.difficulty;
    return variableResult;
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>, param: any) {
    const value = { [param]: parseInt(event.target.value, 10) } as Pick<SkillCheckerState, keyof SkillCheckerState>;
    this.setState(value);
  }

  handleBoolChange(event: React.ChangeEvent<HTMLInputElement>, param: any) {
    const value = { [param]: event.target.checked ? event.target.checked : false } as Pick<SkillCheckerState, keyof SkillCheckerState>;
    this.setState(value);
  }

  makeSelectElement(arr: number[]) {
    let elementArr: JSX.Element[] = [];
    for (let i = 0; i < arr.length; i++) {
      elementArr.push(
        <option key={arr[i]} value={arr[i]}>{arr[i]}</option>
      );
    }
    return elementArr;
  }

  makeResultString() {
    let characterValueStr: string = this.state.characterValue !== 0
      ? ' + ' + this.state.characterValue.toString() + ' from character stats, '
      : '';
    let gearLevelStr: string = this.state.gearLevel !== 0
      ? this.state.gearLevel.toString() + ' from gear, '
      : '';
    let hasSkillStr: string = this.state.hasSkill
      ? '+ 2 from skill, '
      : '';
    let hasExtendedActionStr: string = this.state.extendedAction
      ? '+ 2 from extended action, '
      : '';
    let difficultyModStr: string = this.state.difficulty !== 0
      ? (this.state.difficulty > 0
          ? '+' + this.state.difficulty.toString()
          : this.state.difficulty.toString()
        )
      : '';
    let diceResultStr: string = ' added to roll: ' + this.state.diceRoll[0] + ' resulting in ';
    let resultString = 'Result: ' + this.state.diceRoll[0] + characterValueStr + gearLevelStr + hasSkillStr + hasExtendedActionStr + difficultyModStr + diceResultStr;
    return resultString;
  }

  render() {
    let skillLevels = this.makeSelectElement(Rulebook.gearLevels);
    let difficultyLevels = this.makeSelectElement(Rulebook.difficultyLevels);
    let characterValues = this.makeSelectElement(Rulebook.characterValues);
    let resultString = this.makeResultString();
    return (
        <Card p={3} bg={'secondary'} width={'100%'} variant='card'>
          <Text fontWeight='bold'>{text.header}</Text>
            <Flex flexWrap='wrap'>
              <Box width={1/3} p={2}>
                <Select
                  p={1}
                  id='characterValue'
                  name='characterValue'
                  value={this.state.characterValue}
                  onChange={(e: any) => this.handleSelectChange(e, 'characterValue')}>
                  {characterValues}
                </Select>
                <Label fontSize={0} htmlFor='characterValue'>{text.character}</Label>
              </Box>
              <Box width={1/3} p={2}>
                <Select
                  p={1}
                  id='difficulty'
                  name='difficulty'
                  value={this.state.difficulty}
                  onChange={(e: any) => this.handleSelectChange(e, 'difficulty')}>
                  {difficultyLevels}
                </Select>
                <Label fontSize={0} htmlFor='difficulty'>{text.difficulty}</Label>
              </Box>
              <Box width={1/3} p={2}>
                <Select
                  p={1}
                  id='gear'
                  name='gearLevel'
                  value={this.state.gearLevel}
                  onChange={(e: any) => this.handleSelectChange(e, 'gearLevel')}>
                  {skillLevels}
                </Select>
                <Label fontSize={0} htmlFor='gearLevel'>Gear Level</Label>
              </Box>
            </Flex>
            <Flex flexWrap='wrap'>
              <Box width={1/3} p={2}>
                <Label>
                  <Checkbox
                    id='skill'
                    name='skill'
                    value={this.state.hasSkill}
                    onChange={(e: any) => this.handleBoolChange(e, 'hasSkill')}
                  />
                  <span>{text.skill}</span>
                </Label>
              </Box>
              <Box width={2/3} p={2}>
                <Label>
                  <Checkbox
                    id='extendedAction'
                    name='extendedAction'
                    value={this.state.extendedAction}
                    onChange={(e: any) => this.handleBoolChange(e, 'extendedAction')}
                  />
                  <span>{text.extendedAction}</span>
                </Label>
              </Box>
              <Box width={1} p={2}>
                <Button p={1} variant='outline' onClick={() => this.handleSkillCheck()}>
                  {text.button}
                </Button>
              </Box>
              </Flex>
              <Flex flexWrap='wrap'>
                <Box width={1} p={2}>
                  <Text p={1}>
                    {resultString} {this.calculateRollVariables() + this.state.diceRoll[0]}
                  </Text>
                </Box>
              </Flex>
        </Card>
    );
  }
}
export default SkillChecker;
