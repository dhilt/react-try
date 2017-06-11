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
  }

  componentWillMount() {
    this.props.dispatch(getArticleAsync(this.props.params.id));
  }

  render() {
    let { data } = this.props;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const time = new Date(data.get('createdAt'));
    const articleMonth = time.getMonth();
    const articleDay = time.getDate();
    const Article = <div>
                      <p>Date: {articleDay} {months[articleMonth]}</p>
                      <p>Author: {data.get('userName')}</p>
                      <p>{data.get('title')}</p>
                      <p>{data.get('description')}</p>
                      <p>{data.get('text')}</p>
                    </div>;

    return (
      <div>{Article}</div>
    );
  }
}
