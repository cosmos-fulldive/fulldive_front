import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainTop = () => {
  const token = useSelector((state) => state.Auth.token);

  const onClickLogout = () => {
    window.localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      {token === "Test" ? (
        <Header>
          <Logo>
            <Link to="/">FullDive</Link>
          </Logo>
          <Search>
            {/* <SearchBar placeholder="검색어를 입력해주세요" /> */}
            <div></div>
            <RightBar>
              <div>
                <img src="/images/more.svg" />
                <img className="donation" src="/images/donation.svg" />
                {/* <img src="/images/notification.svg" />
                <img src="/images/ranking.svg" /> */}
              </div>
              <LogoutButton  onClick={onClickLogout}>
              
                    <img src="/images/artist.png" />
                  
              </LogoutButton>
            </RightBar>
          </Search>
        </Header>
      ) : (
        <Header>
          <Logo>
            <Link to="/">FullDive</Link>
          </Logo>
          <Search>
            {/* <SearchBar placeholder="검색어를 입력해주세요" /> */}
            <RightBar>
              <div>
                <img src="/images/more.svg" />
                <img src="/images/donation.svg" />
                {/* <img src="/images/notification.svg" />
                <img src="/images/ranking.svg" /> */}
              </div>
              <Link to="/login">
                <LoginButton>로그인</LoginButton>
              </Link>
            </RightBar>
          </Search>
        </Header>
      )}
    </>
  );
};

const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: #181820;
  display: flex;
  color: #ffffff;
  align-items: center;
  z-index: 100;
`;

const Logo = styled.div`
  min-width: 250px;
  padding-left: 40px;
  font-size: 1.5rem;
  /* background: url("/images/logo.svg") no-repeat 15% 50%; */
`;

const Search = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-end;
`;

const SearchBar = styled.input`
  background: url("/images/search.svg") no-repeat 20px 50% #21212b;
  width: 360px;
  border-radius: 100px;
  border: none;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 400;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 55px;
`;

const RightBar = styled.div`
  padding-right: 30px;
  display: flex;
  align-items: center;
  > div {
    > img {
      margin-right: 20px;
      
    }
    
  }
`;

const LoginButton = styled.button`
  width: 5rem;
  background: #273dff;
  border-radius: 100px;
  font-size: 1rem;
  /* margin-left: 10px; */
  padding: 10px;
`;

const LogoutButton = styled.button`
 
 
  /* background: #273dff; */
  border-radius: 100px;
  /* font-size: 1rem; */
  /* margin-left: 10px; */
  /* padding: 10px; */
  > img {
    width: 3rem;
 height: 3rem;
 border-radius: 100px;
  }
`;



export default MainTop;
