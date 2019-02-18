import React,{ Component } from "react" ;
import { Table,Badge  } from "antd" ;
import PropTypes from "prop-types" ;
import { formatNumber,formatMoney } from "../utils/utils" ;
import _ from "lodash" ;
import { TABLE_ALIGNS } from "../utils/const";

class BaseTable extends Component{
    constructor(props){
        super(props);
    }
    renderText = (text)=>{
        return text ;
    };
    renderNumber = (number)=>{
        return formatNumber(number) ;
    };
    renderMoney = (money)=>{
        return formatMoney(money) ;
    };
    renderStatus= (text,record)=>{
        let statusText = record.statusText || "";
        let status = record.status?"processing":"default" ;
        return <Badge status={ status } text={statusText} />;
    };
    get columns(){
        let columns = this.props.columns ;
        let renderOperation = this.props.renderOperation;
        let list = columns.map(v => {
            let funcName = _.camelCase(`render_${v['_format']}`); // 此处下划线转驼峰
            if (!v.render) {
                if (v['_format'] && typeof this[funcName] === 'function') {
                    v.render =  this[funcName] ;
                } else {
                    v.render = this.renderText;
                }
            }
            v.align = v.align?v.align: TABLE_ALIGNS[v['_format']]; // 当前表头是不是传了对齐方式，如果传了就启用传过来的对齐方式，否则就采用TABLE_ALIGNS的对其方式
            return v;
        });
        if (renderOperation) {
            let { operationColumn } = this.props;
            list.push({
                title: this.props.operationText,
                align: 'center',
                dataIndex: 'operation',
                render(text, record, index) {
                    return renderOperation(record, index);
                },
                ...operationColumn,
            });
        }
        return list;
    }
    onChange = (pagination, filters, sorter) => {
        let { onPageChange } = this.props;
        let params = {
            current_page: pagination.current,
            page_size: pagination.pageSize,
            order: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : '',
            field: sorter.field || '',
        };
        onPageChange(params);
    };
    render() {
        let { columns,  pagination, ...restProps } = this.props;
        if (pagination && !("showSizeChanger" in pagination)) {
            pagination.showSizeChanger = true;
        }
        return <Table columns={this.columns} { ...restProps } onChange={this.onChange} pagination={pagination}/>
    }
}

BaseTable.propTypes = {
    /** 表格变化之后所触发的回调函数 */
    onPageChange: PropTypes.func.isRequired,
    /** 表格的分页信息 */
    pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    /** 表格的表头配置，详情参见antd table表头配置,并且新增_format属性来格式化当前列的数据，取值为['number', 'money', 'text','status']中的一个，默认为text*/
    columns: PropTypes.array.isRequired,
    /** 渲染操作列表*/
    renderOperation: PropTypes.func,
    /** 操作列配置，详情参见表头的配置属性*/
    operationColumn: PropTypes.object,
    /** 操作列显示的文本信息*/
    operationText: PropTypes.string
};
BaseTable.defaultProps = {
    onPageChange() {}, // 当前页面数据长度改变之后的回调函数
    bordered: false,
    renderOperation: null,
    operationColumn: {},
    operationText: "",
    pagination: {
        showQuickJumper: false,
        pageSizeOptions: ['10', '20', '50', '100'], // 设置分页数据的大小
        pageSize: 20, //设置当前的datatable 每页长度
        showSizeChanger: true,
    },
};

export default BaseTable;