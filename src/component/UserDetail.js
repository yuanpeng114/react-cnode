import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {getUser} from '../actions/auth';
import {Link} from 'react-router-dom';
import Loading from './Common/Loading';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class UserDetail extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    const {match:{params:{username}}} = this.props;
    this.props.getUser(username);
  }
  renderTopicItem(topicList){
    return topicList.map(item=>
        <TopicItem key={item.id}>
            <Avatar size="30" src={item.author.avatar_url}></Avatar>
            <Title><Link to={`/topic/${item.id}`}>{item.title}</Link></Title>
            <LastReplyDate>{moment(item.last_reply_at).fromNow()}</LastReplyDate>
        </TopicItem>
    )
  }
  render(){
    const {userDetail} = this.props;
    if(userDetail && !userDetail.status){
      return <div>该用户不存在</div>
    }
    if(userDetail){
      return(
          <Wrap>
              <Section>
                <Header><StyleLink to="/">主页 /</StyleLink></Header>
                <Content padding>
                    <UserTop>
                      <Avatar src={userDetail.avatar_url} size="40"></Avatar>
                      <NickName>{userDetail.loginname}</NickName>
                    </UserTop>
                    <UserBottom>
                      <p>{userDetail.score}积分</p>
                      <p>
                        <i className="fa fa-lg fa-fw fa-github"></i>
                        @{userDetail.githubUsername}
                       </p>
                       <p>注册时间&nbsp;<span>{moment(userDetail.create_at).fromNow()}&nbsp;</span></p>
                   </UserBottom>
                </Content>
              </Section>
              <Section>
                <Header>最近创建的话题</Header>
                <Content>
                  {this.renderTopicItem(userDetail.recent_topics)}
                </Content>
              </Section>
              <Section>
                <Header>最近参与的话题</Header>
                <Content>
                  {this.renderTopicItem(userDetail.recent_replies)}
                </Content>
              </Section>
          </Wrap>
      )
    }
    return <Loading></Loading>
  }
}

const mapStateToProps = state => ({
  userDetail: state.auth.userDetail
})
const mapDispatchToProps = dispatch => ({
  getUser: username => dispatch(getUser(username))
})
export default connect(mapStateToProps,mapDispatchToProps)(UserDetail);

const Wrap = styled.div`
  width: 1140px;
  margin: 20px auto 0;
  @media(max-width:1139px){
    width: auto;
    margin: 0;
  }
`;
const Section = styled.div`
  margin-top: 20px;
  background: #FFF;
  border-radius: 5px;
`;
const Header = styled.div`
  padding: 10px;
  line-height: 20px;
  background: #f6f6f6;
  color: #444;
`;
const Content = styled.div`
  padding: ${props=> props.padding && '10px'}
`;
const UserTop = styled.div``;
const UserBottom = styled.div`
  line-height: 2em;
  color: #778087;
`;
const Avatar = styled.img`
  border-radius: 3px;
  width: ${props => props.size+'px' || "auto"}
  height: ${props => props.size+'px' || "auto"}
`;
const NickName = styled.span`
  color: #778087;
  vertical-align: 100%;
  margin-left: 10px;
`;
const StyleLink = styled(Link)`
  color: #80bd01;
`;
const TopicItem = styled.div`
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  padding: 10px;
  -webkit-align-items: center;
  -ms-align-items: center;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
`
const Title = styled.div`
  -webkit-flex: 1;
  -ms-flex: 1;
  flex:1;
  margin-left: 30px;
  color: #08c;
  &:hover{
    text-decoration: underline;
  }
`;
const LastReplyDate = styled.div``
