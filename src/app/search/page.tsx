import ChatComponent from "@/components/General/Chat/Chatbot";
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
