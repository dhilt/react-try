import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectHeaderImage } from 'actions/dashboard';

@connect(state => ({
  selectedIndex: state.dashboard.get('head').get('selectedIndex')
}))


export default class DashboardHead extends Component {
  constructor() {
    super();

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(index) {
    this.props.dispatch(selectHeaderImage(index));
  }

  render() {
    const data = [
      {
        img: 'assets/img/game1.png',
        title: "Ненавязчивый анализ Mirror's EdgeBattlefield 4",
        text: 'Еще совсем недавно осенью считалась главным поставщиком крупных игровых релизов. Полки магазинов ломились от новинок, а от покупателей не было отбоя. Доходило до того, что к концу сезона кошельки походили на выпотрошеные туши.'
      },
      {
        img: 'assets/img/game2.png',
        title: "Mass Effect: Andromeda",
        text: 'Текст для картинки 2.'
      },
      {
        img: 'assets/img/game3.png',
        title: "Battlefield 4",
        text: 'Текст для картинки 1.'
      },
      {
        img: 'assets/img/game4.png',
        title: "Заголовок для картинки 4",
        text: 'Текст для картинки 4.'
      },
      {
        img: 'assets/img/game5.png',
        title: "Заголовок для картинки 5",
        text: 'Текст для картинки 5.'
      },
      {
        img: 'assets/img/game6.png',
        title: "Remember Me",
        text: 'Текст для картинки 6.'
      }
    ];

    var selectedIndex;

    return(
      <div className='DashboardHead'>
        <div className='GamesList'>
          {data.map((game, index) => (
            <li
              key={index}
              onClick={this.onImageClick(index)}
            >
              <img src={game.img} />
            </li>
          ))}
        </div>
      </div>
    );
  }
}