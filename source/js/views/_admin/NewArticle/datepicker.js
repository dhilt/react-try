import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form/immutable';
import moment from 'moment';

import DatePicker from 'react-datepicker';

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
    dispatch(actions.change(model, dateValue));
    dispatch(actions.validate('newArticle.date', {
      required: (value) => value && value.valueOf(),
      dateFormat: (value) => value && value.valueOf() && value.getYear() && value.getMonth() && value.getHours()
    }));
  }

  componentWillMount() {
    this.props.dispatch(actions.change('newArticle.date', new Date()));
    this.props.dispatch(actions.setValidity('newArticle.date', true));
    this.props.dispatch(actions.setValidity('newArticle.date', {
      required: true,
      dateFormat: true
    }));
    this.props.dispatch(actions.setErrors('newArticle.date', {
      required: (value) => !value && !value.valueOf() && 'Date is required',
      dateFormat: (value) => !value && !value.valueOf() && !value.getYear() && !value.getMonth() && !value.getHours() && 'Date is invalid'
    }));
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
