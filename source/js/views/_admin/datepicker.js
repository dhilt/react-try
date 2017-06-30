import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form/immutable';
import moment from 'moment';

import DatePicker from 'react-datepicker';

@connect(state => ({}))
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

  onDateChanged(date) {
    const { dispatch, model, validators } = this.props;
    let dateValue = !date ? null : (date._d || date);
    this.setState({ date: date && date._d ? date : null });
    dispatch(actions.change(model, dateValue));
    dispatch(actions.validate(model, validators(dateValue)));
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
    const { dispatch, model, validators } = this.props;
    dispatch(actions.change(model, this.state.date._d));
    dispatch(actions.validate(model, validators(this.state.date._d)));
  }

  render() {
    let dateValue = moment(this.props.value)
    return (
      <DatePicker
        dateFormat={this.format}
        todayButton="Today"
        ref="datePicker"
        selected={dateValue || this.state.date}
        onChange={this.onDateChanged}
        onBlur={this.onBlurDateChanged}
      />
    );
  }
}