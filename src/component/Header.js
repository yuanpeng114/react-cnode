import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getTopics} from '../actions/topics';
import {logOut} from '../actions/auth';
import Login from './Login';

const links = [
  {search: '/?tab=all',name: '全部'},
  {search: '/?tab=good',name: '精华'},
  {search: '/?tab=share',name: '分享'},
  {search: '/?tab=ask',name: '问答'},
  {search: "/?tab=dev", name: '客户端测试'}
]

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isShow:false
    }
    this.logOut = this.logOut.bind(this);
  }
  logOut(e){
    this.props.onLogOut();
  }

  renderRight(isLogin,userName){
    if(isLogin){
      return (
        <React.Fragment>
          <StyledLink to="/topic/create">发布话题</StyledLink>
          <StyledLink to={`/user/${userName}`}>{userName}</StyledLink>
          <SignOut onClick={this.logOut}>退出</SignOut>
       </React.Fragment>
      )
    }else if(!this.props.loginMessage){
      return (
        <React.Fragment>
          <StyledLink to="/topic/create">发布话题</StyledLink>
          <StyledLink to="/login">登陆</StyledLink>
        </React.Fragment>
      )
    }
  }
  render(){
    const {isLogin,userName} = this.props;
    return (
          <HeaderBar>
              <LeftSide>
                {
                  links.map((link,index) => (
                    <StyledLink
                      to={`${link.search}`}
                      key={index}
                      onClick={() => this.props.onGetTopics(link.search)}
                      >
                      {link.name}
                    </StyledLink>
                  ))
                }
              </LeftSide>
              <RightSide>
                {this.renderRight(isLogin,userName)}
              </RightSide>
          </HeaderBar>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  userName: state.auth.userInfo && state.auth.userInfo.loginname,
  loginMessage: state.auth.loginMessage
})
const mapDispatchToProps = dispatch => ({
  onGetTopics: path => dispatch(getTopics(path)),
  onLogOut: () => dispatch(logOut())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);


const HeaderBar = styled.div`
  background: #444;
  height: 50px;
  line-height: 50px;
  padding: 0 20%;
  @media(max-width:576px){
    font-size: 10px;
    padding: 0 0 0 5%;
  }
`;
const LeftSide = styled.div`
  float: left;
`;
const RightSide = styled.div`
  float: right;
  @media(max-width:992px){
    display: none;
  }
`;
const StyledLink = styled(Link)`
   margin:0 10px;
   color: #FFF;
   cursor: pointer;
   float: left;
`;

const SignOut = StyledLink.withComponent('span');
