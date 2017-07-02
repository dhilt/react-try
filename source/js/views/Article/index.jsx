import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { ConfirmationModal } from 'views/_admin/confirmation';

import { getArticleAsync } from 'actions/article';
import { setEditPageSource } from 'actions/_admin/editArticle';
import { removeArticleAsync } from 'actions/_admin/removeArticle';
import { openConfirmationModal, closeConfirmationModal } from 'actions/_admin/confirmation';

@connect(state => ({
  data: state.article.get('data'),
  pending: state.article.get('pending'),
  error: state.article.get('error'),
  role: state.auth.get('userInfo').get('role'),
  isOpenModal: state._adminConfirmation.get('isOpenModal')
}))
export default class Article extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    pending: PropTypes.bool,
    error: PropTypes.string,
    role: PropTypes.number
  }

  constructor() {
    super();
    this.makeArticle = this.makeArticle.bind(this);
    this.goToArticlePage = this.goToArticlePage.bind(this);
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.removeArticle = this.removeArticle.bind(this)
    this.state = { isRemovedArticle: false }
  }

  componentWillMount() {
    this.props.dispatch(getArticleAsync(this.props.match.params.id));
  }

  goToArticlePage(e) {
    e.preventDefault();
    this.props.dispatch(setEditPageSource());
    let location = this.props.history.location;
    location.pathname = e.target.pathname;
    this.props.history.push(location);
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

  openModal() {
    this.props.dispatch(openConfirmationModal())
  }

  closeModal() {
    this.props.dispatch(closeConfirmationModal())
  }

  removeArticle() {
    this.props.dispatch(removeArticleAsync(this.props.data.get('id')))
    this.setState({ isRemovedArticle: true })
  }

  render() {
    let { data, pending, error, role, isOpenModal } = this.props
    let { isRemovedArticle } = this.state

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

        {role === 1 &&
          <div className='adminPanelCreateAndRemoveArticles'>
            <a onClick={this.goToArticlePage} href={'/admin/articles/' + data.get('id')}>{'Править статью +'}</a>
            <a onClick={this.openModal}>{'Удалить статью -'}</a>
            <ConfirmationModal
              isOpenModal={isOpenModal}
              closeModal={this.closeModal}
              confirmEvent={this.removeArticle}
              dialogTitle={'Confirm removing article'}
              textButtonOk={'Yes, remove article!'}
              textButtonCancel={'No, hide this modal!'} />
            { isRemovedArticle && <Redirect to={'/articles'}/> }
          </div>
        }
      </div>
    );
  }
}
