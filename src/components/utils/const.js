export const SIZE = ["xs","sm","md","lg","llg"];
export const FONTSIZE = { xs : 12, sm : 16, md : 20, lg : 24, llg :28 };
export const PADDINGSIZE = { xs : 8, sm : 16, md : 24, lg : 32, llg :40 };
export const FORMATTYPE=['number', 'money', 'text', 'date', 'dateTime'] ;
// 获取字体大小
export const getFontSize = (size ="sm")=> FONTSIZE[size] || FONTSIZE["sm"];
// 获取两翼留白大小
export const getPaddingSize = (size = "sm")=>PADDINGSIZE[size] || PADDINGSIZE["sm"];
//电话邮政编码的分隔符
export const SEPARATOR = "-" ;
export default {
    SIZE ,
    FONTSIZE ,
    PADDINGSIZE,
    SEPARATOR,
    FORMATTYPE,
}