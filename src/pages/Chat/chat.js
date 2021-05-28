import { CometChatConversationListWithMessages } from "../../lib/cometchat";
import React from "react";
export default function Chat(props) {

  console.log("Props")
  console.log(props.location.state)
  let userData = props.location.state

  let chatComponent;
  if (userData != undefined) {
    chatComponent = <CometChatConversationListWithMessages chatWithUser={userData} />
  } else {
    chatComponent = <CometChatConversationListWithMessages />
  }

  return (
    <div style={{ width: '75vw', height: '80vh' }}>
      {chatComponent}
    </div>
  );

}