import React from 'react'

export default Footer =>
  <div className="page-footer">

    <div className="social-table">
      <hr className="yellow-top-line" />
      <div className="running-man-picture" />
      <ul className="social-links">
        <a href="http://www.twitter.com" />
        <a href="http://www.facebook.com" />
        <a href="http://www.vk.com" />
        <a href="http://www.google.com" />
        <a href="http://www.twitter.com" />
      </ul>
      <div className="footer-about-site">
        <p>{'Немного о нашем сайте'}</p>
        <pre>
          {'AM4 - это большая коллекция игровой информации, помогающей геймерам со всего мира быть в курсе последних новостей игрового мира.'}
        </pre>
      </div>
      <button
        onClick={() => alert('This functionality is missing.')}
        className="button-write-us">
        {'Написать нам'}
      </button>
    </div>

    <div className="bottom-images">
      <div className="table-age-limit">{'18+'}</div>
      <div className="table-copyright">
        <p>{'Copyright © 2001-2014'}</p>
        <pre>
          {'Все права защищены законодательством РФ. Использование материалов сайта возможно только с прямой ссылкой на источник.'}
        </pre>
      </div>
      <div className="footer-guy-with-guns" />
      <div className="footer-rectangles" />
      <hr className="bottom-red-line" />
      <hr className="bottom-blue-line" />
    </div>

  </div>
