import React from "react";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Chat_Index() {
  return (
    <div className=" h-screen w-full ">
      <Outlet />
    </div>
  );
}

export default Chat_Index;
