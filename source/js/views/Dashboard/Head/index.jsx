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
      <div className='DashboardHead' style={backgroundGameImage}>
        <div className='games-list'>
          {games.length ? <div className='leftupGameDecoration' /> : null}
          {showImageGames}
          {games.length ? <div className='rightdownGameDecoration' /> : null}
          {selectedIndex >= 0 ? <TextBlock game = {games[selectedIndex]} /> : null}
        </div>
      </div>
    )
  }
}
