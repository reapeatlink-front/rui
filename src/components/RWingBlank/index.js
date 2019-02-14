import React, { Component, Fragment } from 'react';
import { SIZE } from "../utils/const";
import PropTypes from 'prop-types';
import { getPaddingSize } from "../utils/utils";
/**
 * 邮编输入组件
 */
export default class RWingBlank extends Component {
    render() {
        let { size,style } = this.props ;
        let paddingSize = getPaddingSize(size) ;
        const styles = {  display: 'block',paddingLeft:paddingSize,paddingRight:paddingSize ,...style } ;
        return (
            <div style={styles}>
                { this.props.children }
            </div>
        );
    }
}
RWingBlank.propTypes = {
    /** 设置组件的大小，取值为["xs","sm","md","lg","llg"] */
    size:PropTypes.oneOf(SIZE),
    /** 组件样式 */
    style:PropTypes.object
};
RWingBlank.defaultProps = {
    size:"sm",
    style:{}
};