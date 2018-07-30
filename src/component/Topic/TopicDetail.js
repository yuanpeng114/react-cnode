import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import Loading from '../Common/Loading';
import Reply from './Reply';
import {Link} from 'react-router-dom';
import {
  getTopicDetail,
  clearTopic,
  collectTopic,
  cancelCollect,
  replyTopic,
  upvote
} from '../../actions/topics';
import {Button} from '../Common/reuse';
import Editor from './Editor';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class TopicDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tab: {
        share: "分享",
        ask: "问答",
        job: '招聘',
        dev: '测试'
      }
    }
    this.handleCollectTopic = this.handleCollectTopic.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.replyOtherOne = this.replyOtherOne.bind(this);
    this.handleReplyTopic = this.handleReplyTopic.bind(this);
  }
  componentWillMount(){
    this.props.getTopicDetail(this.props.match.params.id);
  }
  componentWillUnmount(){
    this.props.clearTopic();
  }
  componentWillReceiveProps(nextProps){
    //退出登陆后更新一次
    if(!nextProps.isLogin && nextProps.isLogin !== this.props.isLogin){
      this.props.gTopicDetail(this.props.match.params.id);
    }
  }
  checkStatus(loginname){
    if(!this.props.isLogin){
      alert('还没有登陆,要先登陆哦!')
      return false;
    }
    if(this.props.loginname == loginname){
      alert('不能赞自己啊')
      return false;
    }
    return true;
  }
  handleCollectTopic(){
    //取消,收藏
    if(!this.checkStatus())return;
    let { collectTopic,cancelCollect } = this.props;
    if(this.props.topic.is_collect){
      cancelCollect(this.props.match.params.id)
    }else{
      collectTopic(this.props.match.params.id)
    }
  }
  handleUpvote(reply_id,loginname){
    //点赞
    if(!this.checkStatus(loginname))return;
    const topic_id = this.props.match.params.id
    this.props.upvote(topic_id,reply_id)
  }
  replyOtherOne(reply_id,loginname){
    //对另一个评论的回复
    this.getValue(`@${loginname}\u00A0`);
    this.setState({reply_id});
    window.scrollTo(0,document.body.scrollHeight);
  }
  handleReplyTopic(){
    //回复
    if(!this.checkStatus())return;
    const topic_id = this.props.match.params.id
    const info = {
      content: this.getValue(),
      reply_id: this.state.reply_id || null
    }
    this.props.replyTopic(topic_id,info)
  }
  render(){
    const {topic,isLogin} = this.props;
    if(topic){
        return (
            <Wrap>
              <Section>
                <TopicHeader>
                    <HeaderTop>
                        {
                          topic.tab == "share" &&
                          <Tag>{topic.top ? "置顶" : "精华"}</Tag>
                        }
                      <Title>{topic.title}</Title>
                    </HeaderTop>
                    <HeaderBm>
                        <Tip>
                          <span>发布于{moment(topic.create_at).fromNow()}</span>
                          <Link to={`/user/${topic.author.loginname}`}>作者{topic.author.loginname}</Link>
                          <span>{topic.visit_count}次浏览 </span>
                          <span>最后一次编辑是{moment(topic.last_reply_at).fromNow()}</span>
                          <span>来自{this.state.tab[topic.tab]}</span>
                        </Tip>
                        {
                          isLogin &&
                          <CollectButton onClick={this.handleCollectTopic}>
                            {topic.is_collect ? "取消收藏":"收藏"}
                          </CollectButton>
                        }
                    </HeaderBm>
                  </TopicHeader>
                  <TopicContent>
                    <div dangerouslySetInnerHTML={{__html: topic.content}} />
                  </TopicContent>
                </Section>
                {/* 回复列表 */}
                <Section>
                  <Reply
                    replies={topic.replies}
                    upvote={this.handleUpvote}
                    replyOtherOne={this.replyOtherOne}
                  />
                </Section>
                {/* 用于回复主题的编辑器 */}
                <Section>
                  <Editor value={getValue => this.getValue = getValue}/>
                  <Button onClick={this.handleReplyTopic} margin="0 0 0 20px">回复</Button>
                </Section>
              </Wrap>
        )
      }else{
        return <Loading></Loading>
      }
  }
}

const mapStateToProps = state =>({
    topic: state.topic.topicDetail,
    isLogin: state.auth.isLogin,
    loginname: state.auth.userInfo && state.auth.userInfo.loginname
})
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getTopicDetail,
    clearTopic,
    collectTopic,
    cancelCollect,
    replyTopic,
    upvote
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(TopicDetail)

const Wrap = styled.div`
  width: 1200px;
  margin:0 auto;
  @media(max-width:576px){
    width: 100%;
  }
`
const Section = styled.div`
  background: #FFF;
  margin: 10px auto;
  padding: 20px 0;
  border-radius: 5px;
`
const TopicHeader = styled.div`
  border-bottom: 1px solid #dfdfdf;
  padding: 10px;
`
const HeaderTop = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.span`
  font-size: 22px;
  font-weight: 700;
  vertical-align: bottom;
`
const Tag = styled.span`
  font-size: 0.8em;
  border-radius: 3px;
  padding: 2px 4px;
  background: #80bd01;
  color: #FFF;
`
const HeaderBm = styled.div.attrs({
  className: 'clearfix'
})`
`;
const Tip = styled.p`
  float:left;
  font-size: 12px;
  line-hegith: 12px;
  color: #838383;
  margin-top: 0px;
  & span{
    margin:0 2px;
  }
`
const CollectButton = styled.button`
  float:right;
  padding: 3px 10px;
  background:#80bd01;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  height: 2em;
`
const TopicContent = styled.div`
  margin: 0 10px;
`
