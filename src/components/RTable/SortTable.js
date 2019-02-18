import React, { Component } from 'react';
import BaseTable from './BaseTable';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

function dragDirection(
    dragIndex,
    hoverIndex,
    initialClientOffset,
    clientOffset,
    sourceClientOffset
) {
    const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
    const hoverClientY = clientOffset.y - sourceClientOffset.y;
    if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return 'downward';
    }
    if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return 'upward';
    }
}

class BodyRow extends React.Component {
    render() {
        const {
            isOver,
            connectDragSource,
            connectDropTarget,
            moveRow,
            dragRow,
            clientOffset,
            sourceClientOffset,
            initialClientOffset,
            ...restProps
        } = this.props;
        const style = { ...restProps.style, cursor: 'move' };

        let className = restProps.className;
        if (isOver && initialClientOffset) {
            const direction = dragDirection(
                dragRow.index,
                restProps.index,
                initialClientOffset,
                clientOffset,
                sourceClientOffset
            );
            if (direction === 'downward') {
                className += ' drop-over-downward';
            }
            if (direction === 'upward') {
                className += ' drop-over-upward';
            }
        }

        return connectDragSource(
            connectDropTarget(<tr {...restProps} className={className} style={style} />)
        );
    }
}

const rowSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        props.moveRow(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(BodyRow)
);
class SortTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:props.dataSource || [],
        };
    }
    components = {
        body: {
            row: DragableBodyRow,
        },
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if("dataSource" in nextProps){
            this.setState({ dataSource: nextProps.dataSource });
        }
    }

    /**
     * 交换数组里面的顺序
     */
    switchIndex = (dragIndex, hoverIndex)=>{
        let dataSource = [...this.state.dataSource] ;
        let obj = dataSource[dragIndex] ;
        dataSource[dragIndex] = dataSource[hoverIndex] ;
        dataSource[hoverIndex] = obj ;
        return dataSource ;
    };
    onSort = (dragIndex, hoverIndex) => {
        let prevDataSource = JSON.parse(JSON.stringify(this.state.dataSource)) ;
        let dataSource = this.switchIndex(dragIndex, hoverIndex);
        this.setState({ dataSource },()=>{
            this.props.onSort(dragIndex, hoverIndex,dataSource,prevDataSource);
        });
    };
    render() {
        return (
            <BaseTable
                components={this.components}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.onSort,
                })}
                {...this.props} dataSource={ this.state.dataSource }/>
        );
    }
}

SortTable.propTypes = {
    /** 当对表格进行拖拽排序的时候调用的方法 */
    onSort: PropTypes.func.isRequired,
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
SortTable.defaultProps = {
    onSort(dragIndex, targetIndex,sortedDataSource,prevDataSource) {},
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
export const MDSortTable = SortTable ;
export default DragDropContext(HTML5Backend)(SortTable);
