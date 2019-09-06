import React from 'react'
import {HashRouter , Switch , Route } from 'react-router-dom'
import App from './App';
import Admin from './Admin'
import NoMatch from './pages/nomatch/NoMatch';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Login from './pages/form/Login';
import Register from './pages/form/Register';
import Basic from './pages/table/basic';
export default class IRoueter extends React.Component{
    

    render(){
        return (
           <HashRouter>
               <App>
                  <Route isExact={true} path='/' render={()=>
                    <Admin>
                        <Switch>
                            <Route path='/admin' component={Admin} />
                            <Route path='/ui/buttons' component={Buttons}/> 
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loadings} />
                            <Route path="/ui/notification" component={Notice} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tabs" component={Tabs} />
                            <Route path="/ui/gallery" component={Gallery} />
                            <Route path="/ui/carousel" component={Carousel} />
                            <Route  path='/form/login' component = {Login} />
                            <Route  path='/form/reg' component = {Register} />
                            <Route  path='/table/basic' component = {Basic} />
                            <Route  component={NoMatch}/>    
                        </Switch>    
                    </Admin>
                    }/>
                  <Route path='/order/detail' component = {Admin} />
               </App>
           </HashRouter>  
        );    
    }

}