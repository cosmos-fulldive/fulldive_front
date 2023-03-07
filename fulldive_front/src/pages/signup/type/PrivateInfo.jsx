import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import {Link , useNavigate } from "react-router-dom";
import countries from "../../../components/countries.json";

import User from '../../../assets/images/signup/user.svg'
import Checkedimg from '../../../assets/images/signup/checked.svg'
import Areement_white from '../../../assets/images/signup/agreement_white.svg'
import Edit from '../../../assets/images/signup/edit.svg'
import Setting from '../../../assets/images/signup/setting.svg'
import Camera from '../../../assets/images/signup/camera.svg'


const menus = [
  {
    id: 1,
    name: "약관 동의",
    imgUrl: Areement_white,
  },
  {
    id: 2,
    name: "개인정보 입력",
    imgUrl: Edit,
  },
  // {
  //   id: 3,
  //   name: "좋아하는 장르",
  //   imgUrl: "/images/signup/music.svg",
  // },
  {
    id: 3,
    name: "가입 완료",
    imgUrl: Setting,
  },
];

const PrivateInfo = () => {

  const navigate = useNavigate();

  const userInfo = {
    email: sessionStorage.getItem('fullEmail'),
    password: sessionStorage.getItem('password'),
    Type: sessionStorage.getItem('type'),
    // Type : type,

  }

  console.log(userInfo);



  const [values, setValues] = useState({

    nickname: "",
    gender: "",
    name: "",
    brith: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    phoneCountry: "",

  });

  const { nickname, name, brith, country, city, address, phone, phoneCountry } = values;

  const [countryCode, setCountryCode] = useState("+82");

  // 국가 번호 데이터
  const countryOptions = countries.map((country) => (
    <option value={country.code} key={country.code}>
      {country.code}
    </option>
  ));

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };


  const [selected, setSelected] = useState("")


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

  // 이미지 url
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  console.log(file);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const nextUrl = () => {
    if (sessionStorage.getItem('password') === null) {
      alert("이메일 또는 비밀번호를 먼저 입력하세요")
      navigate("/signup")
    } else {




      const formData = new FormData();

      formData.append("photo", file)

      for (const value of formData.values("file")) {
        console.log(value);
      }

      sessionStorage.setItem('photo', formData.get("photo"));
      sessionStorage.setItem('userProfileImage', file.name)
      sessionStorage.setItem('Nickname', nickname)
      sessionStorage.setItem('Gender', genderSelected)
      sessionStorage.setItem('Name', name)
      sessionStorage.setItem('Brith', brith)
      sessionStorage.setItem('Country', country)
      sessionStorage.setItem('City', city)
      sessionStorage.setItem('Address', address)
      sessionStorage.setItem('Phone', phone)
      sessionStorage.setItem('phoneCountry', countryCode)

      navigate("/signup/type/favoriteMusic")

    }



  };

  const backUrl = () => {
    window.location.href = '/signup/type/agreement';
  }

  return (
    <Container>
      <Form >
        <Title>회원가입</Title>
        <Top>
          {menus.map((menu, id) => (
            <Menu key={id} imgUrl={menu.imgUrl}>
              <p>{menu.name}</p>
            </Menu>
          ))}
        </Top>

        <Main>
          <Ex>

            <Profile >

              <ImgBox>

                {
                  previewUrl === null
                    ? <Image src="/images/user.svg" />
                    : <PreviewImage src={previewUrl} />
                }
              </ImgBox>
              <ImgBox2>
                <label htmlFor="ex_file">
                  <div className="btnStart">
                    <Image2 src={"/images/signup/camera.svg"} />
                  </div>
                </label>
                <input
                  type="file"
                  id="ex_file"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={handleFileInputChange}
                />

                {/* <input type="image" src="/images/signup/camera.svg" alt="제출버튼"></input> */}

              </ImgBox2>
            </Profile>
          </Ex>
          <InputForm className="one">
            <Individual>
              <div>닉네임</div>
              <input name="nickname" type="text" className="nickname" placeholder="닉네임을 입력해주세요." value={nickname} onChange={onChangeValues} />
            </Individual>
            <Individual>
              <div>성별</div>
              <Gender>
                <input type="radio" name="남" value="남" checked={genderSelected === "남"} onChange={handleChange} />
                <label>남자</label>
                <input type="radio" name="여" value="여" checked={genderSelected === "여"} onChange={handleChange} />
                <label>여자</label>
              </Gender>
            </Individual>
          </InputForm>
          <InputForm className="second">
            <Individual>
              <div>이름</div>
              <input type="text" name="name" className="name" placeholder="이름을 입력해주세요." value={name} onChange={onChangeValues} />
            </Individual>
            <Individual>
              <div>생년월일</div>
              <input type="text" name="brith" className="date" placeholder="YYYY/MM/DD" value={brith} onChange={onChangeValues} />
            </Individual>
          </InputForm>
          <InputForm className="second">
            <Individual>
              <div>국가</div>
              <input type="text" name="country" className="name" placeholder="대한민국" value={country} onChange={onChangeValues} />
            </Individual>
            <Individual>
              <div>도시</div>
              <input type="text" name="city" className="date" placeholder="서울특별시" value={city} onChange={onChangeValues} />
            </Individual>
          </InputForm>
          <Individual>
            <input type="text" name="address" className="location" placeholder="상세주소를 입력하세요. (선택사항)" value={address} onChange={onChangeValues} />
          </Individual>

          <InputForm className="third">
            <InputFormText>
              <div>휴대전화</div>
            </InputFormText>
            <IndividualBox>

              <Individual className="ex1">
                {/* <input type="text" name="phoneCountry" className="name" placeholder="대한민국" value={phoneCountry} onChange={onChangeValues} /> */}
                <Selectt
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                >
                  {countryOptions}
                </Selectt>
              </Individual>

              <Individual className="ex2">
                <input type="text" name="phone" className="date" placeholder="010-0000-0000" value={phone} onChange={onChangeValues} />
              </Individual>

            </IndividualBox>
          </InputForm>
        </Main>
        <Bottom>
          <button onClick={backUrl} className="previous">이전</button>


          <button onClick={nextUrl} className="next">다음</button>
        </Bottom>
      </Form>
    </Container>
  );
};



const Ex = styled.div`
display : flex;
justify-content : center;
`;

const Profile = styled.div`
display : flex;

  margin-bottom: 35px;
  border-radius: 100px;
  background-color :  #28282F;
  width : 6.75rem;
  height : 6.75rem;
  position: relative;
`;

const ImgBox = styled.div`
display : flex;
width : 100%;
justify-content : center;
align-items: center;
`;


const Image = styled.img`
width : 60px;
height : 60px;
display : flex;
border-radius : 100px;

`;

const PreviewImage = styled.img`
width : 6.75rem;
  height : 6.75rem;
display : flex;
border-radius : 100px;

`;

const ImgBox2 = styled.div`
display : flex;
width : 36px;
height : 36px;
justify-content : center;
background-color : #273DFF;
border-radius : 100px;
align-items: center;
position: absolute;
left: 79px;
bottom: 0px;

label {
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const Image2 = styled.img`
width : 18px;
height : 18px;
display : flex;


`;

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

const Gender = styled.div`
  margin-top: 20px;
  > label {
    width: 95%;
    margin: 10px;
  }
`;

const InputFormText = styled.div`
  display : flex;
`;
const IndividualBox = styled.div`
  display : flex;
  gap : 24px;
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
  
  

  &.one {
    gap : 24px;
    
    
  }

  &.second {
    margin-top: 24px;
    gap : 24px;
    
  }

  &.third{
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

export default PrivateInfo;
