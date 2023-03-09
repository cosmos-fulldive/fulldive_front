import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ArtistModal from "../../components/modal/ArtistModal";

const Artist = () => {
  const [artistData, setArtistData] = useState(null);
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    getArtistData();
  }, []);

  const getArtistData = async () => {
    await axios.get(`http://118.63.182.3:8880/api/artist/findAllCreateArtistList`).then((res) => setArtistData(res.data));
  };

  const openArtistModal = (artist) => {
    setSelectedArtist(artist);
    setArtistModalOpen(true);
  };

  const closeArtistModal = () => {
    setArtistModalOpen(false);
    setSelectedArtist(null);
  };

  return (
    <Container>
      <Top>
        <div>아티스트</div>
        <div>정렬</div>
      </Top>
      <Main>
        {artistData &&
          artistData.artistList.map((artist, index) => (
            <ArtistWrapper onClick={() => openArtistModal(artist)}>
              <ArtistImage src={`http://fulldive.live:8881/artist_images/${artist.artistImage}`} width="100%" />
              <Description>
                <img src={`http://fulldive.live:8881/artist_images/${artist.artistImage}`} width="30px" height="30px" />
                <div>
                  {artist.artistName}
                  <p>{artist.artistCategory}</p>
                </div>
              </Description>
            </ArtistWrapper>
          ))}
        <ArtistModal visible={artistModalOpen} onClose={closeArtistModal} data={selectedArtist} />
      </Main>
    </Container>
  );
};

const ArtistImage = styled.img`
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

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
  cursor: pointer;
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
