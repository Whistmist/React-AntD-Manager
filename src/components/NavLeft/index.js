import React from 'react';
import { Menu, Icon } from 'antd';
import {NavLink}  from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';
import MenuConfig from '../../config/menuConfig.js';

import './index.less';

export default class NavLeft extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    renderMenu = (data) =>{
        return data.map((item) => {
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
               <NavLink to={item.key}>{item.title}</NavLink> 
            </Menu.Item>
        })
    }
    render() {
        return (
            <div > 
                <div className="logo">
                    <img src="../../../assets/logo-ant.svg" alt="" />
                    <h1> Imooc MS</h1>
                    <Menu theme="dark">
                        {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="1">Option 3</Menu.Item>
                            <Menu.Item key="2">Option 4</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu> */}
                        { this.state.menuTreeNode }
                    </Menu>
                </div>
            </div>
        );
    }

}