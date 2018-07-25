export default (state={},action) => {
  switch (action.type) {
    case "PUBLISH_TOPIC_SUCCESS":
      return {
        ...state,
        publish: action.data
      }
    default:
      return state;
  }
}
