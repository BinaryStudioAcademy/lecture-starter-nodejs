import React, { Component } from 'react';
import './arena.css';

class Arena extends Component {
  render() {
    const { rivals } = this.props;
    const { fighter1, fighter2 } = rivals;

    return (
      <div class="arena___root">
        <div class="arena___fight-status">
          {/*  */}
          <div class="arena___fighter-indicator">
            <span class="arena___fighter-name">{fighter1.name}</span>
            <div class="arena___health-indicator">
              <div class="arena___health-bar" id="left-fighter-indicator"></div>
            </div>
          </div>

          <div class="arena___versus-sign"></div>

          <div class="arena___fighter-indicator">
            <span class="arena___fighter-name">{fighter2.name}</span>
            <div class="arena___health-indicator">
              <div
                class="arena___health-bar"
                id="right-fighter-indicator"
              ></div>
            </div>
          </div>
        </div>

        <div class="arena___battlefield">
          {/*  */}
          <div class="arena___fighter arena___left-fighter">
            <img
              class="fighter-preview___img"
              src={fighter1.source}
              title={fighter1.name}
              alt={fighter1.name}
            />
          </div>

          <div class="arena___fighter arena___right-fighter">
            <img
              class="fighter-preview___img"
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

export default Arena;
