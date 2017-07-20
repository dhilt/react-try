import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clickOnHeaderImage, getDashboardHeadDataAsync } from 'actions/dashboard';
import { TextBlock } from './TextBlock';

@connect(state => ({
  selectedIndex: state.dashboard.get('head').get('selectedIndex'),
  pending: state.dashboard.get('head').get('pending'),
  error: state.dashboard.get('head').get('error'),
  games: state.dashboard.get('head').get('games')
}))


export default class DashboardHead extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    games: PropTypes.array
  }

  constructor() {
    super();

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(index) {
    this.props.dispatch(clickOnHeaderImage(index));
  }

  componentWillMount() {
    if(!this.props.games.size) {
      this.props.dispatch(getDashboardHeadDataAsync());
    }
  }

  render() {
    const { selectedIndex } = this.props;
    const data = this.props.games;

    return(
      <div className='DashboardHead'>
        <div className='games-list'>
          {data.map((game, index) => (
            <li
              key={index}
              onClick={() => this.onImageClick(index)}
            >
              <img
                src={game.img}
                className={selectedIndex === index ? 'active' : '' } />
            </li>
          ))}
        </div>
        {
          selectedIndex >= 0 ? <TextBlock game = {data[selectedIndex]} /> : null
        }
      </div>
    );
  }
}
