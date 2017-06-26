import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getArticleAsync } from 'actions/article';

@connect(state => ({
  data: state.article.get('data'),
  pending: state.article.get('pending'),
  error: state.article.get('error')
}))
export default class Article extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    pending: PropTypes.bool,
    error: PropTypes.string
  }

  constructor() {
    super();
    this.makeArticle = this.makeArticle.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getArticleAsync(this.props.match.params.id));
  }

  makeArticle(article) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const time = new Date(article.get('createdAt'));
    const articleYear = time.getFullYear();
    const articleMonth = time.getMonth();
    const articleDay = time.getDate();
    return <div className='wrapArticle'>
             <p className='titleArticle'>{article.get('title')}</p>
             <p className='dateArticle'>Date: {articleDay} {months[articleMonth]}, {articleYear}</p>
             <p className='authorArticle'>Author: {article.get('userName')}</p>
             <p className='descriptionArticle'>{article.get('description')}</p>
             <img className='imageArticle' src={article.get('image')} />
             <p className='textArticle'>{article.get('text')}</p>
           </div>
  }

  render() {
    let { data, pending, error } = this.props;

    return !data ? (
      pending ? (
        <div className='wrapArticle'>
          <div className='ArticlePreloader'></div>
        </div>
        ) : (
        <div className='wrapArticle'>
          <p>{error}</p>
        </div>
        )
      ) : (
      <div>
        {this.makeArticle(data)}
      </div>
    );
  }
}
