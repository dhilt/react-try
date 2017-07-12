import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clickOnHeaderImage, getDashboardHeadDataAsync } from 'actions/dashboard';
import { TextBlock } from './TextBlock';

@connect(state => ({
  selectedIndex: state.dashboard.get('head').get('selectedIndex'),
  pending: state.dashboard.get('head').get('pending'),
  error: state.dashboard.get('head').get('error'),
  games: state.dashboard.get('head').get('games')
}))


export default class DashboardHead extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    games: PropTypes.array
  }

  constructor() {
    super();

    this.onImageClick = this.onImageClick.bind(this);
  }

  onImageClick(index) {
    this.props.dispatch(clickOnHeaderImage(index));
  }

  componentWillMount() {
    if(!this.props.games.size) {
      this.props.dispatch(getDashboardHeadDataAsync());
    }
  }

  render() {
    const { selectedIndex } = this.props;
    const data = [
      {
        img: 'assets/img/game1.png',
        title: "Ненавязчивый анализ Mirror's EdgeBattlefield 4",
        text: 'Еще совсем недавно осенью считалась главным поставщиком крупных игровых релизов. Полки магазинов ломились от новинок, а от покупателей не было отбоя. Доходило до того, что к концу сезона кошельки походили на выпотрошеные туши.'
      },
      {
        img: 'assets/img/game2.png',
        title: "Mass Effect: Andromeda",
        text: 'Текст для Mass Effect: Andromeda.'
      },
      {
        img: 'assets/img/game3.png',
        title: "Remember Me",
        text: 'Текст для Remember Me.'
      },
      {
        img: 'assets/img/game4.png',
        title: "Battlefield 4",
        text: 'Текст для Battlefield 4.'
      },
      {
        img: 'assets/img/game5.png',
        title: "Fable 3",
        text: "Текст для Fable 3."
      },
      {
        img: 'assets/img/game6.png',
        title: "Call of Duty 4: Modern Warfare",
        text: 'Текст для Call of Duty 4: Modern Warfare.'
      }
    ];

    return(
      <div className='DashboardHead'>
        <div className='games-list'>
          {data.map((game, index) => (
            <li
              key={index}
              onClick={() => this.onImageClick(index)}
            >
              <img
                src={game.img}
                className={selectedIndex === index ? 'active' : '' } />
            </li>
          ))}
        </div>
        {
          selectedIndex >= 0 ? <TextBlock game = {data[selectedIndex]} /> : null
        }
      </div>
    );
  }
}
