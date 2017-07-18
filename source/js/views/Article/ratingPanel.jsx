import React, { Component } from 'react'
import { connect } from 'react-redux'

import { voteUp, voteDown, ratingVote, cleanVote } from 'actions/article'

@connect(state => ({
  rateUp: state.article.get('data').get('rateUp'),
  rateDown: state.article.get('data').get('rateDown')
}))
export default class RatingPanel extends Component {

  constructor() {
    super()
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(cleanVote())
  }

  voteUp() {
    this.props.dispatch(ratingVote(1))
  }

  voteDown() {
    this.props.dispatch(ratingVote(-1))
  }

  render() {
    const { rateUp, rateDown } = this.props
    let rating = rateUp - rateDown
    if (Number(rateUp) > Number(rateDown)) {
      rating = '+' + rating
    }

    return (
      <div className='ratingPanel'>
        <button type='button' onClick={this.voteDown} className='dislikeButton'></button>
        <span className={rateUp >= rateDown ? 'positiveRating' : 'negativeRating'}>{rating}</span>
        <button type='button' onClick={this.voteUp} className='likeButton'></button>
      </div>
    )
  }
}
