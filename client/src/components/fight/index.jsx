import React from 'react';

import { getFighters } from '../../services/domainRequest/fightersRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';
import { Button } from '@material-ui/core';
import './fight.css';
import Arena from '../arena';

// ******************************************

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
    rivals: null,
    fightStarted: false,
  };

  //  **************** Lifecycle ****************

  async componentDidMount() {
    const fighters = await getFighters();
    const error = 'Connection with server failed. \nPlease try again later';

    if (fighters && !fighters.error) {
      this.setState({ fighters });
    } else {
      alert(error);
    }
  }

  // **************** Methods ****************

  onFightStart = () => {
    const { fighter1, fighter2 } = this.state;

    if (fighter1 && fighter2) {
      this.setState({
        rivals: { fighter1, fighter2 },
      });
    } else {
      alert('Please select both fighters');
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  onGameOver = () => {
    this.setState({ rivals: null, fighter1: null, fighter2: null });
  };

  // **************** Render ****************

  render() {
    const { fighter1, fighter2, rivals } = this.state;

    if (rivals) {
      return <Arena rivals={rivals} onGameOver={this.onGameOver} />;
    }

    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />
        <div id="fight-wrapper">
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List() || []}
          />

          <div className="btn-wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
            >
              Start Fight
            </Button>
          </div>

          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List() || []}
          />
        </div>
      </div>
    );
  }
}

export default Fight;
