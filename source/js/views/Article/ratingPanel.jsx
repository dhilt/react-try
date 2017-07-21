import React, { Component } from 'react'

export const RatingPanel = props => {

  const { role, rateUp, rateDown, voteArticle, isVoted, pendingVote } = props
  const accessToVote = role !== null
  let rating = rateUp - rateDown
  if (Number(rateUp) > Number(rateDown)) {
    rating = '+' + rating
  }

  function voteDown() {
    if (accessToVote) {
      voteArticle(-1)
    }
  }

  function voteUp() {
    if (accessToVote) {
      voteArticle(1)
    }
  }

  return (
    <div className='ratingPanel' title={!accessToVote ? 'Голосование доступно только для пользователей' : ''}>
      <button
        type='button'
        disabled={pendingVote}
        onClick={voteDown}
        className={!accessToVote && 'noMovingDislikeButton' || accessToVote && (isVoted === -1 ? 'hasDislikeButton' : 'dislikeButton')} />
      <span className={rateUp >= rateDown ? 'positiveRating' : 'negativeRating'}>{rating}</span>
      <button
        type='button'
        disabled={pendingVote}
        onClick={voteUp}
        className={!accessToVote && 'noMovingLikeButton' || accessToVote && (isVoted === 1 ? 'hasLikeButton' : 'likeButton')} />
      <div className={pendingVote && 'preloader'} />
    </div>
  )
}
