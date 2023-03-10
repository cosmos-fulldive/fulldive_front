import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import queryString from "query-string";
import ShareModal from "../../components/modal/ShareModal";
import DonationModal from "../../components/modal/DonationModal";
import DeclarationModal from "../../components/modal/DeclarationModal";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { w3cwebsocket as WebSocket } from "websocket";

// const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
// const FlvNextPlayer = dynamic(() => import("@ztxtxwd/react-ts-flv-player/dist/ReactFlvPlayer"), {
//   ssr: false,
// });

// const shopping_item = [
//   {
//     id: 1,
//     imgUrl: "/images/ticket.svg",
//     name: "바니바니 당근당근",
//     company: "S&Y Group",
//     cost: "58,000",
//   },
//   {
//     id: 1,
//     imgUrl: "/images/ticket.svg",
//     name: "바니바니 당근당근",
//     company: "S&Y Group",
//     cost: "58,000",
//   },
//   {
//     id: 1,
//     imgUrl: "/images/ticket.svg",
//     name: "바니바니 당근당근",
//     company: "S&Y Group",
//     cost: "58,000",
//   },
//   {
//     id: 1,
//     imgUrl: "/images/ticket.svg",
//     name: "바니바니 당근당근",
//     company: "S&Y Group",
//     cost: "58,000",
//   },
// ];

const Stage = () => {
  const location = useLocation();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [DonationModalOpen, setDonationModalOpen] = useState(false);
  const [declarationModalOpen, setDeclareModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState("");
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const currentTime = ampm + " " + hours + ":" + minutes;

  useEffect(() => {
    const newClient = new WebSocket(`ws://fulldive.live:8885/MilcomedaSocket?roomId=${location.state.data.stageId},userId=test5`);
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

  const openShareModal = () => {
    setShareModalOpen(true);
  };
  const closeShareModal = () => {
    setShareModalOpen(false);
  };
  const openDeclarationModal = () => {
    setDeclareModalOpen(true);
  };
  const closeDeclarationModal = () => {
    setDeclareModalOpen(false);
  };
  const openDonationModal = () => {
    setDonationModalOpen(true);
  };
  const closeDonationModal = () => {
    setDonationModalOpen(false);
  };

  const handleProgress = (secs) => {
    setSeconds(secs);
  };

  // const StrKey = 123;
  console.log(location.state.data);

  console.log(location.state.data.stageStreamKey);

  const StrKey = location.state.data.stageStreamKey;

  const onChange = (e) => {
    setChat(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendMessage();
      setChat("");
    }
  };

  return (
    <Fragment>
      <Container>
        <Left>
          <VideoContainer>
            <ReactPlayer
              url={` http://fulldive.live:8883/live/${StrKey}/index.m3u8`}
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
          <Title>
            <TitleText>
              <p>{location.state.data.stageTitle}</p>
              {/* <button style={parseFloat(seconds) > 60 ? { display: "none" } : {}}>asd</button> */}
            </TitleText>
            <ButtonWrap>
              <span>
                시청자 수 <span>00명</span>
              </span>
              <button onClick={openShareModal}>공유</button>
              <ShareModal visible={shareModalOpen} onClose={closeShareModal} />
              <button onClick={openDeclarationModal}>신고</button>
              <DeclarationModal visible={declarationModalOpen} onClose={closeDeclarationModal} />
            </ButtonWrap>
          </Title>
          <ContentBox>
            <img src="/images/artist.svg" />
            <div>{location.state.data.stageTitle}</div>
          </ContentBox>
          <Description>
            <div className="date">
              <div>공연 날짜 및 시간</div>
              <p>{location.state.data.stageTimestamp}</p>
            </div>
            <div>
              <div>공연 설명</div>
              <p>{location.state.data.stageDescription}</p>
            </div>
          </Description>
          <Wrap>
            <div>참여 아티스트</div>
            <Artist>
              <div>
                <img src="/images/artist.png" />
                <p>{location.state.data.stageArtistId}</p>
              </div>
            </Artist>
          </Wrap>
          {/* <Wrap>
            <div>추천상품</div>
            <Shop>
              {shopping_item.map((data, id) => (
                <div key={id}>
                  <img src={data.imgUrl} />
                  <div>
                    <p className="name">{data.name}</p>
                    <p className="company">{data.company}</p>
                    <p className="cost">{data.cost}</p>
                  </div>
                </div>
              ))}
            </Shop>
          </Wrap> */}
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
              <DonatoonButton onClick={openDonationModal} />
              <DonationModal visible={DonationModalOpen} onClose={closeDonationModal} />
              <ChatButton onClick={sendMessage}></ChatButton>
            </label>
          </ChatBoxContainer>
        </Right>
      </Container>
    </Fragment>
  );
};

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

const DonatoonButton = styled.button`
  width: 22px;
  height: 22px;
  position: absolute;
  background: url("/images/donation.svg") no-repeat 50%;
  padding: 0 21px;
  top: 1px;
  right: 80px;
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

const Shop = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    display: flex;
    background: #181820;
    border-radius: 4px;
    margin-top: 10px;
    margin-right: 20px;
    > img {
      width: 90px;
      height: 90px;
    }
    > div {
      padding: 12px;
      > p {
        &.name {
          font-size: 1rem;
        }
        &.company {
          font-size: 0.875rem;
          color: #757575;
        }
        &.cost {
          padding-top: 12px;
          color: #adadad;
          font-size: 1rem;
        }
      }
    }
  }
`;

const Artist = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    display: flex;
    background: #191922;
    padding: 10px 20px;
    border-radius: 46px;
    margin-top: 10px;
    margin-right: 10px;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 6px;
    }
    > p {
      line-height: 40px;
    }
  }
`;

const Wrap = styled.div`
  margin-top: 36px;
`;

const Description = styled.div`
  display: flex;
  margin-top: 24px;
  flex-direction: column;
  gap: 24px;
  > div {
    &.date {
      margin-right: 30px;
    }
    > div {
      font-size: 1rem;
      margin-bottom: 6px;
    }
    > p {
      font-size: 1rem;
      color: #989898;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  > img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  > div {
    margin-top: 8px;
    margin-left: 6px;
  }
`;

const ButtonWrap = styled.div`
  font-size: 1rem;
  > button {
    background: #191922;
    margin-left: 12px;
    border-radius: 100px;
    padding: 6px 24px;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  > div {
    display: flex;
    > p {
      padding-top: 4px;
      font-size: 1.25rem;
      margin-right: 12px;
    }
    > span {
      padding-top: 6px;
      font-size: 1rem;
      > span {
        color: #c1c1c1;
      }
    }
  }
`;

const TitleText = styled.div``;

const VideoContainer = styled.div`
  width: 100%;
`;

const Right = styled.div`
  position: sticky;
  height: 100%;
  padding: 24px;
  background: #181820;
  width: 35%;
  right: 30px;
  top: 130px;
  /* flex: 0.642; */
  border-radius: 12px;
  > div {
    font-size: 1.25rem;
  }
`;

const Left = styled.div`
  width: 65%;
  /* flex: 1.358; */
  border-radius: 12px;
  margin-right: calc(24px);
  @media (max-width: 1500px) {
    width: 62%;
  }
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  display: flex;
  padding-top: 30px;
`;

export default Stage;
