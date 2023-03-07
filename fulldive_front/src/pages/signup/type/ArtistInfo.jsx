import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import countries from "../../../components/countries.json";

const menus = [
  {
    id: 1,
    name: "약관 동의",
    imgUrl: "/images/signup/agreement_white.svg",
  },
  {
    id: 2,
    name: "개인정보 입력",
    imgUrl: "/images/signup/edit.svg",
  },
  {
    id: 3,
    name: "가입요청완료",
    imgUrl: "/images/signup/setting.svg",
  },
];

const ArtistInfo = () => {

  const navigate = useNavigate();

  const userInfo = {
    artistEmail: sessionStorage.getItem("fullEmail"),
    artistPassword: sessionStorage.getItem("password"),
  };

  const [values, setValues] = useState({
    artistname: "",
    name: "",
    genre: "",
    debutdate: "",
    agency: "",
    member: "",
    membername: "",
    phone: "",
    phoneCountry: "",
  });

  const { artistname, name, genre, debutdate, agency, member, membername, phone, phoneCountry } = values;

  const [countryCode, setCountryCode] = useState("+82");

  // 국가 번호 데이터
  const countryOptions = countries.map((country) => (
    <option value={country.code} key={country.code}>
      {country.code}
    </option>
  ));

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const [selected, setSelected] = useState("");

  const onChangeValues = (e) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    setSelected(e.target.value);
  };

  const [genderSelected, setgenderSelected] = useState("남");

  const handleChange = (e) => {
    setgenderSelected(e.target.value);
  };

  const [AgencySelected, setAgencySelected] = useState("유");

  const handleAgencyChange = (e) => {
    setAgencySelected(e.target.value);
  };

  const backUrl = () => {
    window.location.href = "/signup/type/agreement";
  };

  const nextUrl = async () => {
    if (sessionStorage.getItem("password") === null) {
      alert("이메일 또는 비밀번호를 먼저 입력하세요");
      navigate("/signup");
    } else {
      // sessionStorage.setItem('회원유형', )

      // const formData = new FormData();

      // formData.append("artistEmail", userInfo.email);
      // formData.append("artistPassword", userInfo.password);
      // formData.append("artistName", artistname);
      // formData.append("artistGender", genderSelected);
      // formData.append("artistPhone", phone);
      // formData.append("artistBirth", debutdate);
      // formData.append("artistCompany", agency);
      // formData.append("artistCategory", genre);
      // formData.append("artistMember", membername);

      // sessionStorage.setItem('artistname', artistname)
      // sessionStorage.setItem('Gender', genderSelected)
      // sessionStorage.setItem('Name', name)
      // sessionStorage.setItem('genre', genre)
      // sessionStorage.setItem('debutdate', debutdate)
      // sessionStorage.setItem('agency', agency)
      // sessionStorage.setItem('member', member)
      // sessionStorage.setItem('Phone', phone)
      // sessionStorage.setItem('phoneCountry', phoneCountry)
      // sessionStorage.setItem('membername', membername)

      try {
        const { data } = await axios({
          method: "post",
          url: "http://fulldive.live:8880/api/artist/join",
          data: {
            artistEmail: userInfo.artistEmail,
            artistPassword: userInfo.artistPassword,
            artistName: artistname,
            artistGender: genderSelected,
            artistPhone: phone,
            artistBirth: debutdate,
            artistCompany: agency,
            artistCategory: genre,
            artistMember: membername,
          },
        });
        console.log(data.response);
        data.response === 200 && window.alert("회원가입 성공");
        navigate("/signup/type/artistComplete");
      } catch (e) {
        // 서버에서 받은 에러 메시지 출력
        console.log(e);
        window.alert("회원가입 실패");
      }
    }
  };

  return (
    <Container>
      <Form>
        <Title>아티스트 정보입력</Title>
        <Top>
          {menus.map((menu, id) => (
            <Menu key={id} imgUrl={menu.imgUrl}>
              <p>{menu.name}</p>
            </Menu>
          ))}
        </Top>
        <Main>
          <InputForm className="one">
            {/* 아티스트명 */}
            <Individual>
              <div>아티스트명</div>
              <input
                name="artistname"
                type="text"
                className="artistname"
                placeholder="아티스트 이름을 입력해주세요."
                value={artistname}
                onChange={onChangeValues}
              />
            </Individual>

            {/* 성별 */}
            <Individual>
              <div>성별</div>
              <Gender>
                <input type="radio" name="남" value="남" checked={genderSelected === "남"} onChange={handleChange} />
                <label>남자</label>
                <input type="radio" name="여" value="여" checked={genderSelected === "여"} onChange={handleChange} />
                <label>여자</label>
                <input type="radio" name="혼" value="혼" checked={genderSelected === "혼"} onChange={handleChange} />
                <label>혼성</label>
              </Gender>
            </Individual>
          </InputForm>

          <InputForm className="second">
            {/* 장르 */}
            <Individual>
              <div>장르</div>
              <input
                type="text"
                name="genre"
                className="genre"
                placeholder="장르를 입력해주세요."
                value={genre}
                onChange={onChangeValues}
              />
            </Individual>

            {/* 데뷔일 */}
            <Individual>
              <div>데뷔일</div>
              <input
                type="text"
                name="debutdate"
                className="debutdate"
                placeholder="YYYY/MM/DD"
                value={debutdate}
                onChange={onChangeValues}
              />
            </Individual>
          </InputForm>

          <InputForm className="third">
            <InputFormAgText>
              <div>소속사 유무</div>
            </InputFormAgText>

            <IndividualAgBox>
              {/* 소속사 유무 */}
              <Individual>
                <Agency>
                  <input type="radio" name="유" value="유" checked={AgencySelected === "유"} onChange={handleAgencyChange} />
                  <label>유</label>

                  <input type="radio" name="무" value="무" checked={AgencySelected === "무"} onChange={handleAgencyChange} />
                  <label>무</label>
                </Agency>
              </Individual>

              {/* 소속사 */}

              <Individual>
                {AgencySelected === "유" && (
                  <input type="text" name="agency" className="agency" placeholder="00소속사" value={agency} onChange={onChangeValues} />
                )}
              </Individual>
            </IndividualAgBox>
          </InputForm>

          <InputForm className="member">
            {/* 멥버수 */}
            <Individual>
              <div>맴버수</div>
              <input type="text" name="member" className="member" placeholder="4" value={member} onChange={onChangeValues} />
            </Individual>

            <Individual>
              <div>멤버</div>
              <input
                type="text"
                name="membername"
                className="name"
                placeholder="멤버 이름를 작성해주세요"
                value={membername}
                onChange={onChangeValues}
              />
            </Individual>
          </InputForm>

          <InputForm className="third">
            {/* 휴대전화 */}
            <InputFormText>
              <div>휴대전화</div>
            </InputFormText>

            <IndividualBox>
              {/* 국가코드 */}
              <Individual className="ex1">
                <Selectt value={countryCode} onChange={handleCountryCodeChange}>
                  {countryOptions}
                </Selectt>
              </Individual>

              {/* 번호 */}
              <Individual className="ex2">
                <input type="text" name="phone" className="phone" placeholder="010-0000-0000" value={phone} onChange={onChangeValues} />
              </Individual>
            </IndividualBox>
          </InputForm>
        </Main>
        <Bottom>
          <button onClick={backUrl} className="previous">
            이전
          </button>

          <button onClick={nextUrl} className="next">
            다음
          </button>
        </Bottom>
      </Form>
    </Container>
  );
};

const Selectt = styled.select`
  width: 100%;
  text-align: left;

  margin-top: 10px;
  border: none;
  background-color: #d9d9d91a;
  border-radius: 100px;
  color: #ffffff;
  padding: 0 10px;
  font-size: 1rem;
  width: 100%;
  height: 40px;
  &.location {
    width: 100%;
  }
`;

const InputFormAgText = styled.div`
  display: flex;
`;
const IndividualAgBox = styled.div`
  display: flex;
  gap: 24px;
`;

const Gender = styled.div`
  margin-top: 20px;
  > label {
    width: 95%;
    margin: 10px;
  }
`;
const Agency = styled.div`
  margin-top: 13px;
  > label {
    width: 95%;
    margin: 10px;
  }
`;

const InputFormText = styled.div`
  display: flex;
`;
const IndividualBox = styled.div`
  display: flex;
  gap: 24px;
`;

const Individual = styled.div`
  width: 100%;
  text-align: left;
  > input {
    margin-top: 10px;
    border: none;
    background-color: #d9d9d91a;
    border-radius: 100px;
    color: #ffffff;
    padding: 0 10px;
    font-size: 1rem;
    width: 100%;
    height: 40px;
    &.location {
      width: 100%;
    }
  }

  &.ex1 {
    flex: 0.4;
  }

  &.ex2 {
    flex: 2;
  }
`;

const InputForm = styled.div`
  display: flex;

  margin-top: 24px;

  &.one {
    gap: 24px;
  }

  &.member {
    margin-top: 24px;
    gap: 24px;
  }

  &.second {
    margin-top: 24px;
    gap: 24px;
  }

  &.third {
    display: flex;
    margin-top: 24px;
    flex-direction: column;
  }
`;

const Main = styled.div`
  margin-top: 100px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 10% auto;
  > button {
    width: 50%;
    border-radius: 200px;
    font-size: 1rem;
    &.previous {
      border: 1px solid #888888;
    }
    &.next {
      background-color: #273dff;
      margin-left: 24px;
    }
  }
`;

const Menu = styled.div`
  position: relative;
  border: 1px solid #262667;
  border-radius: 100px;
  min-width: 112px;
  height: 48px;
  background: ${(props) => `url(${props.imgUrl}) no-repeat center`};
  ${(props) =>
    props.imgUrl === "/images/signup/agreement_white.svg" &&
    `
      border: 2px solid #273DFF; 
      background-color: #273DFF;     
  `}
  ${(props) =>
    props.imgUrl === "/images/signup/edit.svg" &&
    `
      border: 2px solid #273DFF; 
  `}
  > p {
    width: 100%;
    position: absolute;
    top: 60px;
    text-align: center;
    font-size: 1rem;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 24px;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Form = styled.div`
  max-width: 520px;
  margin: 36px auto;
  text-align: center;
`;

const Container = styled.div`
  display: inline-block;
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100%;
  background: #14141c;
  color: #ffffff;
`;

export default ArtistInfo;
