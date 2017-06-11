import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getArticlesAsync } from 'actions/articles';
import Paging from './Paging';

@connect(state => ({
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
    super();
  }

  componentWillMount() {
    if(!this.props.listArticles.length) {
      this.props.dispatch(getArticlesAsync());
    }
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let Articles = this.props.listArticles.map((article, index) => {
      const time = new Date(article.get('createdAt'));
      let articleYear = time.getFullYear();
      let articleMonth = time.getMonth();
      let articleDay = time.getDate();
      return <div key={index} className='Article'>
               <p>Date: {articleDay} {months[articleMonth]} {articleYear}. Author: {article.get('userName')}. Title: <Link to={'articles/' + article.get('id')}> {article.get('title')}</Link></p>
               <span>Description: {article.get('description')}</span>
             </div>
    });
    return (
      <div className='Articles'>
        <Paging />
        <ul className={this.props.pending ? 'ArticlesPreloader' : ''}>{Articles}</ul>
      </div>
    );
  }
}
