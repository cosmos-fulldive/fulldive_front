import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


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
  // {
  //   id: 3,
  //   name: "좋아하는 장르",
  //   imgUrl: "/images/signup/music.svg",
  // },
  {
    id: 3,
    name: "가입 완료",
    imgUrl: "/images/signup/setting.svg",
  },
];
const data = [
  {
    id: 1,
    description: "(필수) 개인정보약관에 동의합니다",
  },
  {
    id: 2,
    description: "(필수) 개인정보약관에 동의합니다",
  },
  {
    id: 3,
    description: "(선택) 개인정보약관에 동의합니다",
  },
  {
    id: 4,
    description: "(선택) 개인정보약관에 동의합니다",
  },
];

const Agreement = () => {

  const navigate = useNavigate();

  const userInfo = {
    email: sessionStorage.getItem('fullEmail'),
    password: sessionStorage.getItem('password'),
    Type: sessionStorage.getItem('type'),
    // Type : type,
  }

  const [checkItems, setCheckItems] = useState([1, 2]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const backUrl = () => {
    window.location.href = '/signup/type';
  }



  const nextUrl = () => {
    if (sessionStorage.getItem('password') === null) {
      alert("이메일 또는 비밀번호를 먼저 입력하세요")
      navigate("/signup")
    } else if (userInfo.Type === "아티스트") {
      navigate("/signup/type/artistInfo")
    }
    navigate("/signup/type/privateInfo")
  };


  return (
    <Container>
      <Form>
        <Title>약관 동의</Title>
        <Top>
          {menus.map((menu, id) => (
            <Menu key={id} imgUrl={menu.imgUrl}>
              <p>{menu.name}</p>
            </Menu>
          ))}
        </Top>
        <Main>
          <StyledTable>
            <thead>
              <tr>
                <th className="title">
                  <StyledInput
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                    checked={checkItems.length === data.length ? true : false}
                  />
                </th>
                <th className="agreement">약관 전체 동의하기</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, key) => (
                <StyledTr
                  key={key}
                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                  confirmed={checkItems.includes(data.id) ? true : false}
                >
                  <td className="first-row">
                    <StyledInput
                      type="checkbox"
                      name={`select-${data.id}`}
                      onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                      // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                      checked={checkItems.includes(data.id) ? true : false}
                    />
                  </td>
                  <td className="second-row">{data.description}</td>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </Main>
        <Bottom>
          <button onClick={backUrl} className="previous">이전</button>


          <button onClick={nextUrl} className="next">다음</button>


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

const StyledTr = styled.tr`
  margin-bottom: 10px;
  ${({ confirmed }) => confirmed && `background-color: #14141C;`}
  > td {
    border: 1px solid #0f0f15;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    &.first-row {
      padding: 15px 10px 15px 24px;
      ${({ confirmed }) => !confirmed && `border-right-style: none;`}
    }
    &.second-row {
      width: auto;
      padding: 13px 10px 17px 25px;
      text-align: left;
      font-size: 1rem;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      ${({ confirmed }) => !confirmed && `border-left-style: none;`}
    }
    ${({ confirmed }) =>
    !confirmed
      ? `border: 2px solid #2435C0;`
      : `background-color: #0f0f15;
    `}
  }
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100px;
  background-image: url("/images/signup/checked.svg");
  background-size: 70% 70%;
  background-position: 50% 60%;
  background-repeat: no-repeat;
  background-color: #5c5c5c;
  &:checked {
    border-color: transparent;
    background-image: url("/images/signup/checked.svg");
    background-color: #273dff;
  }
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0 24px;
  table-layout: fixed;
  width: 100%;
  thead {
    tr {
      th {
        color: #fff;
        font-weight: 700;
        &.title {
          text-align: left;
          width: 40px;
        }
        &.agreement {
          text-align: left;
          padding: 10px 0;
        }
      }
    }
  }
`;

const Main = styled.div`
  margin-top: 110px;
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

export default Agreement;
