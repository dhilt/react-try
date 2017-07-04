import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ArticleContents } from 'views/Article/article'
import { ArticleControls } from 'views/Article/controls'

import { getArticleAsync } from 'actions/article'
import { setEditPageSource } from 'actions/_admin/editArticle'
import { removeArticleAsync, openConfirmationModal, closeConfirmationModal } from 'actions/_admin/removeArticle'

@connect(state => ({
  data: state.article.get('data'),
  pending: state.article.get('pending'),
  error: state.article.get('error'),
  role: state.auth.get('userInfo').get('role'),
  isOpenModal: state._adminRemoveArticle && state._adminRemoveArticle.get('isOpenModal') || false,
  isRemovedArticle: state._adminRemoveArticle && state._adminRemoveArticle.get('isRemovedArticle') || false
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
    super()
    this.goToArticlePage = this.goToArticlePage.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.removeArticle = this.removeArticle.bind(this)
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

  openModal() {
    this.props.dispatch(openConfirmationModal())
  }

  closeModal() {
    this.props.dispatch(closeConfirmationModal())
  }

  removeArticle() {
    this.props.dispatch(removeArticleAsync(this.props.data.get('id')))
  }

  render() {
    let { data, pending, error, role, isOpenModal, isRemovedArticle } = this.props

    return (<div className='wrapArticle'> {
      !data ? (
        pending ? (
            <div className='ArticlePreloader'></div>
          ) : (
            <p>{error}</p>
          )
        ) : (
        <div>
          <ArticleContents article={data} />
          <ArticleControls
            id={data.get('id')}
            role={role}
            isOpenModal={isOpenModal}
            isRemovedArticle={isRemovedArticle}
            goToArticlePage={this.goToArticlePage}
            openModal={this.openModal}
            cancel={this.closeModal}
            confirm={this.removeArticle} />
        </div>
      )
    }
    </div>)
  }
}
