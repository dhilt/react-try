import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ArticleContents } from 'views/Article/article'
import ArticleControls from 'views/_admin/Article/ArticleControls'

import { getArticleAsync } from 'actions/article'

@connect(state => ({
  data: state.article.get('data'),
  pending: state.article.get('pending'),
  error: state.article.get('error'),
  role: state.auth.get('userInfo').get('role')
}))
export default class Article extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    pending: PropTypes.bool,
    error: PropTypes.string,
    role: PropTypes.number
  }

  componentWillMount() {
    this.props.dispatch(getArticleAsync(this.props.match.params.id));
  }

  render() {
    let { data, pending, error, role, history } = this.props

    return (<div className='wrapArticle'> {
      !data ? (
        pending ? (
            <div className='ArticlePreloader'></div>
          ) : (
            <p>{error}</p>
          )
        ) : (
        <div>
          <ArticleContents article={data} />
          { role === 1 && ( <ArticleControls history={history} /> ) }
        </div>
      )
    }
    </div>)
  }
}
