const defaultState = {
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_START":
      return {
        ...state,
        topicList:null
      }
    case "GET_TOPICLIST_SUCCESS":
      return {
        ...state,
        status: 1,
        topicList: action.isLoadMore
                      ? [...state.topicList,...action.topicList]
                      : action.topicList
      }
    case "GET_TOPIC_DETAIL_SUCCESS":
      return {
        ...state,
        status: 1,
        topicDetail: action.topicDetail
      }
    case "COLLECT_OR_CANCEL_DONE":
      return {
        ...state,
        topicDetail: {...state.topicDetail,is_collect: action.is_collect}
      }
    case "CLEAR_TOPIC":
      return {
        ...state,
        topicDetail: null
      }
    default:
      return state
  }
}
