import React, { Component, Fragment } from 'react';
import { SIZE } from "../utils/const";
import { getFontSize } from "../utils/utils";
import PropTypes from 'prop-types';

/**
 * 邮编输入组件
 */
export default class RWhiteSpace extends Component {
    render() {
        let { size,style } = this.props ;
        let fontSize = getFontSize(size) ;
        const styles = { fontSize ,...style } ;
        return (
            <span style={styles}>
                { this.props.children }
            </span>
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