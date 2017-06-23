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

  getValidationObject(value) {
    return {
      required: () => !!value,
      dateFormat: () => !!value && value.getYear() && value.getMonth() && value.getHours()
    }
  }

  onDateChanged(date) {
    const { dispatch, model } = this.props;
    this.setState({ date });
    let dateValue = date ? date._d : null;
    dispatch(actions.change(model, dateValue));
    dispatch(actions.validate(model, this.getValidationObject(dateValue)));
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
        dateFormat="DD MMM YYYY"
        todayButton="Today"
        selected={this.state.date}
        onChange={this.onDateChanged}
      />
    );
  }
}
