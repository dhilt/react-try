import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Paging from './Paging'
import ArticlesList from './ArticlesList'
import ArticlesControlPanel from 'views/_admin/Articles/ArticlesControlPanel'

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
    count: PropTypes.number,
    page: PropTypes.number
  }

  constructor() {
    super()
    this.handleChangePage = this.handleChangePage.bind(this)
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
    if (!this.props.listArticles.size) { // problem here
      dispatch(setPage(0, history))
    }
    const urlPage = getLocationPage(history.location)
    const currentPage = urlPage ? urlPage - 1 : 0
    if(currentPage !== page) {
      dispatch(setPage(currentPage, history))
    }
  }

  handleChangePage(page) {
    const { dispatch, pending, history } = this.props
    if(!pending) {
      dispatch(setPage(page, history))
    }
  }

  render() {
    const { listArticles, total, count, page, pending, role } = this.props
    return (
      <div className="articles-list">
        <Paging
          handleChangePage={this.handleChangePage}
          history={history}
          pending={pending}
          count={count}
          total={total}
          page={page} />
        {role === 1 && <ArticlesControlPanel history={history} />}
        <ArticlesList
          listArticles={listArticles}
          pending={pending}
          role={role} />
      </div>
    )
  }
}
