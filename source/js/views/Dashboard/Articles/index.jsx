import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardArticleList from './List/index';
import { getDashboardArticlesAsync } from 'actions/dashboard';

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  list: state.dashboard.get('articles').get('list')
}))
export default class DashboardArticles extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    list: PropTypes.array
  }

  constructor() {
    super();
    
    this.getAnotherArticles = this.getAnotherArticles.bind(this);
  }

  getAnotherArticles() {
    this.props.dispatch(getDashboardArticlesAsync(this.props.list.length));
  }

  render() {
    let { pending } = this.props;
    return (
      <div className='wrappingArticles'>
        <div className='headerArticles'>
          <h>{'Статьи'}</h>
          <a>{'Все статьи'}</a>
          <a>{'Добавить статью +'}</a>
        </div>
        <DashboardArticleList />
        <div className='downloadArticles'>
          <a disabled={pending}
             className={pending ? 'preloader' : ''}
             onClick={this.getAnotherArticles}>{'Подгрузить еще'}</a>
        </div>
      </div>
    );
  }
}
