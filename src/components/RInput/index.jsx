import React,{ Component,Fragment } from "react";
import RHelper from "../RHelper" ;
import { Input } from "antd" ;
import PropTypes from "prop-types" ;
import "./index.css";

export default class RInput extends Component {
    state = {
        visible: false,
    };
    _onBlur() {
        let { onBlur = ()=>{} } = this.props ;
        this.setState({ visible: false });
        onBlur();
    }
    _onFocus() {
        let { onFocus = ()=>{} } = this.props ;
        this.setState({ visible: true });
        onFocus();
    }
    render() {
        let { helper ,...props } = this.props ;
        return (
            <RHelper helper={helper} visible={ this.state.visible }>
                <Input {...props} onFocus={() => this._onFocus()} onBlur={() => this._onBlur()} />
            </RHelper>
        );
    }
}

RInput.propTypes = {
    helper: PropTypes.string,
};
RInput.defaultProps = {
    helper:"",
};