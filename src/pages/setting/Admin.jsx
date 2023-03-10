import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { w3cwebsocket as WebSocket } from "websocket";
import ReactPlayer from "react-player";

const messages = [
  {
    type: 1,
    message: "안녕하세요",
  },
];

const data = [
  {
    url: "http://www.fulldive.live/123456",
    streamkey: "http://www.fulldive.live/123456",
  },
];

const Admin = () => {
  const location = useLocation();
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const currentTime = ampm + " " + hours + ":" + minutes;

  useEffect(() => {
    const newClient = new WebSocket(`ws://fulldive.live:8885/MilcomedaSocket?roomId=test,userId=test5`);
    newClient.onopen = () => {
      console.log("WebSocket connected");
    };
    newClient.onmessage = (message) => {
      const obj = JSON.parse(message.data);
      // console.log("WebSocket message received:", obj);
      setMessages((prevMessages) => [...prevMessages, obj]);
    };
    setClient(newClient);

    // 새로운 ChatBox 요소를 추가하는 함수
    function addChatBox(obj) {
      const container = document.querySelector("#chatContainer");

      // const chatBox = document.createElement("div");
      // chatBox.className = "ChatBox";
      // // chatBox.className = "ChatBox";

      // const img = document.createElement("img");
      // img.src = "/images/artist.svg";
      // chatBox.appendChild(img);

      // const innerDiv = document.createElement("div");
      // chatBox.appendChild(innerDiv);

      // const userDiv = document.createElement("div");
      // userDiv.className = "user";
      // userDiv.innerText = `${obj.type} ${obj.message}`;
      // innerDiv.appendChild(userDiv);

      // const messageDiv = document.createElement("div");
      // messageDiv.innerText = obj.message;
      // innerDiv.appendChild(messageDiv);

      // container.appendChild(chatBox);

      container.scrollTop = container.scrollHeight;
    }

    // 메시지를 받으면 ChatBox 추가 함수 호출
    if (messages.length > 0) {
      const obj = messages[messages.length - 1];
      addChatBox(obj);
    }
  }, [messages]);

  const sendMessage = () => {
    let val = {
      type: 1,
      message: chat,
    };

    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(val));
    }
  };

  const handleProgress = (secs) => {
    setSeconds(secs);
  };

  const onChange = (e) => {
    setChat(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendMessage();
      setChat("");
    }
  };

  // const StrKey = location.state.data.stageStreamKey;

  return (
    <Container>
      <Left>
        <VideoContainer>
          <ReactPlayer
            url={` http://fulldive.live:8883/live/stage/541d018e-e5e1-416f-af8e-43cc827dbccc/index.m3u8`}
            // #t=,00:01:00 <- 1분 미리보기
            muted={true}
            playing={true}
            controls={true}
            enableStashBuffer={true}
            width="100%"
            height="100%"
            onProgress={(e) => handleProgress(e.playedSeconds)}
            config={{
              file: {
                forceFLV: true,
              },
            }}
          />
        </VideoContainer>
        <div>
          <div>
            <p>서버 URL</p>
            <CopyButton>
              http://www.fulldive.live/123456 <button>복사하기</button>
            </CopyButton>
          </div>
          <div>
            <p>스트리밍 키</p>
            <CopyButton>
              http://www.fulldive.live/123456 <button>복사하기</button>
            </CopyButton>
          </div>
        </div>
      </Left>
      <Right>
        <div>채팅</div>
        <ChatBoxContainer>
          <div id="chatContainer">
            {messages &&
              messages.map((msg, index) => (
                <ChatBox key={index}>
                  <img src="/images/artist.svg" />
                  <div>
                    <div className="user">
                      sangyeon Kim<span>{currentTime}</span>
                    </div>
                    <div>{msg.message}</div>
                  </div>
                </ChatBox>
              ))}
          </div>
          <label>
            <Chatting placeholder="메세지를 입력해주세요" onChange={onChange} value={chat} onKeyPress={onKeyPress} />
            <ChatButton onClick={sendMessage}></ChatButton>
          </label>
        </ChatBoxContainer>
      </Right>
    </Container>
  );
};

const CopyButton = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 15px 24px;
  background: #d9d9d91a;
  border-radius: 120px;
  font-size: 1rem;
  position: relative;
  > button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 30px;
    background: #1d1d22;
    border-radius: 100px;
    height: 100%;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 70%;
`;

const Left = styled.div`
  width: 65%;
  height: 100vh;
  margin-right: 18px;
  > div {
    display: flex;
    > div {
      width: 50%;
      &:nth-child(2) {
        margin-left: 24px;
      }
      > p {
        margin-top: 24px;
        font-size: 0.875rem;
      }
    }
  }
`;

const ChatButton = styled.button`
  width: 63px;
  height: 25px;
  position: absolute;
  background: url("/images/stage/sendbutton.svg") no-repeat 50% #273dff;
  padding: 0 21px;
  top: 1px;
  right: 12px;
  border-radius: 12px;
`;

const Chatting = styled.input`
  width: 100%;
  height: 50px;
  background-color: #14141c;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  padding: 0 25% 0 12px;
`;

const ChatBox = styled.div`
  display: flex;
  background: #202024;
  border-radius: 4px;
  padding: 20px;
  margin-top: 12px;
  > img {
  }
  > div {
    margin-left: 12px;
    > div {
      font-size: 1rem;
      &.user {
        font-size: 1.125rem;
        margin-bottom: 5px;
        > span {
          font-size: 0.8rem;
          color: #999999;
          margin-left: 5px;
        }
      }
    }
  }
`;

const ChatBoxContainer = styled.div`
  margin-bottom: 7px;
  > label {
    position: relative;
  }
  > div {
    height: 600px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1500px) {
      height: 450px;
    }
  }
`;

const Right = styled.div`
  width: 35%;
  position: sticky;
  height: 100%;
  padding: 24px;
  background: #181820;
  right: 30px;
  top: 130px;
  /* flex: 0.642; */
  border-radius: 12px;
  > div {
    font-size: 1.25rem;
  }
`;

const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  padding-top: 30px;
`;

export default Admin;
