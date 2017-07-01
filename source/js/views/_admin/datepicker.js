import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

export default class MyDatepickerInput extends React.Component {

  constructor() {
    super()
    this.format = 'DD/MM/YYYY'
    this.onDateChanged = this.onDateChanged.bind(this)
    this.onBlurDateChanged = this.onBlurDateChanged.bind(this)
    this.state = { date: moment() }
  }

  componentDidMount() {
    let dateValue = moment(this.props.value)
    if(dateValue.isValid()) {
      this.setState({ date: dateValue })
    }
  }

  onDateChanged(date, invalid) {
    const { model, validators, onDateChanged } = this.props
    if (date && !invalid) {
      this.setState({ date: date })
      date = date.toISOString()
    }
    onDateChanged(date, model, validators)
  }

  onBlurDateChanged() {
    const inputValue = this.refs.datePicker.refs.input.value
    const momentValue = moment(inputValue, this.format)
    if(momentValue.format(this.format) === inputValue) {
      this.onDateChanged(momentValue)
    }
    else {
      this.onDateChanged(inputValue, true)
    }
  }

  render() {
    return (
      <DatePicker
        dateFormat={this.format}
        todayButton="Today"
        ref="datePicker"
        selected={this.state.date}
        onChange={date => this.onDateChanged(date)}
        onBlur={this.onBlurDateChanged}
      />
    )
  }
}