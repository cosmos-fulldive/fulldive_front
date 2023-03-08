import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const music = [
  {
    id: 1,
    type: "케이팝",
  },
  {
    id: 2,
    type: "알앤비",
  },
  {
    id: 3,
    type: "락/메탈",
  },
  {
    id: 4,
    type: "팝",
  },
  {
    id: 5,
    type: "일렉트로닉",
  },
  {
    id: 6,
    type: "얼터너티브",
  },
  {
    id: 7,
    type: "제이팝",
  },
  {
    id: 8,
    type: "발라드",
  },
  {
    id: 9,
    type: "재즈",
  },
  {
    id: 10,
    type: "컨트리",
  },
  {
    id: 11,
    type: "힙합",
  },
  {
    id: 12,
    type: "펑크",
  },
  {
    id: 13,
    type: "메탈",
  },
  {
    id: 14,
    type: "댄스",
  },
  {
    id: 15,
    type: "클래식",
  },
  {
    id: 16,
    type: "이디엠",
  },
  {
    id: 17,
    type: "레게",
  },
  {
    id: 18,
    type: "인디",
  },
];

const ticket = [
  {
    id: 1,
    imgUrl: "/images/ticket_clover.svg",
    ticket: "클로버",
  },
  {
    id: 2,
    imgUrl: "/images/ticket_heart.svg",
    ticket: "하트",
  },
  {
    id: 3,
    imgUrl: "/images/ticket_dia.svg",
    ticket: "다이아",
  },
  {
    id: 4,
    imgUrl: "/images/ticket_spade.svg",
    ticket: "스페이드",
  },
];

const StudioInsert = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [timeDate, setTimeDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
    artistId: "",
    stageDescription: "",
    stageCombineId: "",
    stageCategoryId: "케이팝",
    stageTicketId: "클로버",
    stageAdultType: "N",
    staegStudioType: "S",
  });

  const { title, location, artistId, stageDescription, stageCombineId, stageCategoryId, stageTicketId, stageAdultType, staegStudioType } =
    inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const encodeFileToBase64 = (fileBlob) => {
    setImgUrl(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (imgUrl) {
      const formData = new FormData();

      formData.append("photo", imgUrl);

      try {
        const { data } = await axios.post(`http://172.30.1.72:8080/api/stage/stageImageInsert`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        data.response === 200 && window.alert("공연 등록 성공");
      } catch (e) {
        // 서버에서 받은 에러 메시지 출력
        console.log(e);
        window.alert("사진 등록 실패");
      }
    }

    const insertData = {
      userId: "test",
      stageTitle: title,
      stageImage: imgUrl.name.slice(0, -4),
      stageLocation: location,
      stageTimestamp: "2023-04-16 18:00:00",
      stageArtistId: artistId,
      stageDescription: stageDescription,
      stageCategoryId: stageCategoryId,
      stageTicketId: stageTicketId,
      stageAdultType: stageAdultType,
      stageStudioType: staegStudioType,
    };

    try {
      const { data } = await axios.post(`http://172.30.1.72:8080/api/stage/stageInsert`, insertData);
      console.log(data.response);
      data.response === 200 && window.alert("공연 등록 성공");
      navigate("/setting/studio");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e);
      window.alert("공연 등록 실패");
    }
  };

  return (
    <Container>
      <p>공연 등록</p>
      <form onSubmit={submit}>
        <Main>
          <Left>
            <p>공연 썸네일</p>
            <div className="camera"> {imageSrc && <Img src={imageSrc} alt="preview-img" width="520px" height="325px" />}</div>
            <div className="des">
              <span>사이즈 : 520*325px</span>
              <Label
                htmlFor="file"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              >
                <div> 파일 업로드</div>
              </Label>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
            </div>
          </Left>
          <Right>
            <Wrap>
              <span>공연 제목</span>
              <input placeholder="공연 기획사" name="title" onChange={onChange} value={title} />
            </Wrap>
            <Wrap>
              <StageCalendar>
                <div className="left">
                  <TimeTitle className="title">공연 일정</TimeTitle>
                  <StyledDatepicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                  />
                  {/* <input className="date" placeholder="YYYY/MM/DD" /> */}
                </div>
                <div className="right">
                  <TimeTitle className="title">공연 일정</TimeTitle>
                  <TimeDatepicker
                    selected={timeDate}
                    onChange={(date) => setTimeDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>
              </StageCalendar>
            </Wrap>
            <Wrap>
              <Title className="title">공연 장소</Title>
              <input placeholder="서울특별시 관악구 벽산아파트 301-906" name="location" onChange={onChange} value={location} />
            </Wrap>
            <Wrap>
              <Title className="title">참여 아티스트</Title>
              <input placeholder="공연 기획사" name="artistId" onChange={onChange} value={artistId} />
            </Wrap>
            <Wrap>
              <StageCalendar>
                <div className="left">
                  <TimeTitle className="title">공연 장르</TimeTitle>
                  <Select name="stageCategoryId" onChange={onChange} value={stageCategoryId}>
                    {music.map((item, index) => (
                      <option value={item.type} key={index}>
                        {item.type}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <TimeTitle className="title">티켓 종류</TimeTitle>
                  <Select name="stageTicketId" onChange={onChange} value={stageTicketId}>
                    {ticket.map((item, index) => (
                      <option value={item.ticket} key={index}>
                        {item.ticket}
                      </option>
                    ))}
                  </Select>
                </div>
              </StageCalendar>
            </Wrap>
            <Wrap>
              <StageCalendar>
                <div className="left">
                  <TimeTitle className="title">성인 콘텐츠 설정</TimeTitle>
                  <InputWrap>
                    <input type="radio" name="stageAdultType" value="Y" checked={stageAdultType === "Y"} onChange={onChange} />
                    <label>예</label>
                    <input type="radio" name="stageAdultType" value="N" checked={stageAdultType === "N"} onChange={onChange} />
                    <label>아니오</label>
                  </InputWrap>
                </div>
                <div>
                  <TimeTitle className="title">스튜디오</TimeTitle>
                  <InputWrap>
                    <input type="radio" name="staegStudioType" value="S" checked={staegStudioType === "S"} onChange={onChange} />
                    <label>단일 스튜디오</label>
                    <input type="radio" name="staegStudioType" value="M" checked={staegStudioType === "M"} onChange={onChange} />
                    <label>다중 스튜디오</label>
                  </InputWrap>
                  {staegStudioType === "M" && (
                    <StudioInput placeholder="공연 기획사명 입력" name="stageCombineId" onChange={onChange} value={stageCombineId} />
                  )}
                </div>
              </StageCalendar>
            </Wrap>
            <Wrap>
              <Title className="title">공연 설명</Title>
              <textarea placeholder="공연 설명 입력" name="stageDescription" onChange={onChange} value={stageDescription} />
            </Wrap>
            <ButtonWrap>
              <Link to="/setting/studio">
                <button className="cancel">취소</button>
              </Link>
              <button type="submit">등록</button>
            </ButtonWrap>
          </Right>
        </Main>
      </form>
    </Container>
  );
};

const StudioInput = styled.input`
  width: 100%;
  margin-top: 12px;
  font-size: 1rem;
`;

const InputWrap = styled.div`
  font-size: 1rem;
  > input {
    margin-right: 6px;
  }
  > label {
    :nth-child(2) {
      margin-right: 10px;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 100px;
  background: #d9d9d91a;
  color: #ffffff;
  padding: 0 12px;
  font-size: 1rem;
`;

const TimeDatepicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 100px;
  background: #d9d9d91a;
  color: #ffffff;
  padding: 0 12px;
`;

const StyledDatepicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 100px;
  background: #d9d9d91a;
  color: #ffffff;
  padding: 0 12px;
`;

const Img = styled.img`
  border-radius: 12px;
`;

const Label = styled.label`
  padding: 7px 12px 7px 42px;
  background: url("/images/setting/document.svg") no-repeat 10% center #273dff;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
`;

const StageCalendar = styled.div`
  display: flex;
  > div {
    width: 50%;
    &.left {
      margin-right: 24px;
    }
    > input {
      height: 40px;
      border: none;
      border-radius: 100px;
      background: #d9d9d91a;
      color: #ffffff;
      padding: 0 12px;
      &.date {
        width: 100%;
        margin-right: 24px;
      }
      &.time {
        width: 50%;
      }
    }
  }
`;

const TimeTitle = styled.div`
  font-size: 1rem;
  margin: 24px 0 12px;
`;

const Title = styled.div`
  margin-top: 24px;
  font-size: 1rem;
`;

const Wrap = styled.div`
  > span {
    font-size: 1rem;
  }
  > input {
    width: 100%;
    height: 40px;
    margin-top: 12px;
    padding: 0 12px;
    background: #d9d9d91a;
    border: none;
    border-radius: 100px;
    font-size: 1rem;
    color: #ffffff;
  }
  > textarea {
    margin-top: 12px;
    width: 100%;
    height: 160px;
    background: #d9d9d91a;
    border-radius: 12px;
    border: none;
    padding: 12px;
    resize: none;
    font-size: 1rem;
    color: #ffffff;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 24px;
  font-size: 1rem;
  > button {
    width: 50%;
    height: 60px;
    padding: 20px auto;
    border-radius: 200px;
    background: #273dff;
    &.cancel {
      margin-right: 24px;
      border: 1px solid #888888;
      background: #14141c;
    }
  }
`;

const Left = styled.div`
  width: 50%;
  margin-right: 24px;
  > p {
    font-size: 1rem;
    margin-bottom: 12px;
  }
  > div {
    > span {
      color: #c2c2c2;
      font-size: 1rem;
    }
    &.camera {
      max-width: 520px;
      height: 325px;
      background: url("/images/setting/setting_camera.svg") no-repeat center #d9d9d91a;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    &.des {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Right = styled.div`
  width: 50%;
  > p {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const Main = styled.div`
  margin-top: 22px;
  max-width: 1064px;
  display: flex;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  padding-top: 30px;
  > p {
    font-size: 1.25rem;
  }
`;

export default StudioInsert;
