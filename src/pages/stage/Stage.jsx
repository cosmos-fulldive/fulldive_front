import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import ShareModal from "../../components/modal/ShareModal";
import DonationModal from "../../components/modal/DonationModal";
import DeclarationModal from "../../components/modal/DeclarationModal";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { w3cwebsocket as WebSocket } from "websocket";
import { useSelector } from "react-redux";

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

const donation_item = [
  {
    id: 1,
    imgUrl: "/images/stage/5.svg",
    name: "5",
  },
  {
    id: 2,
    imgUrl: "/images/stage/100.svg",
    name: "10",
  },
  {
    id: 3,
    imgUrl: "/images/stage/15.svg",
    name: "15",
  },
  {
    id: 4,
    imgUrl: "/images/stage/20.svg",
    name: "20",
  },
];

const Stage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_data = useSelector((state) => state.Auth.user);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [DonationModalOpen, setDonationModalOpen] = useState(false);
  const [DonationImgOpen, setDonationImglOpen] = useState(false);
  const [declarationModalOpen, setDeclareModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [userCount, setUserCount] = useState(null);
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

  console.log(userCount);

  // [] 안에 함부로 뭐 넣지 말것 안그러면 웹소켓 중복 유저 체크당함
  useEffect(() => {
    if (user_data === undefined) {
      window.alert("로그인 후 입장 부탁드립니다");
      navigate("/login");
      return;
    }

    const newClient = new WebSocket(
      `ws://fulldive.live:8885/MilcomedaSocket?roomId=${location.state.data.stageId},userId=${user_data.userId}`
    );

    newClient.onopen = () => {
      console.log("WebSocket connected");
    };

    newClient.onmessage = (message) => {
      const obj = JSON.parse(message.data);
      if (obj.type === 6) {
        setUserCount(obj.userCount);
      }
      if (obj.type === 1 || obj.type === 2) {
        setMessages((prevMessages) => [...prevMessages, obj]);
      }
    };
    setClient(newClient);
    //새로운 ChatBox 요소를 추가하는 함수
  }, [user_data]);

  useEffect(() => {
    function addChatBox(obj) {
      const container = document.querySelector("#chatContainer");
      container.scrollTop = container.scrollHeight;
    }

    //메시지를 받으면 ChatBox 추가 함수 호출
    if (messages.length > 0) {
      // setUserCount(obj.userCount);
      const obj = messages[messages.length - 1];
      console.log("obj", obj);
      addChatBox(obj);
    }
  }, [messages]);

  const sendMessage = () => {
    let val = {
      type: 1,
      nickname: user_data.userNickname,
      message: chat,
    };

    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(val));
    }
  };

  // 도네이션
  // const sendDanation = () => {
  //   let val = {
  //     type: 1,
  //     nickname: user_data.userNickname,
  //     message: chat,
  //   };

  //   if (client.readyState === client.OPEN) {
  //     client.send(JSON.stringify(val));
  //   }

  //   console.log("1111");
  // };

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

  const openDonationImg = () => {
    setDonationModalOpen(false);
    setDonationImglOpen(true);
  };

  const closeDonationImg = () => {
    setDonationImglOpen(false);
  };

  const handleProgress = (secs) => {
    setSeconds(secs);
  };

  // const StrKey = 123;

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

  const [focusedButton, setFocusedButton] = useState(null);

  function handleFocus(label) {
    setFocusedButton(label);
  }

  function handleBlur() {
    setFocusedButton(null);
  }

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
                시청자 수 <span>{userCount}</span>
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
                        {msg.nickname}
                        <span>{currentTime}</span>
                      </div>
                      <div>{msg.message}</div>
                    </div>
                  </ChatBox>
                ))}
            </div>

            {/* 도네이션 이미지 div */}

            <DonationImgContainer style={{ display: DonationImgOpen ? "" : "none" }}>
              <DonationTop>
                <DonationTextRight>
                  <div>응원하기</div>
                  <DonationCount>
                    <img src="/images/stage/StageComet.svg" />
                    <div>20</div>
                  </DonationCount>
                </DonationTextRight>

                <DonationTextLeft>
                  <CloseButton type="button" onClick={closeDonationImg}></CloseButton>
                </DonationTextLeft>
              </DonationTop>
              <DonationBottom>
                <DonationImg>
                  {donation_item.map((data, id) => (
                    <DonationBox>
                      <DonationImgBox
                        key={id}
                        checked={focusedButton === id ? "focused" : ""}
                        onFocus={() => handleFocus(id)}
                        // onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <div key={id}>
                          <img src={data.imgUrl} />
                          <div>
                            <p className="name">{data.name}</p>
                          </div>
                        </div>
                      </DonationImgBox>
                    </DonationBox>
                  ))}
                </DonationImg>
              </DonationBottom>
            </DonationImgContainer>

            <label>
              <Chatting placeholder="메세지를 입력해주세요" onChange={onChange} value={chat} onKeyPress={onKeyPress} maxLength="50" />
              <DonatoonButton onClick={openDonationModal} />
              <DonationModal visible={DonationModalOpen} onClose={closeDonationModal} onChange={openDonationImg} />
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

const DonationImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px !important;
  background: #1b1b24;
  /* display: none; */

  border-radius: 12px 12px 4px 4px;
  padding: 16px 23px 26px;
`;

const DonationTop = styled.div`
  position: relative;
  height: 35px;
  display: flex;
`;

const DonationBottom = styled.div`
  margin-top: 20px;
  -webkit-box-pack: center;
  justify-content: center;
`;

const DonationImg = styled.div`
  display: flex;
  text-align: center;
  -webkit-box-pack: justify;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
`;

const DonationBox = styled.div`
  display: flex;
  /* width: 80px; */
  /* background: #273DFF; */
  > div {
    > img {
      /* width: 70px;
    height: 70px; */
    }
  }
`;

const DonationImgBox = styled.button`
  width: 80px;
  height: 120px;

  ${({ checked }) =>
    !checked
      ? ``
      : `border: 2px solid #273DFF;
    `}

  border-radius: 8px;
`;

const DonationTextRight = styled.div`
  display: flex;
  > div {
    display: flex;
    align-items: center;
  }
`;

const DonationCount = styled.div`
  width: 70px;
  background: #273dff;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }

  margin-left: 12px;
`;

const DonationTextLeft = styled.div`
  position: absolute;
  right: 0;
`;
const CloseButton = styled.button`
  background: url("/images/stage/close.svg") no-repeat 50%;
  width: 24px;
  height: 24px;
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
