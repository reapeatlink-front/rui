import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatMoney,formatNumber } from '../utils/utils' ;
import { FORMAT_TYPE as FORMATTYPE } from "../utils/const";

/**
 * 格式化组件
 */
export default class RFormat extends Component {

  number() {
    let { title } = this.props;
    return formatNumber(title);
  }
  money() {
      let { title } = this.props;
      return formatMoney(title) ;
  }
  text() {
    return this.props.title;
  }
  get title() {
    let { type } = this.props;
    return typeof this[type] === 'function' ? this[type]() : this.text();
  }
  render() {
    return <span>{this.title}</span>;
  }
}
RFormat.propTypes = {
    /** 所需要格式化的文本 */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** 格式化的类型 eg. 'number', 'money', 'text' */
    type: PropTypes.oneOf(FORMATTYPE),
};
RFormat.defaultProps = {
    type: 'text',
    title: '',
};