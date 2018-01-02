import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import GameText from './DashboardGameText'
import MenuGames from './DashboardMenuGames'
import {
  getDashboardGamesAsync,
  clickOnHeaderImage
} from 'actions/dashboard'

@connect(state => ({
  selectedIndex: state.dashboard.get('head').get('selectedIndex'),
  games: state.dashboard.get('head').get('games')
}))
export default class DashboardHead extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    games: PropTypes.array
  }

  constructor() {
    super()
    this.onImageClick = this.onImageClick.bind(this)
  }

  componentWillMount() {
    if(!this.props.games.size) {
      this.props.dispatch(getDashboardGamesAsync())
    }
  }

  onImageClick(index) {
    if (this.props.selectedIndex === index) {
      return
    }
    this.props.dispatch(clickOnHeaderImage(index))
  }

  render() {
    const { selectedIndex, games } = this.props
    const bckImg = {background: ''}
    if (games.size && selectedIndex >= 0) {
      const imgUrl = games.get(selectedIndex).get('image')
      bckImg.background = `url('${imgUrl}') no-repeat scroll 0% 0% / cover`
    }

    return (
      <div className="dashboard-head" style={bckImg}>
        <div className="dashboard-games">
          {games.size &&
            <MenuGames games={games}
              onImageClick={this.onImageClick}
              selectedIndex={selectedIndex} />
          }
          { selectedIndex >= 0 && <GameText game={games.get(selectedIndex)} /> }
        </div>
      </div>
    )
  }
}
