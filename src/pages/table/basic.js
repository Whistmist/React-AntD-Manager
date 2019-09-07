import React from 'react';
import { Card, Table, Modal } from 'antd';
import Axios from './../../axios/index';

export default class Basic extends React.Component {
	state = {
		dataSource: [],
		dataSource1: []
	};
	params = {
		page: 1
	};

	componentDidMount() {
		const data = [
			{
				id: '0',
				userName: 'Jack',
				sex: '1',
				state: '3',
				interest: '2',
				birthday: '2000-01-01',
				address: '北京市海淀区奥林匹克公园',
				time: '09:00'
			},
			{
				id: '1',
				userName: 'Tom',
				sex: '2',
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
				state: '2',
				interest: '3',
				birthday: '2000-01-01',
				address: '北京市海淀区奥林匹克公园',
				time: '09:00'
			}
		];

		data.map((item, index) => {
			item.key = index;
		});
		this.setState({
			dataSource: data
		});
		this.request();
	}

	onRowClick = (record, index) => {
		let selectKey = [index];
		Modal.info({
			title: '信息',
			content: `用户名：${record.accEntityName},-->：${record.accEntityCode}`
		});
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		});
	};
	request = () => {
		Axios.ajax({
			url: '/mock/5d71c92ea763c468641f2c1b/example/table/list',
			data: {
				params: {
					page: this.params.page
				},
				isShowLoading: true
			}
		}).then(res => {
			//console.log('res--->' + res);
			res.map((item, index) => {
				return (item.key = index);
			});
			this.setState({
				dataSource2: res,
				selectedRowKeys: [],
				selectedRows: null
				// pagination: Utils.pagination(res, current => {
				// 	_this.params.page = current;
				// 	this.request();
				// })
			});
		});
	};

	render() {
		const columns = [
			{
				title: 'id',
				key: 'id',
				dataIndex: 'id'
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
				render(sex) {
					return sex === '1' ? '男' : '女';
				}
			},
			{
				title: '状态',
				key: 'state',
				dataIndex: 'state',
				render(state) {
					let config = {
						'1': '咸鱼一条',
						'2': '风华浪子',
						'3': '北大才子',
						'4': '百度FE',
						'5': '创业者'
					};
					return config[state];
				}
			},
			{
				title: '爱好',
				key: 'interest',
				dataIndex: 'interest',
				render(abc) {
					let config = {
						'1': '游泳',
						'2': '打篮球',
						'3': '踢足球',
						'4': '跑步',
						'5': '爬山',
						'6': '骑行',
						'7': '桌球',
						'8': '麦霸'
					};
					return config[abc];
				}
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
				title: 'accEntityId',
				key: 'accEntityId',
				dataIndex: 'accEntityId'
			},
			{
				title: '核算主体代码',
				key: 'accEntityCode',
				dataIndex: 'accEntityCode'
			},
			{
				title: '核算主体名称',
				key: 'accEntityName',
				dataIndex: 'accEntityName'
			},
			{
				title: '公司类型',
				key: 'companyTypeCodeMeaning',
				dataIndex: 'companyTypeCodeMeaning'
			},
			{
				title: '起始时间',
				key: 'startDateActive',
				dataIndex: 'startDateActive'
			},
			{
				title: '终止时间',
				key: 'endDateActive',
				dataIndex: 'endDateActive'
			}
		];
		// rowSelection object indicates the need for row selection
		const selectedRowKeys = this.state.selectedRowKeys;
		const rowSelection = {
			selectedRowKeys,
			//type: 'radio',
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(
					`selectedRowKeys: ${selectedRowKeys}`,
					'selectedRows: ',
					selectedRows
				);
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name
			})
		};
		return (
			<div>
				<Card title='基础表格' className='card-wrap'>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={this.state.dataSource}
					/>
				</Card>
				<br />

				<Card title='Company' className='card-wrap'>
					<Table
						rowSelection={rowSelection}
						onRow={(record, index) => {
							return {
								onClick: () => {
									this.onRowClick(record, index);
								}
							};
						}}
						columns={columns1}
						dataSource={this.state.dataSource2}
					/>
				</Card>
			</div>
		);
	}
}
