import React,{ Component } from "react";
import { Tooltip } from "antd" ;
import PropTypes from "prop-types" ;

export default class RHelper extends Component {
    render() {
        let { helper ,children,...props } = this.props ;
        if(helper){
            return <Tooltip trigger={'click'} placement="topLeft" title={helper} { ...props }> { children } </Tooltip> ;
        }else{
            return children ;
        }
    }
}

RHelper.propTypes = {
    helper: PropTypes.string,
};
RHelper.defaultProps = {
    helper:"",
};