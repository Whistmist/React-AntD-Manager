import React from 'react'
import { Card, Form, Icon, message ,Input, Button, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload } from 'antd'
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import './form.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Register extends React.Component{

    state = {
        loading: false,
      };

    handleClick = () =>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
    }
    handleCancle = () =>{
        this.props.form.resetFields();
    }
    getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) =>{
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
      };

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs:24,
                sm:8 
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        } 
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:8
                }
            }
        }
        const rowObject = {
            minRows: 2, maxRows: 6
        }   
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div>
               <Card title="注册表单">
                    <Form >
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                               getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        { required: false, message: 'Please input your userName!' },
                                        {min:5,max:10,message:'长度不在范围内'},
                                        {pattern:new RegExp('^\\w+$','g'),message:'用户名必须为字母或者数字'}
                                    ],
                               })(
                                <Input prefix={<Icon type="user"/>} placeholder = "请输入用户名"/>
                               ) 
                            }
                            
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                               getFieldDecorator('password',{
                                    initialValue: '',
                                    rules: [{ required: true, message: 'Please input your password!' }],
                               })(
                                <Input prefix={<Icon type="lock"/>} placeholder = "请输入密码"/>
                               ) 
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                               getFieldDecorator('sex',{
                                    initialValue: 1,
                               })(
                                    <RadioGroup>
                                        <Radio value="1"> 男</Radio>
                                        <Radio value="2"> 女</Radio>
                                    </RadioGroup> 
                               ) 
                            }
                        </FormItem>   
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                               getFieldDecorator('age',{
                                    initialValue: 18,
                               })(
                                    <InputNumber/>
                               ) 
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                               getFieldDecorator('status',{
                                    initialValue: "2",
                               })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子一枚</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">创业者</Option>
                                    </Select>
                               ) 
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                               getFieldDecorator('interest',{
                                    initialValue: ["2","4","5","6"],
                               })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">桌球</Option>
                                        <Option value="8">麦霸</Option>
                                    </Select>
                               ) 
                            }
                        </FormItem>  
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem> 
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08')
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem> 
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('adress', {
                                    initialValue: '北京市海淀区奥林匹克公园'
                                })(
                                    <TextArea 
                                    autosize = {rowObject}/>
                                )
                            }
                        </FormItem>         
                        <FormItem label="早起时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(<TimePicker/>)
                            }
                        </FormItem>
                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg', {
                                    initialValue: '北京市海淀区奥林匹克公园'
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>        
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('xxxx')(
                                   <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>            
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleClick}>注册</Button>
                            <Button type="primary" onClick={this.handleCancle}>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Register);