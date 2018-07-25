import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import {publishTopic} from '../../actions/common';
import Editor from './Editor';

class TopicEditor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tab: "dev",}
    this.handledSubmit = this.handledSubmit.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(e){
    this.setState({tab: e.target.value})
  }
  handledSubmit(e){
    const info = {
      title: this.titleInput.value,
      content: this.getValue(),
      tab: this.state.tab
    }
    this.props.onPublishTopic(info);
  }
  render(){
    const {publish} = this.props;
    if(publish){
      return <Redirect to={`/topic/${publish.topic_id}`}/>
    }
    if(!this.props.isLogin){
      return (
        <Main>
            <StyleLink to="/login">没有登陆,点击登陆</StyleLink>
        </Main>
      )
    }
    return(
      <Main>
          <SelectPlate>
             <Tip>选择板块</Tip>
             <Select value={this.state.tab}  onChange={this.changeTab}>
                  <option value="请选择">请选择</option>
                  <option value="share" >分享</option>
                  <option value="ask" >问答</option>
                  <option value="job" >招聘</option>
                  <option value="dev">客户端测试</option>
             </Select>
          </SelectPlate>
          <Title>
            <input type="text" placeholder="标题字数10字以上" ref={x => { this.titleInput = x }}/>
          </Title>
          <Editor value={getValue => this.getValue = getValue}/>
          <Button onClick={this.handledSubmit}>提交</Button>
      </Main>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  publish: state.common.publish
})
const mapDispatchToProps = dispatch => ({
  onPublishTopic: info => dispatch(publishTopic(info))
})
export default connect(mapStateToProps,mapDispatchToProps)(TopicEditor)

const Main = styled.div`
  max-width: 1400px;
  min-width: 960px;
  width:60%;
  background:#FFF;
  margin: 20px auto 0;
  padding: 20px;
`;
const SelectPlate = styled.div`
  & *{
    font-size: 14px;
  }
`
const Tip = styled.span`
  margin-right:15px;
`
const Select = styled.select`
  outline:none;
  border: 1px solid #dfdfdf;
  padding: 5px 10px;
`;
const Title = styled.div`
  padding: 5px 10px;
  border: 1px solid #e5e5e5;
  margin: 15px 0;
  & input{
    display: block;
    width: 100%;
    font-size: 14px;
  }
`
const Button = styled.button`
  font-size:14px;
  line-height: 1;
  color:#FFF;
  background:#1890ff;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 3px;
`
const Textarea = styled.textarea`
  width: 100%;
  height: 260px;
  font-size: 16px;
  color: #666;
  padding: 20px 0;
  outline: none;
  border: none;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
`
const StyleLink = styled(Link)`
  color:#3399CC;
  display: block;
  text-align:center;
`
