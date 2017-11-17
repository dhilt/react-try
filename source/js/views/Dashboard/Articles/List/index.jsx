import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getDashboardArticlesAsync } from 'actions/dashboard'

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  error: state.dashboard.get('articles').get('error'),
  list: state.dashboard.get('articles').get('list')
}))
export default class DashboardArticleList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    list: PropTypes.array
  }

  constructor() {
    super()
  }

  componentWillMount() {
    if(!this.props.list.size) {
      this.props.dispatch(getDashboardArticlesAsync())
    }
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let listArticles = this.props.list.map((article, index) => {
      const time = new Date(article.get('createdAt'))
      let articleMonth = time.getMonth()
      let articleDay = time.getUTCDate()
      return (
        <div key={index} className='article'>
          <div className='user-info-article'>
            <div className='article-created-at'>
              <p>{articleDay}</p>
              <p>{months[articleMonth]}</p>
            </div>
            <img src={article.get('image')} />
            <div>{article.get('userName')}</div>
          </div>
          <div className='text-article'>
            <p>{article.get('title')}</p>
            <p>{article.get('description')}</p>
            <p>{article.get('text')}</p>
          </div>
        </div>
      )
    })
    return (
      <ul className='list-dashboard-articles'>{listArticles}</ul>
    )
  }
}
