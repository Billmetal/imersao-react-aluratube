import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../config.json"
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import banner from "../src/assets/banner-sec.jpeg";
import videoService from "../src/services/videoService";

function HomePage({ loadVid }) {
  const estilosHomePage = { 
    display: "flex",
    flexDirection: "column",
    flex: 1
   };

   const service = videoService();
   const [valorDoFiltro, setValorDoFiltro] = useState("");
   const [playlists, setPlaylists] = useState({});

   function loadVideos(){
    service.getAllVideos().then((dados) => {
      const categorias = {};
      
      dados.data.forEach((video) => {       
        if(!categorias[video.playlist]) categorias[video.playlist] = [];
          categorias[video.playlist] = [
            video,
            ...categorias[video.playlist],
          ];
      });
      
      setPlaylists(categorias);
    }).catch((err) => alert("Erro : ",err));
   }

   useEffect(() => {
    loadVideos();
   }, [loadVid]);

    return (
      <>
        <div style={estilosHomePage} >
          <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
          <Header />
          <Timeline searchValue={valorDoFiltro} playlists={playlists} ></Timeline>
        </div>
      </>
    );
  }
  
  export default HomePage;

  const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
  `;

  const StyledBanner = styled.div`
    background-image: url(${banner.src});
    height: 280px;
    //background-color: blue;
  `;

  function Header(){
    return(
      <StyledHeader>
        <StyledBanner />
        <section className="user-info">
          <img src={`https://github.com/${config.github}.png`} />
          <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </section>
      </StyledHeader>
    );
  }

  function Timeline({searchValue, ...props}){
    const playlistNames = Object.keys(props.playlists);

    return(
      <StyledTimeline>
        {playlistNames.map((playlistName,index) => {
          const videos = props.playlists[playlistName];
          return(
            <section key={`sec-${index}`}>
              <h2>{playlistName}</h2>
              <div>
                {videos.filter((video) => {
                  return video.title.toLowerCase().includes(searchValue.toLowerCase());
                }).map((video,index) => {
                  return(
                    <a key={`vid-${index}`} href={video.url} target="_blank">
                      <img src={video.thumb}/>
                      <span>{video.title}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
    );
  }