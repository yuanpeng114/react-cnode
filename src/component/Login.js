import React from 'react';
import styled from 'styled-components';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'

class Login extends React.Component{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  login(e){
    this.props.onLogin(this.input.value)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isLogin){
      this.props.history.goBack()
    }
  }
  goBack(){
    this.props.history.goBack()
  }
  render(){
      return (
            <ModalWrap>
              <ModaLayer onClick={this.goBack}></ModaLayer>
              <Content>
                    <Message>请输入accesstoken用作登陆</Message>
                    {this.props.loginMessage=="failure"&&<Wraning>登陆失败</Wraning>}
                    <Input innerRef={x => this.input = x}></Input>
                    <Button onClick={this.login}>确认</Button>
                </Content>
                {
                  this.props.isLogin&& <Redirect to="/"/>
                }
            </ModalWrap>
      )
  }
}
const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  accesstoken: state.auth.accesstoken,
  loginMessage: state.auth.loginMessage
})
const mapDispatchToProps = dispatch => ({
  onLogin: accesstoken => dispatch(login(accesstoken))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color .3s ease-out;
  background-color: rgba(23,20,31,.6);
`;
const ModaLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:9;
`;
const Content = styled.div`
  position: relative;
  z-index:99;
  width:250px;
  top: 20%;
  left:37%;
  background:#FFF;
  padding: 30px;
  text-align: center;
`
const Message = styled.p`
  line-height: 2em;
`;
const Input = styled.input`
  display:block;
  width: 100%;
  height: 20px;
  border: 1px solid #dad8de;
  text-indent: 10px;
  box-sizing: border-box;
`;
const Button = styled.button`
  margin-top: 10px;
  font-size:14px;
  line-height: 1;
  color:#FFF;
  background:#1890ff;
  padding: 0.5em 1em;
  cursor: pointer;
`;
const Wraning = styled.p`
  font-size: 14px;
  height: 2em;
  line-height: 2em;
  background:#ffe6e6;
  color:#c86c6e;
  margin: 0.5em 0 1em;
`
