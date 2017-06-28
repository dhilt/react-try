import React, { Component } from 'react';

export const TextBlock = props => {
  const {game} = props;
  return (
    <div className='text-block'>
      <h2>{game.title}</h2>
      <p>{game.text}</p>
    </div>
  )
}