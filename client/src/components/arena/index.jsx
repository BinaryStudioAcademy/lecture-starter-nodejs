import React, { Component } from 'react';
import './arena.css';
import controls from '../../constants/controls';
import Modal from '../modal';

const {
  PlayerOneAttack,
  PlayerOneBlock,
  PlayerTwoAttack,
  PlayerTwoBlock,
  PlayerOneCriticalHitCombination: crit1,
  PlayerTwoCriticalHitCombination: crit2,
} = controls;

// ******************************************

class Arena extends Component {
  //
  playerOne = this.props.rivals.fighter1;
  playerTwo = this.props.rivals.fighter2;

  playerOneInitialHealth = this.playerOne.health;
  playerTwoInitialHealth = this.playerTwo.health;

  coolDownInterval = 10000;
  events = ['keydown', 'keyup'];

  state = {
    pressedCombo1Keys: [],
    pressedCombo2Keys: [],

    playerOneCoolDown: false,
    playerTwoCoolDown: false,

    playerOneBlocks: false,
    playerTwoBlocks: false,

    playerOneHealth: this.playerOneInitialHealth,
    playerTwoHealth: this.playerTwoInitialHealth,

    winner: null,
    showModal: false,
  };

  // ***********************

  componentDidMount() {
    this.events.forEach((eventType) =>
      document.addEventListener(eventType, this.keyPressHandler)
    );
  }

  componentDidUpdate(_, prevState) {
    const { playerOneHealth, playerTwoHealth } = this.state;

    const playerOneHealthBar = document.querySelector(
      `#left-fighter-indicator`
    );
    const playerTwoHealthBar = document.querySelector(
      `#right-fighter-indicator`
    );

    let winner = null;

    if (prevState.playerOneHealth !== playerOneHealth) {
      if (playerOneHealth > 0) {
        playerOneHealthBar.style.width = `${
          (playerOneHealth * 100) / this.playerOneInitialHealth
        }%`;
      } else {
        playerOneHealthBar.style.width = '0%';
        winner = this.playerTwo.name;
      }
    }

    if (prevState.playerTwoHealth !== playerTwoHealth) {
      if (playerTwoHealth > 0) {
        playerTwoHealthBar.style.width = `${
          (playerTwoHealth * 100) / this.playerTwoInitialHealth
        }%`;
      } else {
        playerTwoHealthBar.style.width = '0%';
        winner = this.playerOne.name;
      }
    }

    if (winner) {
      this.setState({ winner });
      this.setState({ showModal: true });
      // alert(`${winner} wins!`);
      console.log(`${winner} wins!`);
    }
  }

  componentWillUnmount() {
    this.events.forEach((eventType) =>
      document.removeEventListener(eventType, this.keyPressHandler)
    );
  }

  // ************************

  getChance(min, max) {
    return Math.random() * (max - min) + min;
  }

  getHitPower(player) {
    const criticalHitChance = this.getChance(1, 2);
    const hitPower = (player.power / 10) * criticalHitChance;

    return hitPower;
  }

  getBlockPower(player) {
    const dodgeChance = this.getChance(1, 2);
    const blockPower = player.defense * dodgeChance;

    return blockPower;
  }

  getDamage(attacker, defender) {
    let damage;

    const hitPower = this.getHitPower(attacker);
    const blockPower = this.getBlockPower(defender);

    if (hitPower > blockPower) {
      damage = hitPower - blockPower;
    } else {
      damage = 0;
    }

    return damage;
  }

  keyPressHandler = (event) => {
    const playerOne = this.playerOne;
    const playerTwo = this.playerTwo;
    const coolDownInterval = this.coolDownInterval;

    const {
      pressedCombo1Keys,
      pressedCombo2Keys,
      playerOneCoolDown,
      playerTwoCoolDown,
      playerOneBlocks,
      playerTwoBlocks,
    } = this.state;

    const { type, code, repeat } = event;

    if (repeat) return;

    if (type === 'keydown') {
      //
      // Player 1 combo
      const oneOfCombo1 =
        code === crit1[0] || code === crit1[1] || code === crit1[2];

      if (
        !playerOneCoolDown &&
        oneOfCombo1 &&
        !pressedCombo1Keys.includes(code)
      ) {
        this.setState((prevState) => {
          return { pressedCombo1Keys: prevState.pressedCombo1Keys.push(code) };
        });
      }

      if (pressedCombo1Keys.length === 3) {
        const damage = playerOne.attack * 2;
        this.healthIndicatorUpdater(playerOne, damage);
        this.setState({ pressedCombo1Keys: [] });

        this.setState({ playerOneCoolDown: true });

        setTimeout(() => {
          this.setState({ playerOneCoolDown: false });
        }, coolDownInterval);
      }

      // Player 2 combo
      const oneOfCombo2 =
        code === crit2[0] || code === crit2[1] || code === crit2[2];

      if (
        !playerTwoCoolDown &&
        oneOfCombo2 &&
        !pressedCombo2Keys.includes(code)
      ) {
        this.setState((prevState) => {
          return { pressedCombo2Keys: prevState.pressedCombo2Keys.push(code) };
        });
      }

      if (pressedCombo2Keys.length === 3) {
        const damage = playerTwo.attack * 2;
        this.healthIndicatorUpdater(playerTwo, damage);
        this.setState({ pressedCombo2Keys: [] });

        this.setState({ playerTwoCoolDown: true });

        setTimeout(() => {
          this.setState({ playerTwoCoolDown: false });
        }, coolDownInterval);
      }

      // Player 1 regular attack
      if (!playerOneBlocks && code === PlayerOneAttack) {
        const damage = playerTwoBlocks
          ? this.getDamage(playerOne, playerTwo)
          : this.getHitPower(playerOne);

        this.setState((prevState) => {
          return { playerTwoHealth: prevState.playerTwoHealth - damage };
        });
      }

      // Player 2 regular attack
      if (!playerTwoBlocks && code === PlayerTwoAttack) {
        const damage = playerOneBlocks
          ? this.getDamage(playerTwo, playerOne)
          : this.getHitPower(playerTwo);

        this.setState((prevState) => {
          return { playerOneHealth: prevState.playerOneHealth - damage };
        });
      }

      // Blocks
      if (code === PlayerOneBlock) this.setState({ playerOneBlocks: true });
      if (code === PlayerTwoBlock) this.setState({ playerTwoBlocks: true });
    }

    if (type === 'keyup') {
      //
      // Remove key code from the combo log on keyup - player 1
      if (pressedCombo1Keys.includes(code)) {
        const index = pressedCombo1Keys.indexOf(code);

        this.setState((prevState) => {
          return {
            pressedCombo1Keys: prevState.pressedCombo1Keys.splice(index, 1),
          };
        });
      }

      // Remove key code from the combo log on keyup - player 2
      if (pressedCombo2Keys.includes(code)) {
        const index = pressedCombo2Keys.indexOf(code);

        this.setState((prevState) => {
          return {
            pressedCombo2Keys: prevState.pressedCombo2Keys.splice(index, 1),
          };
        });
      }

      if (code === PlayerOneBlock) this.setState({ playerOneBlocks: false });
      if (code === PlayerTwoBlock) this.setState({ PlayerTwoBlocks: false });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { fighter1, fighter2 } = this.props.rivals;
    const { showModal, winner } = this.state;

    return (
      <div className="arena___root">
        {showModal && <Modal winner={winner} onClose={this.closeModal} />}

        <div className="arena___fight-status">
          {/*  */}
          <div className="arena___fighter-indicator">
            <span className="arena___fighter-name">{fighter1.name}</span>
            <div className="arena___health-indicator">
              <div
                className="arena___health-bar"
                id="left-fighter-indicator"
              ></div>
            </div>
          </div>

          <div className="arena___versus-sign"></div>

          <div className="arena___fighter-indicator">
            <span className="arena___fighter-name">{fighter2.name}</span>
            <div className="arena___health-indicator">
              <div
                className="arena___health-bar"
                id="right-fighter-indicator"
              ></div>
            </div>
          </div>
        </div>

        <div className="arena___battlefield">
          {/*  */}
          <div className="arena___fighter arena___left-fighter">
            <img
              className="fighter-preview___img"
              src={fighter1.source}
              title={fighter1.name}
              alt={fighter1.name}
            />
          </div>

          <div className="arena___fighter arena___right-fighter">
            <img
              className="fighter-preview___img"
              src={fighter2.source}
              title={fighter2.name}
              alt={fighter2.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

// *******************************

// class Arena extends Component {
//   static playerOne = this.props?.rivals?.fighter1;
//   static playerTwo = this.props?.rivals?.fighter2;

//   componentDidMount() {
//     console.log(this.props);
//     console.log(this.props.rivals);
//   }

//   render() {
//     return 'Arena';
//   }
// }

// *******************************

export default Arena;
