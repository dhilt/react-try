import React from 'react'

export default props => {

  const { role, rateUp, rateDown, voteArticle, isVoted, pendingVote } = props
  const accessToVote = role !== null
  let rating = rateUp - rateDown
  if (Number(rateUp) > Number(rateDown)) {
    rating = '+' + rating
  }

  const voteDown = () => accessToVote && voteArticle(-1)
  const voteUp = () => accessToVote && voteArticle(1)

  return (
    <div className="rating-panel" title={!accessToVote && 'Голосование доступно только для пользователей'}>
      <button type="button"
        className={!accessToVote && 'no-moving-dislike-button' ||
          accessToVote && (isVoted === -1 ? 'has-dislike-button' : 'dislike-button')
        }
        disabled={pendingVote}
        onClick={voteDown} />
      <span className={rating == 0 && 'neutral-rating' || (rating > 0 ? 'positive-rating' : 'negative-rating')}>
        {rating}
      </span>
      <button type="button"
        className={!accessToVote && 'no-moving-like-button' ||
          accessToVote && (isVoted === 1 ? 'has-like-button' : 'like-button')
        }
        disabled={pendingVote}
        onClick={voteUp} />
      {pendingVote && <div className="preloader" />}
    </div>
  )
}
