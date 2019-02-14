import React, { Component, Fragment } from 'react';
import { SIZE,getPaddingSize } from "../utils/const";
import PropTypes from 'prop-types';

/**
 * 邮编输入组件
 */
export default class RWhiteSpace extends Component {
    render() {
        let { size,style } = this.props ;
        let paddingSize = getPaddingSize(size) ;
        const styles = {  display: 'block',paddingTop:paddingSize,paddingBottom:paddingSize ,...style } ;
        return (
            <div style={styles}>
                { this.props.children }
            </div>
        );
    }
}
RWhiteSpace.propTypes = {
    /** 设置组件的大小，取值为["xs","sm","md","lg","llg"] */
    size:PropTypes.oneOf(SIZE),
    /** 组件样式对象 */
    style:PropTypes.object
};
RWhiteSpace.defaultProps = {
    size:"sm",
    style:{}
};