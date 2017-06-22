import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form/immutable';
import moment from 'moment';

import DatePicker from 'react-datepicker';

import { setTimeArticle } from 'actions/_admin/newArticle';

@connect(state => ({
  newArticle: state.admin.newArticle
}))

export default class MyDatepickerInput extends React.Component {

  constructor() {
    super();
    this.onDateChanged = this.onDateChanged.bind(this);
    this.state = {
      date: moment()
    };
  }

  onDateChanged(date) {
    const { dispatch, model } = this.props;
    this.setState({ date });
    let dateValue = date ? date._d : null;
    //dispatch(setTimeArticle(dateValue));
    dispatch(actions.change(model, dateValue));
  }  

  render() {
    let { model, dispatch } = this.props;

    return (
      <DatePicker
        dateFormat="DD MMM YYYY"
        todayButton="Today"
        selected={this.state.date}
        onChange={this.onDateChanged}
      />
    );
  }
}
