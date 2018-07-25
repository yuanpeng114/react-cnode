import React from 'react';
import {connect} from "react-redux";
import {loadMore} from '../../actions/topics';
import {Link} from 'react-router-dom';
import styled , {ThemeProvider}from 'styled-components';
import Loading from '../Common/Loading';
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tab: {
        share: "分享",
        ask: "问答",
        job: '招聘',
        get [true](){
          return '精华'
        }
      }
    }
  }
  componentDidMount(){
    let that = this;
    window.onscroll = function(){
      let totalh = document.documentElement.scrollHeight || document.body.scrollHeight;
      let curh = document.documentElement.clientHeight+document.documentElement.scrollTop;
      if(curh>=totalh){
          const search = that.props.location.search || '?tab=all';
          that.props.onLoadMore(search);
      }
    }
  }

  renderTopics(topicList){
    return(
      topicList.map((topic,index)=>(
              <Topic key={index}>
                <LeftLabel>
                  <AuthorAvatar src={topic.author.avatar_url}></AuthorAvatar>
                  <Count>{`${topic.reply_count}/${topic.visit_count}`}</Count>
                  <Tab good={topic.good}>
                    { topic.top  ? "置顶" : this.state.tab[topic.good || topic.tab] }
                  </Tab>
                </LeftLabel>
                <TopicTitle>
                  <Link to={`/topic/${topic.id}`} title={topic.title}>{topic.title}</Link>
                </TopicTitle>
                <RightLabel>
                  <LastReplyDate>{moment(topic.last_reply_at).fromNow()}</LastReplyDate>
                </RightLabel>
              </Topic>
      ))
    )
  }
  render(){
    let topicList = this.props.topicList;
    if(topicList){
      return <TopicList>{this.renderTopics(topicList)}</TopicList>
    }else{
      return( <Loading>加载中</Loading>)
    }
  }
}
const mapStateToProps = state => ({
  topicList: state.topic.topicList,
})
const mapDispatchToProps = dispatch => ({
  onLoadMore: searchTab => dispatch(loadMore(searchTab))
})
export default connect(mapStateToProps,mapDispatchToProps)(Main);

const TopicList = styled.ul`
  width: 1140px;
  margin: 20px auto 0;
  @media(max-width:1200px){
    width: auto;
    margin: 0;
  }
`;
const Topic = styled.li`
  font-size:16px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  padding:0 20px;
  background: #FFF;
  @media(max-width:576px){
    font-size:10px;
    padding:0 10px;
  }
`;
const LeftLabel = styled.div`
  display: inherit;
  align-items: center;
  line-height:40px;
  margin-right: 10px;
  @media(max-width:768px){
    & span{
      display: none;
    }
  }
`;
const AuthorAvatar = styled.img
`
  width:30px;
  height:30px;
`;
const Count = styled.span`
  width:70px;
  text-align: center;
  font-size: 0.75em;
`;
const Tab = styled.span`
   line-height: 18px;
   border-radius: 3px;
   background: ${props => props.good ? "#80bd01" : "#e5e5e5"}
   color:  ${props => props.good ? "#fff" : "#999"}
   font-size: 0.75em;
   padding:2px 5px;
   text-align: center;
`;
const TopicTitle = styled.div`
    flex:1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin:0 10px;
`;
const RightLabel = styled.div``;
const ReplyUserAvatar = styled.img``;
const LastReplyDate = styled.span``;
