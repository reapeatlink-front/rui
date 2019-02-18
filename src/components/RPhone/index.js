import React, { Component, Fragment } from 'react';
import RInput from '../RInput';
import { Button } from "antd" ;
import PropTypes from 'prop-types';
import { SEPARATOR } from "../utils/const";

/**
 * 电话号码输入组件
 */
export default class RPhone extends Component {
    constructor(props){
        super(props);
        this.state = {
          value:props.value
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if("value" in nextProps){
            this.setState({ value: nextProps });
        }
    }
    /**
     * 格式化函数
     * @param value
     * @returns {string}
     */
    formatAction(value,split) {
        if(!value){ //当电话号码不存在的时候不做处理
            return "";
        }
        let reg = new RegExp(split,"gi") ;
        value = value.replace(reg,"");
        let [first="",second="",...third ] = value.match(/[0-9]{1,3}/gi) ; // 拆分电话号码
        third = third.join('');
        return [ first,second,third ].filter(Boolean).join(split);
    }
    reverseAction = (value,split)=>{
        let reg = new RegExp(split,"gi");
        return value.replace(reg,"");
    };
    _onChange = (e)=>{
        let { onChange,split } = this.props ;
        let value = this.reverseAction(e.target.value || "",split) ;
        if(isNaN(value)){
            return ;
        }
        if(onChange){
            onChange(value);
        }else{
            this.setState({ value }) ;
        }
    };
    /**
     * 渲染输入框
     * @returns {*}
     * @private
     */
    _renderInput = ()=>{
        let { helper,value,split,props } = this.props ;
        value = this.getValue(this.state.value,split);
        return <RInput helper={helper} { ...props } onChange={this._onChange}  value={value}  />
    };
    /**
     * 获取输入框的值
     * @param value
     * @returns {*|string}
     */
    getValue = (value,split)=>{
        let formatAction = this.props.formatAction || this.formatAction ;
        return formatAction(value,split) || "" ;
    };
    render() {
        return this._renderInput() ;
    }
}

RPhone.propTypes = {
    /** 输入框的提示信息 */
    helper: PropTypes.string,
    /** 是否显示检索按钮 */
    showButton: PropTypes.bool,
    /** 自定义格式化数据函数 需要返回值用于显示 */
    formatAction:PropTypes.func,
    /** 输入框onChange属性 */
    onChange:PropTypes.func,
    /** 输入框呈现的值 */
    value:PropTypes.string,
    /** 输入框的文本分隔符 */
    split:PropTypes.string,
};
RPhone.defaultProps = {
    helper: '',
    showButton: true,
    loading: false,
    formatAction:null,
    inputProps:{},
    onChange:null,
    value:"",
    split:SEPARATOR
};