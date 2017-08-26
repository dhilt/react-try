import React, { Component } from 'react'

export const ArticleContents = props => {

  const article = props.article
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const time = new Date(article.get('createdAt'))
  const articleYear = time.getFullYear()
  const articleMonth = time.getMonth()
  const articleDay = time.getDate()

  return (
    <div>
      <p className='titleArticle'>{article.get('title')}</p>
      <p className='dateArticle'>Date: {articleDay} {months[articleMonth]}, {articleYear}</p>
      <p className='authorArticle'>Author: {article.get('userName')}</p>
      <p className='descriptionArticle'>{article.get('description')}</p>
      <img className='imageArticle' src={article.get('image')} />
      <pre className='textArticle'>{article.get('text')}</pre>
    </div>
  )
}
