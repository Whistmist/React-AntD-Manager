import React from 'react'
import { Card, Form, Icon, Input, Button, message, Checkbox } from 'antd'
const FormItem = Form.Item;

class Login extends React.Component{

    handleSubmit = () =>{
       let userInfo = this.props.form.getFieldsValue();
       this.props.form.validateFields((err, values)=>{
        if (!err) {
            console.log(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`);
            message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`);
          }
       });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder = "请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder = "请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="内联表单">
                    <Form style={{width: "300px"}}>
                        <FormItem>
                            {
                               getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: 'Please input your userName!' },
                                        {min:5,max:10,message:'长度不在范围内'},
                                        {pattern:new RegExp('^\\w+$','g'),message:'用户名必须为字母或者数字'}
                                    ],
                               })(
                                <Input prefix={<Icon type="user"/>} placeholder = "请输入用户名"/>
                               ) 
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                               getFieldDecorator('password',{
                                    initialValue: '',
                                    rules: [{ required: true, message: 'Please input your password!' }],
                               })(
                                <Input prefix={<Icon type="lock"/>} placeholder = "请输入密码"/>
                               ) 
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                               getFieldDecorator('remember',{
                                valuePropName:'checked',
                                initialValue: true
                               })(
                                <Checkbox>记住密码</Checkbox>
                               ) 
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Login);