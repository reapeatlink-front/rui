import React, { Component, Fragment } from 'react';
import RInput from '../RInput';
import { Button } from "antd" ;
import PropTypes from 'prop-types';
import { SEPARATOR } from "../const";

/**
 * 邮编输入组件
 */
export default class RZipCode extends Component {
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
        if(!value){ //当邮政编码不存在的时候不做处理
            return "";
        }
        let reg = new RegExp(split,"gi") ;
        value = value.replace(reg,"");
        let [first="",...third ] = value.match(/[0-9]{1,3}/gi) ; // 拆分邮政编码
        third = third.join('');
        return [ first,third ].filter(Boolean).join(split);
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
        let { helper,inputProps,value,split } = this.props ;
        inputProps.style = inputProps.style?{ ...inputProps.style, ...styles.inputStyle }:{ ...styles.inputStyle } ;
        value = this.getValue(this.state.value,split);
        return <RInput helper={helper} { ...inputProps } onChange={this._onChange}  value={value}  />
    };
    /**
     * 渲染右侧检索按钮
     * @returns {*}
     * @private
     */
    _renderButton = ()=>{
        let { showButton,buttonProps } = this.props ;
        buttonProps.style = buttonProps.style?{ ...buttonProps.style, ...styles.buttonStyle }:{ ...styles.buttonStyle } ;
        if(showButton){
            return <Button size={'large'} type={'search'} { ...buttonProps } />
        }
        return ;
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
        return (
            <div style={styles.containerStyle}>
                {  this._renderInput() }
                { this._renderButton() }
            </div>
        );
    }
}
const styles = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonStyle: {
        marginLeft: 15,
    },
    inputStyle:{
        flex:1
    }
};
RZipCode.propTypes = {
    /** 输入框的提示信息 */
    helper: PropTypes.string,
    /** 是否显示检索按钮 */
    showButton: PropTypes.bool,
    /** 自定义格式化数据函数 需要返回值用于显示 */
    formatAction:PropTypes.func,
    /** antd按钮属性 */
    buttonProps:PropTypes.object,
    /** antd输入框属性 */
    inputProps:PropTypes.object,
    /** 输入框onChange属性 */
    onChange:PropTypes.func,
    /** 输入框呈现的值 */
    value:PropTypes.string,
    /** 输入框的文本分隔符 */
    split:PropTypes.string,
};
RZipCode.defaultProps = {
    helper: '',
    showButton: true,
    loading: false,
    formatAction:null,
    buttonProps:{},
    inputProps:{},
    onChange:null,
    value:"",
    split:SEPARATOR
};