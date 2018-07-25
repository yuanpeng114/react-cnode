export const PUBLISH_TOPIC = "PUBLISH_TOPIC";


// 新建主题
export const publishTopic = info => ({
    type: PUBLISH_TOPIC,
    info
})
