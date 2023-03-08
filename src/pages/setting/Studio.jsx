import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const stages = [
  {
    id: 1,
    imgUrl: "/images/sample.png",
    stageName: "바람과 함께 사라지다",
    artist: "김아무개입니다,도라에몽,서지우",
    stageTime: "2022. 12. 01. 목요일 18:00 - 20:00 (120분)",
    type: "pending",
  },
  {
    id: 2,
    imgUrl: "/images/sample.png",
    stageName: "바람과 함께 사라지다",
    artist: "김아무개입니다,도라에몽,서지우",
    stageTime: "2022. 12. 01. 목요일 18:00 - 20:00 (120분)",
    type: "complete",
  },
  {
    id: 3,
    imgUrl: "/images/sample.png",
    stageName: "바람과 함께 사라지다",
    artist: "김아무개입니다,도라에몽,서지우",
    stageTime: "2022. 12. 01. 목요일 18:00 - 20:00 (120분)",
    type: "blocked",
  },
  {
    id: 4,
    imgUrl: "/images/sample.png",
    stageName: "바람과 함께 사라지다",
    artist: "김아무개입니다,도라에몽,서지우",
    stageTime: "2022. 12. 01. 목요일 18:00 - 20:00 (120분)",
    type: "blocked",
  },
];

const Studio = () => {
  return (
    <Container>
      <Top>
        <div>
          <p>공연리스트</p>
          <StageButton>라이브 예약</StageButton>
          <StageButton>지난 공연</StageButton>
        </div>
        <div>
          <SearchBar />
          <Link to="/setting/studio/studioInsert">
            <InsertButton>공연 등록</InsertButton>
          </Link>
          <div>정렬</div>
        </div>
      </Top>
      <Main>
        {stages.map((stage, index) => (
          <Stage key={index}>
            <div className="img">
              <img src={stage.imgUrl} />
            </div>
            <DescriptionWrap>
              <Description>
                <p>{stage.stageName}</p>
                <p className="title">참여 아티스트</p>
                <p className="des">{stage.stageName}</p>
                <p className="title">공연 날짜/시간</p>
                <p className="des">{stage.stageName}</p>
              </Description>
              <div>asd</div>
            </DescriptionWrap>
          </Stage>
        ))}
      </Main>
    </Container>
  );
};

const Description = styled.div`
  > p {
    font-size: 1rem;
    &.title {
      margin-top: 22px;
    }
    &.des {
      margin-top: 10px;
    }
  }
`;

const DescriptionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
`;

const Stage = styled.div`
  margin-top: 24px;
  display: flex;
  background: #1d1d26;
  border-radius: 12px;
`;

const Main = styled.div``;

const InsertButton = styled.button`
  padding: 9px 28px 9px 12px;
  background: url("/images/setting/pencil.svg") no-repeat 90% 50% #273dff;
  font-size: 1rem;
  border-radius: 100px;
  margin: 0 12px;
`;

const SearchBar = styled.input`
  background: url("/images/search.svg") no-repeat 20px 50% #21212b;
  background-size: 20px;
  width: 250px;
  border-radius: 100px;
  border: none;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 400;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 55px;
`;

const StageButton = styled.button`
  padding: 8px 30px;
  background: #273dff;
  border-radius: 100px;
  margin-left: 12px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    line-height: 37.5px;
    > p {
      font-size: 1.25rem;
      margin-right: 12px;
    }
  }
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  padding-top: 30px;
`;

export default Studio;
