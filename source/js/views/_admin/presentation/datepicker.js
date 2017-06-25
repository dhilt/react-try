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
    this.format = 'DD/MM/YYYY';
    this.onDateChanged = this.onDateChanged.bind(this);
    this.onBlurDateChanged = this.onBlurDateChanged.bind(this);
    this.state = {
      date: moment()
    };
  }

  validateDate(date) {
    let isValid = false;
    if(!(date instanceof Date)) {
      return false;
    }
    let matches = date.toISOString().split(/-|T|:/);
    if (!matches) {
      return false;
    }
    let d = matches[2];
    let m = matches[1] - 1;
    let y = matches[0];
    let composedDate = new Date(y, m, d);
    return composedDate.getDate() == d && composedDate.getMonth() == m && composedDate.getFullYear() == y;
  }

  getValidationObject(value) {
    return {
      required: () => !!value,
      dateFormat: () => !!value && this.validateDate(value)
    }
  }

  onDateChanged(date) {
    const { dispatch, model } = this.props;
    let dateValue = !date ? null : (date._d || date);
    this.setState({ date: date && date._d ? date : null });
    dispatch(actions.change(model, dateValue));
    dispatch(actions.validate(model, this.getValidationObject(dateValue)));
  }

  onBlurDateChanged() {
    const inputValue = this.refs.datePicker.refs.input.value;
    const momentValue = moment(inputValue, this.format);
    if(momentValue.format(this.format) === inputValue) {
      this.onDateChanged(momentValue);
    }
    else {
      this.onDateChanged(inputValue);
    }
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.change('newArticle.date', this.state.date._d));
    dispatch(actions.setValidity('newArticle.date', this.getValidationObject(this.state.date._d)));
  }

  render() {
    let { model, dispatch } = this.props;

    return (
      <DatePicker
        dateFormat={this.format}
        todayButton="Today"
        ref="datePicker"
        selected={this.state.date}
        onChange={this.onDateChanged}
        onBlur={this.onBlurDateChanged}
      />
    );
  }
}