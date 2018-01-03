import React, { Component } from 'react'

export const ArticleContents = props => {

  const article = props.article
  // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const time = new Date(article.get('createdAt'))
  const articleMonthName = time.getMonthName()
  const articleYear = time.getFullYear()
  // const articleMonth = time.getMonth()
  const articleDay = time.getDate()

  return (
    <div>
      <p className='article-title'>{article.get('title')}</p>
      <p className='article-date'>Date: {articleDay} {articleMonthName}, {articleYear}</p>
      <p className='article-author'>Author: {article.get('userName')}</p>
      <p className='article-description'>{article.get('description')}</p>
      <img className='article-image' src={article.get('image')} />
      <pre className='article-text'>{article.get('text')}</pre>
    </div>
  )
}
