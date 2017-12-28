import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { TextBlock } from './TextBlock'
import {
  clickOnHeaderImage,
  getDashboardGamesAsync
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

  onImageClick(index) {
    if (this.props.selectedIndex === index) {
      return
    }
    this.props.dispatch(clickOnHeaderImage(index))
  }

  componentWillMount() {
    if(!this.props.games.size) {
      this.props.dispatch(getDashboardGamesAsync())
    }
  }

  render() {
    const { selectedIndex } = this.props
    let games = []
    let backgroundGameImage = {background: ''}
    let showImageGames = null
    if (this.props.games.length !== 0) {
      games = this.props.games.toJS()
      backgroundGameImage = {background: 'url(' + games[selectedIndex].image + ') no-repeat scroll 0% 0% / cover'}
      showImageGames = games.map((game, index) => (
        <img key={index}
          src={game.image}
          onClick={() => this.onImageClick(index)}
          className={selectedIndex === index ? 'active' : ''}
        />
      ))
    }

    return(
      <div className='dashboard-head' style={backgroundGameImage}>
        <div className='games-list'>
          {games.length ? <div className='left-up-game-decoration' /> : null}
          {showImageGames}
          {games.length ? <div className='right-down-game-decoration' /> : null}
          {selectedIndex >= 0 ? <TextBlock game = {games[selectedIndex]} /> : null}
        </div>
      </div>
    )
  }
}
