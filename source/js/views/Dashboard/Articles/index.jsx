import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DashboardArticlesList from './DashboardArticlesList'
import { getDashboardArticlesAsync } from 'actions/dashboard'

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  error: state.dashboard.get('articles').get('error'),
  list: state.dashboard.get('articles').get('list'),
  role: state.auth.get('userInfo').get('role')
}))
export default class DashboardArticles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    list: PropTypes.array,
    role: PropTypes.number
  }

  constructor() {
    super()
    this.getAnotherArticles = this.getAnotherArticles.bind(this)
  }

  componentWillMount() {
    if(!this.props.list.size) {
      this.props.dispatch(getDashboardArticlesAsync())
    }
  }

  getAnotherArticles() {
    if(!this.props.pending) {
      this.props.dispatch(getDashboardArticlesAsync(this.props.list.size))
    }
  }

  render() {
    const { list, pending, role } = this.props
    return (
      <div className="wrapping-articles">
        <div className="header-articles">
          <Link to='articles'>{'Статьи'}</Link>
          <Link to='articles'>{'Все статьи'}</Link>
          {role === 1 && <Link to='/admin/articles/new'>{'Добавить статью +'}</Link>}
        </div>
        <DashboardArticlesList list={list} />
        <div className="download-articles">
          <a onClick={this.getAnotherArticles}
             className={pending ? 'preloader' : ''}>
             {'Подгрузить еще'}
          </a>
        </div>
      </div>
    )
  }
}
