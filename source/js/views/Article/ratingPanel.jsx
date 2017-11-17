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
    <div className='rating-panel' title={!accessToVote ? 'Голосование доступно только для пользователей' : ''}>
      <button
        type='button'
        disabled={pendingVote}
        onClick={voteDown}
        className={!accessToVote && 'no-moving-dislike-button' || accessToVote && (isVoted === -1 ? 'has-dislike-button' : 'dislike-button')} />
      <span className={rating == 0 && 'neutral-rating' || (rating > 0 ? 'positive-rating' : 'negative-rating')}>{rating}</span>
      <button
        type='button'
        disabled={pendingVote}
        onClick={voteUp}
        className={!accessToVote && 'no-moving-like-button' || accessToVote && (isVoted === 1 ? 'has-like-button' : 'like-button')} />
      {pendingVote && <div className='preloader' />}
    </div>
  )
}
