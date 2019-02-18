export const SIZE = ["xs","sm","md","lg","llg"];
//RText文本组件的字体大小
export const FONT_SIZE = { xs : 12, sm : 16, md : 20, lg : 24, llg :28 };
//RWhiteSpace和RWingBlank 左右留白和上下留白的的间距大小
export const PADDING_SIZE = { xs : 8, sm : 16, md : 24, lg : 32, llg :40 };
// RFormat 支持的格式化类型
export const FORMAT_TYPE=['number', 'money', 'text','status'] ;
export const ALIGN_RIGHT= [ 'number', 'money' ];
export const ALIGN_CENTER = [ 'center' ];
export const TABLE_ALIGNS= {
    'number':"right",
    'money':"right",
    'text':"left",
    'status':"center",
};
//电话邮政编码的分隔符
export const SEPARATOR = "-" ;
export const NUMBER_SEPARATOR = "," ;
export const CURRENCY = "￥" ;
export default {
    SIZE ,
    FONT_SIZE ,
    TABLE_ALIGNS,
    PADDING_SIZE,
    SEPARATOR,
    FORMAT_TYPE,
    NUMBER_SEPARATOR
}