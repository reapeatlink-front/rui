import React, { Component } from 'react';
import RInput from '../RInput';

/**
 * 日文片假名组件
 * 该组件只允许用户输入日文片假名
 */
export default class RKInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    'value' in nextProps ? this.setState({ value: nextProps.value }) : null;
  }
  onChange(e) {
    let { onChange } = this.props;
    let value = e.target.value || '';
    value = value.replace(/\s/g, '');
    if (/[^\u30A1-\u30F6|\u30FC]/.test(value)) {
      // 只允许输入日文片假名
      return;
    }
    onChange(e.target.value);
  }
  render() {
    let { helper, ...props } = this.props;
    let value = this.state.value;
    return (
      <RInput {...props} helper={helper} value={value} onChange={e => this.onChange(e)} />
    );
  }
}
