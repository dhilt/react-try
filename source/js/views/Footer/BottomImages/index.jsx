import React, { Component } from 'react'

const BottomImages = props => {
  return (
    <div className='bottom-images'>
      <div className='table-age-limit'>{'18+'}</div>
      <div className='table-copyright'>
        <p>{'Copyright © 2001-2014'}</p>
        <pre>{'Все права защищены законодательством РФ. Использование материалов сайта возможно только с прямой ссылкой на источник.'}</pre>
      </div>
      <div className='footer-guy-with-guns'/>
      <div className='footer-rectangles'/>
      <hr className='bottom-red-line'/>
      <hr className='bottom-blue-line'/>
    </div>
  )
}

export default BottomImages
