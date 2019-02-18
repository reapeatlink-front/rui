// 获取字体大小
import {FONT_SIZE, PADDING_SIZE,NUMBER_SEPARATOR,CURRENCY } from "./const";

export const getFontSize = (size ="sm")=> FONT_SIZE[size] || FONT_SIZE["sm"];
// 获取两翼留白大小
export const getPaddingSize = (size = "sm")=>PADDING_SIZE[size] || PADDING_SIZE["sm"];
/**
 * 数字格式化
 * @param number
 * @returns {*}
 */
export const formatNumber = (number)=>{
    let symbol = "" ; // 用来区分正负数
    if(isNaN(number)){ // 说明不是数字
        return number ;
    }
    number = +number ;
    if (number) {
        symbol = +number>0?"":"-" ;
        number = number.toString().split('').reverse().join('');
        number = number.match(/[0-9]{1,3}/gi).join(NUMBER_SEPARATOR);
        number = number.toString().split('').reverse().join('');
        return symbol+number;
    } else {
        return number;
    }
};
export const formatMoney = (money)=>{
    if(isNaN(money)){
        return money ;
    }
    return CURRENCY + formatNumber(money);
};
export default {
    getFontSize,
    getPaddingSize,
    formatNumber,
    formatMoney,
};