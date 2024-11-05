import ChatComponent from "@/components/chat/chatbot";
import UserView from "@/views/UserView/UserView";
import React from "react";

const pageUser = () => {
  return (
    <>
      <UserView />
      <ChatComponent />
    </>
  );
};

export default pageUser;
