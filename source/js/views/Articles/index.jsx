import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setPage } from 'actions/articles';
import { getLocationPage, persistPage } from 'helpers/page';
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
    const { dispatch, history, page, listArticles } = this.props;
    let urlPage = getLocationPage(history.location), currentPage;
    if(urlPage) {
      currentPage = urlPage - 1;
    }
    else {
      currentPage = Number(localStorage.getItem('pageArticles')) || 0;
      persistPage(currentPage, history);
    }
    if(currentPage !== page || !listArticles.size) {
      dispatch(setPage(currentPage, history));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, history, page } = this.props;
    if(nextProps.pending) {
      return;
    }
    let urlPage = getLocationPage(history.location);
    let currentPage = urlPage ? urlPage - 1 : 0;
    if(currentPage !== page) {
      dispatch(setPage(currentPage, history));
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
                <div> {months[articleMonth]}, {articleDay} {articleYear} <Link to={'/articles/' + article.get('id')}> {article.get('title')}</Link> {article.get('userName')}</div>
                <span>{article.get('description')}&nbsp;</span>
             </div>
    });
    return (
      <div className='Articles'>
        <Paging history={this.props.history} />
        <ul className={this.props.pending ? 'ArticlesPreloader' : ''}>{Articles}</ul>
      </div>
    );
  }
}
