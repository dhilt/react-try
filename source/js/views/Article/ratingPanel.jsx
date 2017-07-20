import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkUserVote, voteArticle } from 'actions/article'

@connect(state => ({
  rateUp: state.article.get('data').get('rateUp'),
  rateDown: state.article.get('data').get('rateDown'),
  isVoted: state.article.get('isVoted'),
  pendingVote: state.article.get('pendingVote'),
  role: state.auth.get('userInfo').get('role')
}))
export default class RatingPanel extends Component {

  constructor() {
    super()
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(checkUserVote())
  }

  voteUp() {
    if (this.props.role !== null) {
      this.props.dispatch(voteArticle(1))
    }
  }

  voteDown() {
    if (this.props.role !== null) {
      this.props.dispatch(voteArticle(-1))
    }
  }

  render() {
    const { rateUp, rateDown, isVoted, pendingVote } = this.props
    let rating = rateUp - rateDown
    if (Number(rateUp) > Number(rateDown)) {
      rating = '+' + rating
    }

    return (
      <div className='ratingPanel'>
        <button type='button' disabled={pendingVote} onClick={this.voteDown}
          className={isVoted === -1 ? 'hasDislikeButton' : 'dislikeButton'} />
        <span className={rateUp >= rateDown ? 'positiveRating' : 'negativeRating'}>{rating}</span>
        <button type='button' disabled={pendingVote} onClick={this.voteUp}
          className={isVoted === 1 ? 'hasLikeButton' : 'likeButton'} />
      </div>
    )
  }
}
