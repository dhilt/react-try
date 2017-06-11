import React, { Component } from 'react';
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
      let articleMonth = time.getMonth();
      let articleDay = time.getDate();
      return <div key={index} className='Article'>
               <p>Date: {articleDay} {months[articleMonth]}</p>
               <p>Author: {article.get('userName')}</p>
               <p>{article.get('title')}</p>
               <p>{article.get('description')}</p>
             </div>
    });
    return (
      <div className='Articles'>
        <Paging />
        <ul>{Articles}</ul>
      </div>
    );
  }
}
