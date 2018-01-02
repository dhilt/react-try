import React from 'react'

export default props =>
  <div className="dashboard-games-list">
    <div className="left-up-game-decoration" />
      {
        props.games.map((game, index) => (
          <img key={index}
            src={game.get('image')}
            onClick={() => props.onImageClick(index)}
            className={props.selectedIndex === index && 'active'}
          />
        ))
      }
    <div className="right-down-game-decoration" />
  </div>
