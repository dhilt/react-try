import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardArticleList from './List/index';
import { getDashboardArticlesAsync } from 'actions/dashboard';

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  list: state.dashboard.get('articles').get('list'),
  role: state.auth.get('userInfo').get('role')
}))
export default class DashboardArticles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    list: PropTypes.array,
    role: PropTypes.number
  }

  constructor() {
    super();
    
    this.getAnotherArticles = this.getAnotherArticles.bind(this);
  }

  getAnotherArticles() {
    if(!this.props.pending) {
      this.props.dispatch(getDashboardArticlesAsync(this.props.list.size));
    }
  }

  render() {
    let { pending, role } = this.props;
    return (
      <div className='wrappingArticles'>
        <div className='headerArticles'>
          <Link to='articles'>{'Статьи'}</Link>
          <Link to='articles'>{'Все статьи'}</Link>
          {role == 1 && <a>{'Добавить статью +'}</a>}
        </div>
        <DashboardArticleList />
        <div className='downloadArticles'>
          <a className={pending ? 'preloader' : ''}
             onClick={this.getAnotherArticles}>{'Подгрузить еще'}</a>
        </div>
      </div>
    );
  }
}
