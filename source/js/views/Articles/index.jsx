import React, { Component } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setPage } from 'actions/articles';
import { persistPage } from 'helpers/page';
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
    let urlPage = Number(browserHistory.getCurrentLocation().query.page), page;
    if(urlPage) {
      page = urlPage - 1;
    }
    else {
      page = Number(localStorage.getItem('pageArticles')) || 0;
      persistPage(page);
    }
    if(page !== this.props.page || !this.props.listArticles.size) {
      this.props.dispatch(setPage(page));
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pending) {
      return;
    }
    let urlPage = Number(nextProps.location.query.page);
    let page = urlPage ? urlPage - 1 : 0;
    if(page !== this.props.page) {
      this.props.dispatch(setPage(page));
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
                <img src={article.get('image')} />
                <div> {months[articleMonth]}, {articleDay} {articleYear} <Link to={'articles/' + article.get('id')}> {article.get('title')}</Link> {article.get('userName')}</div>
                <span>{article.get('description')}&nbsp;</span>
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
