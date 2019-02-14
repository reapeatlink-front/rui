import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
let { lang } = window;

/**
 * 格式化组件
 */
export default class RFormat extends Component {

  number() {
    let { title } = this.props;
    let symbol = "" ; // 用来区分正负数
    if(isNaN(title)){
      return title ;
    }
    if (title) {
      symbol = +title>0?"":"-" ;
      title = title
        .toString()
        .split('')
        .reverse()
        .join('');
      title = title.match(/[0-9]{1,3}/gi).join(',');
      title = title
        .toString()
        .split('')
        .reverse()
        .join('');
      return symbol+title;
    } else {
      return '0';
    }
  }
  money() {
    let {title, lang } = this.props;
    let currency = lang.common.currency || '';
    if(isNaN(title)){
      return title ;
    }
    return currency + this.number();
  }
  text() {
    return this.props.title;
  }
  date() {
    let { title } = this.props;
    return moment(title).format('YYYY-MM-DD');
  }
  dateTime() {
    let { title } = this.props;
    return moment(title).format('YYYY-MM-DD hh:mm:ss');
  }
  customer() {
    let { lang } = this.props;
    let customer = lang.common.customer || '';
    return this.number() + customer;
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
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['number', 'money', 'text', 'date', 'dateTime', 'customer']),
};
RFormat.defaultProps = {
    type: 'text',
    title: '',
};