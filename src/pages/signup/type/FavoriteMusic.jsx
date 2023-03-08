import React, { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import axios from "axios";

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
    name: "좋아하는 장르",
    imgUrl: "/images/signup/music.svg",
  },
  {
    id: 4,
    name: "가입 완료",
    imgUrl: "/images/signup/setting.svg",
  },
];

const music = [
  {
    category_code: "KPO",
    category_name_kr: "케이팝",
    category_name_en: "KPOP",
    category_name_jp: "???",
    category_sequence: 1,
  },
  {
    category_code: "RNB",
    category_name_kr: "알앤비",
    category_name_en: "R&B",
    category_name_jp: "???",
    category_sequence: 2,
  },
  {
    category_code: "RMT",
    category_name_kr: "락/메탈",
    category_name_en: "METAL",
    category_name_jp: "???",
    category_sequence: 3,
  },
  {
    category_code: "POP",
    category_name_kr: "팝",
    category_name_en: "POP",
    category_name_jp: "???",
    category_sequence: 4,
  },
  {
    category_code: "ELE",
    category_name_kr: "일렉트로닉",
    category_name_en: "Electronic",
    category_name_jp: "???",
    category_sequence: 5,
  },
  {
    category_code: "ALT",
    category_name_kr: "얼터너티브",
    category_name_en: "Alternative",
    category_name_jp: "???",
    category_sequence: 6,
  },
  {
    category_code: "JPO",
    category_name_kr: "제이팝",
    category_name_en: "JPOP",
    category_name_jp: "???",
    category_sequence: 7,
  },
  {
    category_code: "BAL",
    category_name_kr: "발라드",
    category_name_en: "Ballad",
    category_name_jp: "???",
    category_sequence: 8,
  },
  {
    category_code: "JAZ",
    category_name_kr: "재즈",
    category_name_en: "Jazz",
    category_name_jp: "???",
    category_sequence: 9,
  },
  {
    category_code: "COU",
    category_name_kr: "컨트리",
    category_name_en: "Country",
    category_name_jp: "???",
    category_sequence: 10,
  },
  {
    category_code: "HIP",
    category_name_kr: "힙합",
    category_name_en: "Hip-hop",
    category_name_jp: "???",
    category_sequence: 11,
  },
  {
    category_code: "FUN",
    category_name_kr: "펑크",
    category_name_en: "Funk",
    category_name_jp: "???",
    category_sequence: 12,
  },
  {
    category_code: "MET",
    category_name_kr: "메탈",
    category_name_en: "Metal",
    category_name_jp: "???",
    category_sequence: 13,
  },
  {
    category_code: "DAN",
    category_name_kr: "댄스",
    category_name_en: "Dance",
    category_name_jp: "???",
    category_sequence: 14,
  },
  {
    category_code: "CLA",
    category_name_kr: "클래식",
    category_name_en: "Classic",
    category_name_jp: "???",
    category_sequence: 15,
  },
  {
    category_code: "EDM",
    category_name_kr: "이디엠",
    category_name_en: "EDM",
    category_name_jp: "???",
    category_sequence: 16,
  },
  {
    category_code: "REG",
    category_name_kr: "레게",
    category_name_en: "Reggae",
    category_name_jp: "???",
    category_sequence: 17,
  },
  {
    category_code: "IND",
    category_name_kr: "인디",
    category_name_en: "Indie",
    category_name_jp: "???",
    category_sequence: 18,
  },
];

const FavoriteMusic = () => {
  const userInfo = {
    userEmail: sessionStorage.getItem("fullEmail"),
    userPassword: sessionStorage.getItem("password"),
    userNickname: sessionStorage.getItem("Nickname"),
    userGender: sessionStorage.getItem("Gender"),
    userName: sessionStorage.getItem("Name"),
    userBirth: sessionStorage.getItem("Brith"),
    userNation: sessionStorage.getItem("Country"),
    userCity: sessionStorage.getItem("City"),
    userAddress: sessionStorage.getItem("Address"),
    userPhone: sessionStorage.getItem("Phone"),
  };

  const [selectedGenres, setSelectedGenres] = useState > [];

  const numChecked = selectedGenres.filter((isSelected) => isSelected).length;

  const handleGenreClick = (name) => {
    if (selectedGenres.includes(name)) {
      setSelectedGenres(selectedGenres.filter((music) => music !== name));
    } else if (numChecked >= 3) {
      alert("You cannot check more than 3 checkboxes!");
      return;
    } else {
      setSelectedGenres([...selectedGenres, name]);
    }
  };

  const nextUrl = async () => {
    if (sessionStorage.getItem("password") === null) {
      alert("이메일 또는 비밀번호를 먼저 입력하세요");
      Router.push("/signup");
    } else if (numChecked < 3) {
      alert("You must check 3 checkboxes!");
    } else {
      try {
        const { data } = await axios.post(`http://118.63.182.3:8880/api/user/join`, userInfo);
        console.log(data.response);
        data.response === 200 && window.alert("회원가입 성공");
        Router.push("/signup/type/signupComplete");
      } catch (e) {
        // 서버에서 받은 에러 메시지 출력
        console.log(e);
        window.alert("회원가입 실패");
      }
    }
  };

  const backUrl = () => {
    window.location.href = "/signup/type";
  };

  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <Top>
          {menus.map((menu, id) => (
            <Menu key={id} imgUrl={menu.imgUrl}>
              <p>{menu.name}</p>
            </Menu>
          ))}
        </Top>
        <Main>
          <Profile>
            좋아하는 장르<span>*복수선택 3가지 가능</span>
          </Profile>
          <MusicBox>
            {music.map((music, index) => (
              <MusicCheck
                key={index}
                isSelected={selectedGenres.includes(music.category_name_kr)}
                onClick={() => handleGenreClick(music.category_name_kr)}
              >
                {music.category_name_kr}
              </MusicCheck>
            ))}
          </MusicBox>
        </Main>

        <Bottom>
          <button onClick={backUrl} className="previous">
            이전
          </button>

          <button type="submit" onClick={nextUrl} className="next">
            다음
          </button>
        </Bottom>
      </Form>
    </Container>
  );
};

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 15% auto 10%;
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

const MusicBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    display: block;
    width: 30%;
    margin-bottom: 12px;
    padding: 16px 30px;

    border-radius: 100px;
    color: #cacaca;
  }
`;
const MusicCheck = styled.div`
  display: block;
  width: 30%;
  margin-bottom: 12px;
  padding: 16px 30px;
  // border: 1px solid #9a9a9a;
  border-radius: 100px;
  color: #cacaca;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "blue" : "transparent")};

  border: ${(props) => (props.isSelected ? "none" : "1px solid #9a9a9a")};
`;

const Profile = styled.div`
  text-align: left;
  margin-bottom: 24px;
  > span {
    margin-left: 8px;
    font-size: 0.875rem;
    color: #c6c6c6;
  }
`;

const Main = styled.div`
  margin-top: 100px;
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
    background-color: #273DFF;   
  `}
  ${(props) =>
    props.imgUrl === "/images/signup/music.svg" &&
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
  justify-content: space-between;
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

export default FavoriteMusic;
