import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DashboardArticleList from './List/index';
import { getDashboardArticlesAsync } from 'actions/dashboard';

export default class DashboardArticles extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className='wrappingArticles'>
        <div className='headerArticles'>
          <h>{'Статьи'}</h>
          <a>{'Все статьи'}</a>
          <a>{'Добавить статью +'}</a>
        </div>
        <DashboardArticleList />
        <div className='downloadArticles'>
          <a>{'Подгрузить еще'}</a>
        </div>
      </div>
    );
  }
}
