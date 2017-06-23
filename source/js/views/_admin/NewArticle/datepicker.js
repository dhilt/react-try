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
    this.onBlurDateChanged = this.onBlurDateChanged.bind(this);
    this.state = {
      date: moment()
    };
  }

  validateDate(date) {
    let isValid = null;
    let matches = date.toISOString().split(/-|T|:/);
    if (matches == null)
      isValid = false;
    let d = matches[2];
    let m = matches[1] - 1;
    let y = matches[0];
    let composedDate = new Date(y, m, d);
    isValid = composedDate.getDate() == d && composedDate.getMonth() == m && composedDate.getFullYear() == y;
    return isValid;
  }

  getValidationObject(value) {
    return {
      required: () => !!value,
      dateFormat: () => !!value && this.validateDate(value)
    }
  }

  onDateChanged(date) {
    const { dispatch, model } = this.props;
    this.setState({ date });
    let dateValue = date ? date._d : null;
    dispatch(actions.change(model, dateValue));
    dispatch(actions.validate(model, this.getValidationObject(dateValue)));
  }

  onBlurDateChanged(date) {
//    this.onDateChanged(date);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.change('newArticle.date', this.state.date._d));
    dispatch(actions.setValidity('newArticle.date', this.getValidationObject(this.state.date._d)));
    // this.props.dispatch(actions.setErrors('newArticle.date', {
    //   required: (value) => !value && !value.valueOf() && 'Date is required',
    //   dateFormat: (value) => !value && !value.valueOf() && !value.getYear() && !value.getMonth() && !value.getHours() && 'Date is invalid'
    // }));
  }

  render() {
    let { model, dispatch } = this.props;

    return (
      <DatePicker
        dateFormat="DD/MM/YYYY"
        todayButton="Today"
        selected={this.state.date}
        onChange={this.onDateChanged}
        onBlur={this.onBlurDateChanged}
      />
    );
  }
}
