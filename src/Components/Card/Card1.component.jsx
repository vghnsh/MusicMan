import React from 'react';
import dateFormat from 'dateformat';
import { useStateValue } from '../../StateProvider';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { db } from '../../firebase';
import './Card1.css';

function Card1({ data }) {
  const [, dispatch] = useStateValue();
  const [{ user, isSign, trackId }] = useStateValue();

  const setCurrentMusic = () => {
    dispatch({ type: "SET_CURRENT_MUSIC", currentMusic: data });
  };

  const addToFav = (e) => {
    e.stopPropagation();
    if (isSign) {
      if (db.collection('users').onSnapshot((snapshot) =>
        (snapshot.docs.map((doc) => (doc.uid !== user?.uid)))))
      {
        db.collection('users').doc(user?.uid).set({ uname: user?.displayName });
      }
      db.collection('users').doc(user?.uid).collection('fav').doc().set({
        imageUrl: data.artworkUrl100,
        title: data.collectionName,
        date: data.releaseDate,
        trackId: data.trackId,
        currentMusic: data,
      });
    } else {
      alert('Please log in to use that feature');
    }
  };

  const isFav = trackId.includes(data.trackId);
  let dateStr = '';
  try { dateStr = dateFormat(data.releaseDate, "mmm yyyy"); } catch (e) {}

  return (
    <div className="music-card">
      <div className="card-art-wrap">
        <img alt={data.collectionName} src={data.artworkUrl100} />
        <div className="card-overlay">
          <button className="play-btn-big" onClick={setCurrentMusic}>▶</button>
        </div>
      </div>

      <div className="card-info">
        <div className="card-title">{data.collectionName}</div>
        <div className="card-artist">{data.artistName || ''}</div>
        <div className="card-date">{dateStr}</div>
      </div>

      <div className="card-actions">
        <button
          className={`fav-btn${isFav ? ' active' : ''}`}
          onClick={addToFav}
          title={isFav ? "In favorites" : "Add to favorites"}
        >
          {isFav ? <HeartFilled /> : <HeartOutlined />}
        </button>
      </div>
    </div>
  );
}

export default Card1;
