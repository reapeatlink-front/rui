import React,{ Component,Fragment } from "react";
import RHelper from "../RHelper" ;
import { Input } from "antd" ;
import PropTypes from "prop-types" ;
import "./index.css";

/**
 * 提示输入框组件
 */
export default class RInput extends Component {
    state = {
        visible: false,
    };
    _onBlur(e) {
        let { onBlur = ()=>{} } = this.props ;
        this.setState({ visible: false });
        onBlur(e);
    }
    _onFocus(e) {
        let { onFocus = ()=>{} } = this.props ;
        this.setState({ visible: true });
        onFocus(e);
    }
    render() {
        let { helper ,...props } = this.props ;
        return (
            <RHelper helper={helper} visible={ this.state.visible }>
                <Input size={"large"} {...props} onFocus={(e) => this._onFocus(e)} onBlur={(e) => this._onBlur(e)} />
            </RHelper>
        );
    }
}

RInput.propTypes = {
    /** 输入框的提示信息 */
    helper: PropTypes.string,
};
RInput.defaultProps = {
    helper:"",
};