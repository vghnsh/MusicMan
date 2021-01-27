import React,{useEffect,useState,useRef} from 'react';
import {useStateValue} from '../../StateProvider'; 
import 'antd/dist/antd.css';
import {Slider} from 'antd';
import {PlayCircleTwoTone,DeleteTwoTone,PauseCircleTwoTone } from '@ant-design/icons';
import styled from "styled-components";

function Player() {
  
  const player = useRef();

  const [,dispatch] =useStateValue();
  const [{currentMusic,music}]=useStateValue(); 

  const [url,setUrl]= useState();
  const [currentTime,setcurrentTime]=useState(null);
  const [duration, setDuration]= useState(null);
  const [volume, setVolume] = useState(35);

  const onVolumeChange = (value)=>{
    setVolume(value);
    player.current.volume=volume/100;
  }

  function usePrevious(data){
    const ref = useRef();
    useEffect(()=>{
      ref.current = data
    }, [data])
    return ref.current
  }
  const prevState = usePrevious(music);

  useEffect(()=>{
    function getTime(time) {
      if (!isNaN(time)) {
        return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
      }
    }
    player.current.addEventListener("timeupdate", e => {
      e.preventDefault();
      setcurrentTime(getTime(e.target.currentTime));
      setDuration(getTime(e.target.duration));
    },{passive: false});  
  },[currentTime,duration]);

  useEffect(()=>{
    if(currentMusic != null){
    setUrl(currentMusic?.previewUrl);
    player.current.load();    
    player.current.play();
      dispatch({
        type:"SET_MUSIC_STATE",
        music:'playing'
      })
    }
  },[currentMusic,dispatch]);
  
  useEffect(()=>{
    if (music === "paused") {
      player.current.pause();
    }
    if (music === "playing" && prevState === "paused") { 
      player.current.play();
    }
    if (music === "stop") {
      player.current.pause();
      dispatch({
        type:'SET_CURRENT_TIME',
        currentTime:0
      })
      dispatch({
        type:'SET_CURRENT_MUSIC',
        currentMusic:null
      })
    }
  },[dispatch,music,prevState]);
  
  return (
      <PlayerMain>
        {
          currentMusic !== null ?
            <Content>
              <Content>
                {music === "playing" ? (
                  <Title >
                    Now Playing {currentMusic?.collectionName}
                  </Title>) 
                : null}
                {music === "paused" ? (
                  <Title >
                    {currentMusic?.collectionName} is paused{" "}
                  </Title>) 
                : null}
                {music === "playing" ||
                music === "paused" ? (
                  <Row>
                    <Timer>
                      <Content>
                        {currentTime} / {duration}
                      </Content>
                    </Timer>    
                  </Row>) 
                  : (""
                )}
              </Content>
          
              <Row>
                {music === "paused" && (
                  <Btn>
                    <PlayCircleTwoTone 
                      onClick={() => dispatch({type:"SET_MUSIC_STATE" ,music: "playing" })}
                    />    
                  </Btn>
                )}
                {music === "playing" && (
                  <Btn>
                    <PauseCircleTwoTone 
                      onClick={() => dispatch({ type:"SET_MUSIC_STATE" ,music: "paused"  })}
                    /> 
                  </Btn>
                )}
                {music === "playing" ||
                music === "paused" ? (
                  <Btn>
                    <DeleteTwoTone     
                      onClick={() => dispatch({ type:"SET_MUSIC_STATE" ,music: "stop"  })}
                    />
                  </Btn>
                ) : null}
              </Row>
              <Content>
                {
                  music === "playing" ||
                  music === "paused" ?
                  <div>
                    <Vol>Volume</Vol>
                  <Slider  value={volume} onChange={onVolumeChange}  >
                    <div style={{padding:'6em',touchAction: 'none'}}></div>
                  </Slider>
                </div>
                :
                ''
              }  
            </Content>
          </Content>:
          ''
        }
        
        <audio ref={player}>
          <source src={url}/>
        </audio>
      </PlayerMain>   
  )
}

export default Player;

const PlayerMain = styled.div`
  display: flex;
  justify-content: space-evenly;
  width:100%;
  position: fixed;
  bottom: 0;
  background-color: rgba(192,192,192,0.9);
  @media screen and (max-width: 800px){
    display:flex;
    flex-direction:column;
  }`;

const Row = styled.div`
  display: flex; 
  justify-content: center;`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size:2em;
  font-family: 'Bree Serif', serif;`;

const Timer = styled.div`
  font-size:1.5em;
  padding-left: 2.5em;
  font-family: 'Bree Serif', serif;
  @media screen and (max-width: 800px){
    padding-left:0;
  }
`;
const Vol = styled.div`
  font-size:1.5em;
  font-family: 'Bree Serif', serif;
`;
const Btn = styled.div`
  font-size:3.5em;
  margin: 0 0.2em;
`;

const Content = styled.div`
  display:flex;
  align-items:center;
  @media screen and (max-width: 800px){
    display:flex;
    flex-direction:column;
  }
`; 