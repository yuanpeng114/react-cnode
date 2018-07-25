import React from 'react';
import styled from 'styled-components';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class Reply extends React.Component{
  constructor(props){
    super(props);
    this.state = {pupup:false}
  }
  render(){
    const {replies,upvote,replyOtherOne} = this.props;
    return (
      <React.Fragment>
        <Header>{replies.length}回复</Header>
        <ReplyList>
          {
            replies.map((reply,index) =>
              <ReplyItem key={reply.id}>
                <Upper>
                  <LeftUpper>
                    <Avatar src={reply.author.avatar_url}></Avatar>
                  </LeftUpper>
                  <CenterUpper>
                    <NickName>{reply.author.loginname}</NickName>
                    <ReplyTime>{`${++index}楼•${moment(reply.create_at).fromNow()}`}</ReplyTime>
                  </CenterUpper>
                  <RightUpper>
                    <GoodIcon
                      onClick={() => upvote(reply.id,reply.author.loginname)}
                      isUped = {reply.is_uped}
                      >
                    </GoodIcon>
                    <GoodCount>{reply.ups.length > 0 && reply.ups.length}</GoodCount>
                    <ReplyIcon onClick={() => replyOtherOne(reply.id,reply.author.loginname)}></ReplyIcon>
                  </RightUpper>
                </Upper>
                <Under>
                    <div dangerouslySetInnerHTML={{__html: reply.content}} />
                </Under>
              </ReplyItem>
            )
          }
        </ReplyList>
      </React.Fragment>
    )
  }
}
const Div = styled.div``;
const Header = styled.div`
  padding:10px;
  background: #F6F6F6;
  font-size:14px;
`;
const ReplyList = styled.ul``;
const ReplyItem = styled.li`
  padding: 10px 20px 30px;
  border-bottom: 1px solid #dfdfdf;
  &: last-child {
    border-bottom: none;
    padding:10px 20px 10px;
  }
`;
const Upper = styled.div`
  display: -webkit-flex;
  display: flex;
`;
const Under = styled.div`
  margin: 0 40px;
  font-size: 14px;
`;
const LeftUpper = styled.div`

`;
const CenterUpper = styled.div`
  -webkit-flex: 1;
  flex: 1;
  margin:0 30px 0 15px;
  font-size:12px;
  color:#666;
`;
const RightUpper = styled.div`

`;

const Avatar = styled.img.attrs({
  src: props => props.src
})`
  width: 30px;
  height: 30px;
`;
const NickName = styled.span`
  font-weight: 700;
`;
const ReplyTime = styled.span`
  color: #08c;
  margin-left:4px;
`;
const GoodCount = styled.span`
  margin:0 5px;
  color: #666;
`;
const GoodIcon = styled.span.attrs({
  className: "fa fa-thumbs-o-up",
})`
  opacity: ${props => props.isUped ? 1 : 0.4};
  cursor: pointer;
`;
const ReplyIcon = GoodIcon.extend.attrs({
  className: "fa fa-reply"
})``;
