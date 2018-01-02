import React from 'react'

// Maybe add getMonthName() function to prototype of js-object Date, in /helpers
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default props =>
  <ul className="list-dashboard-articles">
  {
    props.list.map((article, index) => {
      const time = new Date(article.get('createdAt'))
      const articleMonth = time.getMonth()
      const articleDay = time.getUTCDate()
      return (
        <div key={index} className="article">
          <div className="user-info-article">
            <div className="article-created-at">
              <p>{articleDay}</p>
              <p>{months[articleMonth]}</p>
            </div>
            <img src={article.get('image')} />
            <div>{article.get('userName')}</div>
          </div>
          <div className="text-article">
            <p>{article.get('title')}</p>
            <p>{article.get('description')}</p>
            <p>{article.get('text')}</p>
          </div>
        </div>
      )
    })
  }
  </ul>
