import React from 'react'

export default props =>
  <div className="text-block">
    <h2>{props.game.get('title') || ''}</h2>
    <p>{props.game.get('text') || ''}</p>
  </div>
