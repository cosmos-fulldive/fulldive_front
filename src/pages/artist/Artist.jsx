import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const artists = [
  {
    id: 1,
    imgUrl: "/images/artist.png",
    artist_img: "/images/artist.png",
    name: "아이유",
    category: "메탈, 발라드",
    link: "",
  },
  {
    id: 2,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 3,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 4,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 5,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 6,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 7,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 8,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 9,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 10,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 11,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 12,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 13,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 14,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 15,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 16,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 17,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
  {
    id: 18,
    imgUrl: "/images/artist.png",
    artist_img: "/images/sample.png",
    name: "아이유",
    category: "장르",
    link: "",
  },
];

const Artist = () => {
  return (
    <Container>
      <Top>
        <div>아티스트</div>
        <div>정렬</div>
      </Top>
      <Main>
        {artists.map((artist, index) => (
            <ArtistWrapper>
          <Link to={artist.link} key={index}>
              <img src={artist.imgUrl} width="100%" />
              <Description>
                <img src={artist.artist_img} width="30px" height="30px" />
                <div>
                  {artist.name}
                  <p>{artist.category}</p>
                </div>
              </Description>
          </Link>
            </ArtistWrapper>
        ))}
      </Main>
    </Container>
  );
};

const Description = styled.div`
  display: flex;
  padding: 10px;
  > img {
    border-radius: 100px;
  }
  > div {
    padding-left: 8px;
    > p {
      font-size: 1rem;
      color: #a0a0a0;
    }
  }
`;

const ArtistWrapper = styled.div`
  display: block;
  width: 15%;
  margin-bottom: 12px;
  border-radius: 12px;
  background: #21212b;
`;

const Main = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.main`
  width: calc(100vw - 250px);
  margin-left: 250px;
  height: 100vh;
  background: #14141c;
  color: #ffffff;
  padding: 30px;
  padding-top: 30px;
`;

export default Artist;
