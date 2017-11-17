import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ArticleContents } from 'views/Article/article'
import { RatingPanel } from 'views/Article/ratingPanel'
import ArticleControls from 'views/_admin/Article/ArticleControls'

import { getArticleAsync } from 'actions/article'
import { voteArticle } from 'actions/article'

@connect(state => ({
  data: state.article.get('data'),
  pending: state.article.get('pending'),
  error: state.article.get('error'),
  role: state.auth.get('userInfo').get('role'),
  rateUp: state.article.get('data') && state.article.get('data').get('rateUp'),
  rateDown: state.article.get('data') && state.article.get('data').get('rateDown'),
  isVoted: state.article.get('isVoted'),
  pendingVote: state.article.get('pendingVote')
}))
export default class Article extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    pending: PropTypes.bool,
    error: PropTypes.string,
    role: PropTypes.number
  }

  constructor() {
    super()
    this.voteArticle = this.voteArticle.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(getArticleAsync(this.props.match.params.id))
  }

  voteArticle(vote) {
    this.props.dispatch(voteArticle(vote))
  }

  render() {
    let { data, pending, error, role, history, rateUp, rateDown, isVoted, pendingVote } = this.props

    return (
      <div className='wrap-article'>{
        !data ? (
          pending ? (
              <div className='article-preloader'></div>
            ) : (
              <p>{error}</p>
            )
          ) : (
          <div>
            <ArticleContents article={data} />
            <RatingPanel voteArticle={this.voteArticle}
              role={role}
              rateUp={rateUp}
              rateDown={rateDown}
              isVoted={isVoted}
              pendingVote={pendingVote} />
            { role === 1 && ( <ArticleControls history={history} /> ) }
          </div>
        )
      }
      </div>
    )
  }
}
