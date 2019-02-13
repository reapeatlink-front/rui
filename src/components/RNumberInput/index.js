import React from 'react';
import RInput from '../RInput';
import PropTypes from "prop-types" ;

export default class RNumberInput extends React.Component {
    constructor(props) {
        super(props);
        const value = props.value || "";
        this.state = { value };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({value});
        }
    }

    /**
     * 当前值和最小值比较
     * @param value
     * @returns {boolean}
     */
    compareWithMin = (value)=>{
        let { min  } = this.props ;
        return min?( value>min?value:false ):value ;
    };
    /**
     * 当前值和最大值比较
     * @param value
     * @returns {boolean}
     */
    compareWithMax = (value)=>{
        let { max  } = this.props ;
        return max?( value<max?value:false ):value ;
    };
    _onBlur = (e)=>{
        let { max,min,onBlur  } = this.props ;
        let value = +e.target.value ;
        if(this.compareWithMax(value) === false){ // 大于最大值
            this.setState({ value:max });
            return  ;
        }
        if(this.compareWithMin(value) === false){ // 小于最小值
            this.setState({ value:min });
            return  ;
        }
        if(onBlur){
            onBlur(value);
        }
    };
    _onChange = e => {
        let { onChange  } = this.props ;
        let value = e.target.value ;
        if(isNaN(value)){
            return ;
        }else{
            value = +value ;
        }
        if(onChange){
            onChange(value) ;
        }else{
            this.setState({ value }) ;
        }
    };

    render() {
        const state = this.state;
        return (
            <RInput {...this.props} value={state.value} onBlur={this._onBlur} onChange={this._onChange} />
        );
    }
}
RNumberInput.propTypes = {
    /** 输入框的最小值 */
    min: PropTypes.number,
    /** 输入框的最大值 */
    max: PropTypes.number,
    /** 输入框的值 */
    value: PropTypes.number,
    /** 输入框的change事件 */
    onChange: PropTypes.func
};
RNumberInput.defaultProps = {
    min: null,
    max: null,
    value: null,
    onChange: null
};