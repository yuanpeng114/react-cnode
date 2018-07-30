import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter ,Route,Link,NavLink,Switch} from 'react-router-dom';
import Header from './Header';
import TopicList from './Topic/TopicList';
import TopicDetail from './Topic/TopicDetail';
import TopicEditor from './Topic/TopicEditor';
import UserDetail from './UserDetail';
import {getTopics} from '../actions/topics';
import {login} from '../actions/auth';
import Login from './Login';
import {setToken} from '../Api';
import styled , {ThemeProvider}from 'styled-components';

class App extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    // 初始化登陆
    const accesstoken = JSON.parse(window.localStorage.getItem('accesstoken'));
    const {onLogin,onGetTopics,location:{search}} = this.props;
    if(accesstoken){
      setToken(accesstoken);
      onLogin(accesstoken);
    }
    onGetTopics(search || "/?tab=all");
  }
  render(){
    return(
      <BrowserRouter >
        <div>
          <Header />
          <Route exact path="/" component={TopicList}/>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/user/:username" component={UserDetail}/>
            <Route path="/topic/create" component={TopicEditor}/>
            <Route path="/topic/:id" component={TopicDetail}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin
})
const mapDispatchToProps = dispatch => ({
  onLogin : accesstoken => dispatch(login(accesstoken)),
  onGetTopics : searchTab => dispatch(getTopics(searchTab))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
