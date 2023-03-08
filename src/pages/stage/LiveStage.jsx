import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const LiveStage = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const menus = [
    {
      id: 1,
      name: "라이브 스테이지",
      pathname: "/stage/liveStage",
    },
    {
      id: 2,
      name: "다가오는 스테이지",
      pathname: "/stage/upcomingStage",
    },
    {
      id: 3,
      name: "지난 스테이지",
      pathname: "/stage/exitStage",
    },
  ];

  const [StageData, setStageData] = useState(null);

  useEffect(() => {
    axios.get(`http://118.63.182.3:8880/api/main/mainInfo`).then((res) => setStageData(res.data.stageStartInfo));
  }, []);

  console.log(StageData);

  return (
    <Container>
      <MenuBar>
        {menus.map((menu, index) => (
          <Link to={menu.pathname} key={index}>
            <Menu key={index} isHere={pathname === menu.pathname}>
              {menu.name}
            </Menu>
          </Link>
        ))}
      </MenuBar>
      <StageContainer>
        {StageData &&
          StageData.map((data, id) => (
            <>
              <StageBox>
                <Figure to={data.imgUrl} artist="none">
                  <Live>
                    <Dot />
                    <p> Live</p>
                  </Live>
                  <ImageArea src={data.imgUrl} alt="live_stage" />
                </Figure>
                <StageContentBox>
                  <div>
                    <img src={data.imgUrl} />
                    <div>
                      <p>{data.title}</p>
                      <span>{data.artist}</span>
                    </div>
                  </div>
                  <Ticket>
                    <img src={data.ticketImg} className="ticket" />
                    {data.ticket}
                  </Ticket>
                </StageContentBox>
              </StageBox>
            </>
          ))}
      </StageContainer>
    </Container>
  );
};

const Dot = styled.div`
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  height: 5px;
  position: absolute;
  width: 5px;
  top: 40%;
  left: 10%;
`;

const Live = styled.div`
  display: inline-block;
  position: absolute;
  top: 12px;
  left: 12px;
  width: 60px;
  height: 24px;
  background-color: #ff2f2f;
  border-radius: 100px;
  z-index: 3;
  > p {
    padding: 5% 0 0 30%;
    font-size: 1rem;
    font-weight: 600;
    line-height: 19px;
  }
`;

const Ticket = styled.div`
  font-size: 1rem;
`;

const StageContentBox = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  > div {
    display: flex;
    > img {
      max-width: 40px;
      height: 40px;
      border-radius: 20px;
      &.ticket {
        max-width: 18px;
        height: 19px;
        margin-right: 10px;
      }
    }
    > div {
      margin-left: 10px;
      > p {
        font-size: 1rem;
      }
      > span {
        font-size: 0.875rem;
        color: #a0a0a0;
      }
    }
  }
`;

const ImageArea = styled.img`
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
`;

const Figure = styled.a`
  display: block;
  position: relative;
  padding-bottom: 65%;
  width: 100%;
  ${(props) => props.artist === "artist" && `padding-bottom: 90%`}
`;

const StageContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StageBox = styled.div`
  width: 24%;
  margin-top: 24px;
`;

const Menu = styled.a`
  margin-right: 30px;
  color: #b0b0b0;
  padding: 0 10px;
  :hover {
    color: #ffffff;
    border-bottom: 2px solid #273dff;
    padding-bottom: 5px;
  }
  ${(props) =>
    props.isHere
      ? `
      color: #ffffff;
      border-bottom: 2px solid #273DFF;
      padding-bottom: 5px;
  `
      : `
      color: #8B8B8B;
  `}
`;

const MenuBar = styled.div`
  display: flex;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100vh;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
`;

export default LiveStage;
