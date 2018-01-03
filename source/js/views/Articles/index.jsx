import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Paging from './Paging'
import ArticlesControlPanel from 'views/_admin/Articles/ArticlesControlPanel'
import ArticleControlPanel from 'views/_admin/Articles/ArticleControlPanel'

import { setPage } from 'actions/articles'
import {
  getLocationPage,
  persistPage
} from 'helpers/page'

@connect(state => ({
  role: state.auth.get('userInfo').get('role'),
  listArticles: state.articles.get('listArticles'),
  pending: state.articles.get('pending'),
  error: state.articles.get('error'),
  total: state.articles.get('total'),
  page: state.articles.get('page'),
  count: state.articles.get('count')
}))
export default class Articles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    listArticles: PropTypes.array,
    pending: PropTypes.bool,
    error: PropTypes.string,
    total: PropTypes.number,
    page: PropTypes.number,
    count: PropTypes.number
  }

  constructor() {
    super()
  }

  componentWillMount() {
    const { dispatch, history, page, listArticles } = this.props
    let urlPage = getLocationPage(history.location), currentPage
    if(urlPage) {
      currentPage = urlPage - 1
    }
    else {
      currentPage = Number(localStorage.getItem('pageArticles')) || 0
      persistPage(currentPage, history)
    }
    if(currentPage !== page || !listArticles.size) {
      dispatch(setPage(currentPage, history))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, history, page } = this.props
    if(nextProps.pending) {
      return
    }
    if (!this.props.listArticles.size) {
      dispatch(setPage(0, history))
    }
    let urlPage = getLocationPage(history.location)
    let currentPage = urlPage ? urlPage - 1 : 0
    if(currentPage !== page) {
      dispatch(setPage(currentPage, history))
    }
  }

  render() {
    const Articles = this.props.listArticles.map((article, index) => {
      const time = new Date(article.get('createdAt'))
      const articleMonthName = time.getMonthName()
      const articleYear = time.getFullYear()
      const articleDay = time.getUTCDate()
      return (
        <div key={index} className='article-one-of'>
          <img src={article.get('image')} />
          <div className='head-article'>
            <span>{articleDay + ' ' + articleMonthName + ', ' + articleYear}</span>
            <span>{' ' + article.get('userName') + ' '}</span>
            <Link to={'/articles/' + article.get('id')}> {article.get('title')}</Link>
            {this.props.role === 1 &&
              <ArticleControlPanel
                history={this.props.history}
                idArticle={article.get('id')}/>}
          </div>
          <span>{article.get('description')}&nbsp;</span>
        </div>
      )
    })
    return (
      <div className='articles-list'>
        <Paging history={this.props.history} />
        {this.props.role === 1 &&
          <ArticlesControlPanel history={this.props.history} />}
        <ul className={this.props.pending ? 'articles-preloader' : ''}>{Articles}</ul>
      </div>
    )
  }
}
