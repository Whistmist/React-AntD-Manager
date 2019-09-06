import React from 'react'
import { Card, Table } from 'antd'
import axios from 'axios'

export default class Basic extends React.Component {
   
    state={
        dataSource: [],
        dataSource1:[]
    }
    componentWillMount(){
        axios.get('https://www.easy-mock.com/mock/5d71c92ea763c468641f2c1b/example/table/list')
            .then( (response) =>{
                // handle success
                this.setState(
                    {
                        dataSource1: response.data.content,
                    }
                )
                console.log('this.dataSource1'+this.dataSource1);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
    
    componentDidMount(){
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ];

        this.setState(
            {
                dataSource: data,
            }
        );
    }


    render(){

        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ];
        const columns1 = [
            {
                title:'accEntityId',
                key:'accEntityId',
                dataIndex:'accEntityId'
            },
            {
                title: '核算主体代码',
                key: 'accEntityCode',
                dataIndex: 'accEntityCode'
            },
            {
                title: '核算主体名称',
                key: 'accEntityName',
                dataIndex: 'accEntityName',
            },
            {
                title: '公司类型',
                key: 'companyTypeCodeMeaning',
                dataIndex: 'companyTypeCodeMeaning',
            },
            {
                title: '起始时间',
                key: 'startDateActive',
                dataIndex: 'startDateActive',
            },
            {
                title: '终止时间',
                key: 'endDateActive',
                dataIndex: 'endDateActive'
            }
        ];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table 
                        rowSelection={rowSelection}
                        columns={columns} 
                        dataSource={this.state.dataSource} />
                </Card>
                <br/>
                
                <Card title="动态表格" className="card-wrap">
                    <Table 
                        rowSelection={rowSelection}
                        columns={columns1} 
                        dataSource={this.state.dataSource1} />
                </Card>
            </div>
        );
    }
}