import React, { useEffect, useState, useRef } from 'react';
import { useStateValue } from '../../StateProvider';
import styled from "styled-components";

function Player() {
  const player = useRef();
  const [, dispatch] = useStateValue();
  const [{ currentMusic, music }] = useStateValue();

  const [url, setUrl] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  function usePrevious(data) {
    const ref = useRef();
    useEffect(() => { ref.current = data; }, [data]);
    return ref.current;
  }
  const prevState = usePrevious(music);

  const fmt = (t) =>
    isNaN(t) ? "0:00" : `${Math.floor(t / 60)}:${("0" + Math.floor(t % 60)).slice(-2)}`;

  useEffect(() => {
    const audio = player.current;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, []);

  useEffect(() => {
    if (currentMusic != null) {
      const previewUrl = currentMusic?.previewUrl;
      setUrl(previewUrl);
      player.current.src = previewUrl;
      player.current.load();
      player.current.play();
      dispatch({ type: "SET_MUSIC_STATE", music: 'playing' });
    }
  }, [currentMusic, dispatch]);

  useEffect(() => {
    if (music === "paused") player.current.pause();
    if (music === "playing" && prevState === "paused") player.current.play();
    if (music === "stop") {
      player.current.pause();
      dispatch({ type: 'SET_CURRENT_TIME', currentTime: 0 });
      dispatch({ type: 'SET_CURRENT_MUSIC', currentMusic: null });
    }
  }, [dispatch, music, prevState]);

  const onVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    player.current.volume = val / 100;
  };

  const onSeek = (e) => {
    const val = Number(e.target.value);
    player.current.currentTime = val;
    setCurrentTime(val);
  };

  return (
    <>
      {currentMusic && (
        <PlayerBar>
          <NowPlaying>
            <ArtThumb src={currentMusic?.artworkUrl100} alt="" />
            <TrackInfo>
              <TrackTitle>{currentMusic?.collectionName}</TrackTitle>
              <TrackArtist>{currentMusic?.artistName || currentMusic?.artistName || ''}</TrackArtist>
            </TrackInfo>
          </NowPlaying>

          <Center>
            <Controls>
              {music === "playing" ? (
                <CtrlBtn onClick={() => dispatch({ type: "SET_MUSIC_STATE", music: "paused" })} title="Pause">
                  ⏸
                </CtrlBtn>
              ) : (
                <CtrlBtn onClick={() => dispatch({ type: "SET_MUSIC_STATE", music: "playing" })} title="Play">
                  ▶
                </CtrlBtn>
              )}
              <StopBtn onClick={() => dispatch({ type: "SET_MUSIC_STATE", music: "stop" })} title="Stop">■</StopBtn>
            </Controls>
            <ProgressWrap>
              <TimeLabel>{fmt(currentTime)}</TimeLabel>
              <ProgressSlider
                type="range"
                min={0}
                max={duration || 0}
                step={0.5}
                value={currentTime}
                onChange={onSeek}
                pct={duration > 0 ? (currentTime / duration) * 100 : 0}
              />
              <TimeLabel>{fmt(duration)}</TimeLabel>
            </ProgressWrap>
            <StatusBadge playing={music === "playing"}>
              {music === "playing" ? "● Now Playing" : "Paused"}
            </StatusBadge>
          </Center>

          <VolumeWrap>
            <VolumeIcon>{volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}</VolumeIcon>
            <VolumeSlider type="range" min={0} max={100} value={volume} onChange={onVolumeChange} />
            <VolumeLabel>{volume}%</VolumeLabel>
          </VolumeWrap>
        </PlayerBar>
      )}
      <audio ref={player}><source src={url} /></audio>
    </>
  );
}

export default Player;

const PlayerBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: #f0eefb;
  border-top: 1px solid #e8e6f4;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
  z-index: 300;
`;

const NowPlaying = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;
  flex: 1;
`;

const ArtThumb = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #e8e6f4;
`;

const TrackInfo = styled.div` overflow: hidden; `;

const TrackTitle = styled.div`
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`;

const TrackArtist = styled.div`
  font-size: 0.73rem;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex: 2;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const CtrlBtn = styled.button`
  background: #7c3aed;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
  &:hover { background: #6d28d9; transform: scale(1.05); }
`;

const StopBtn = styled.button`
  background: transparent;
  border: 1px solid #e0deee;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  color: #aaa;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover { border-color: #fca5a5; color: #ef4444; }
`;

const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
`;

const ProgressSlider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    #7c3aed ${({ pct }) => pct || 0}%,
    #e0deee ${({ pct }) => pct || 0}%
  );
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #7c3aed;
    cursor: pointer;
  }
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  color: #bbb;
  min-width: 32px;
  text-align: center;
`;

const StatusBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: ${({ playing }) => (playing ? "#7c3aed" : "#bbb")};
  letter-spacing: 0.04em;
`;

const VolumeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: flex-end;
  min-width: 160px;
`;

const VolumeIcon = styled.span` font-size: 0.95rem; `;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 80px;
  height: 4px;
  border-radius: 2px;
  background: #e0deee;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #7c3aed;
    cursor: pointer;
  }
`;

const VolumeLabel = styled.span`
  font-size: 0.7rem;
  color: #bbb;
  min-width: 28px;
`;
