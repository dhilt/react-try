import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDashboardArticlesAsync } from 'actions/dashboard';

@connect(state => ({
  pending: state.dashboard.get('articles').get('pending'),
  error: state.dashboard.get('articles').get('error'),
  list: state.dashboard.get('articles').get('list')
}))
export default class DashboardArticleList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    list: PropTypes.array
  }

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(getDashboardArticlesAsync());
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let listArticles = this.props.list.map((article, index) => {
      const time = new Date(article.createdAt);
      let articleMonth = time.getMonth();
      let articleDay = time.getDate();
      return <div className='Article'>
               <div className='userInfoArticle'>
                 <div className='articleCreatedAt'>
                   <p>{articleDay}</p>
                   <p>{months[articleMonth]}</p>
                 </div>
                 <img src={article.image} />
                 <div>{article.userName}</div>
               </div>
               <div className='textArticle'>
                  <p>{article.title}</p>
                  <p>{article.description}</p>
                  <p>{article.text}</p>
               </div>
             </div>
    });
    return (
      <ul className='listArticles'>{listArticles}</ul>
    );
  }
}
