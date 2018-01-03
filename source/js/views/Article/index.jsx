import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ArticleControls from 'views/_admin/Article/ArticleControls'
import ArticleContent from 'views/Article/ArticleContent'
import RatingPanel from 'views/Article/RatingPanel'

import { getArticleAsync } from 'actions/article'
import { voteArticle } from 'actions/article'

@connect(state => ({
  rateDown: state.article.get('data') && state.article.get('data').get('rateDown'),
  rateUp: state.article.get('data') && state.article.get('data').get('rateUp'),
  pendingVote: state.article.get('pendingVote'),
  role: state.auth.get('userInfo').get('role'),
  isVoted: state.article.get('isVoted'),
  pending: state.article.get('pending'),
  error: state.article.get('error'),
  data: state.article.get('data')
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
    const { data, pending, error, role, history, rateUp, rateDown, isVoted, pendingVote } = this.props

    return (
      <div className="wrap-article">
        {
          !data ? (
            pending ? (
              <div className="article-preloader"></div>
            ) : (
              <p>{error}</p>
            )
          ) : (
            <div>
              <ArticleContent article={data} />
              <RatingPanel
                voteArticle={this.voteArticle}
                pendingVote={pendingVote}
                rateDown={rateDown}
                isVoted={isVoted}
                rateUp={rateUp}
                role={role} />
              { role === 1 && <ArticleControls history={history} /> }
            </div>
          )
        }
      </div>
    )
  }
}
