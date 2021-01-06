import React from 'react';
import dateFormat from 'dateformat';
import {Card,Button} from 'antd';
import {useStateValue} from '../../StateProvider';

import {db} from '../../firebase';
import styled from "styled-components";

function Card2({data}) {
  const { Meta } = Card;
  const [,dispatch] = useStateValue();
  
  const [{user}]= useStateValue();
  const setCurrentMusic=()=>{
    dispatch({
        type:"SET_CURRENT_MUSIC",
        currentMusic:data.favItem.currentMusic
    })
  };

  const removeFromFav=()=>{
    dispatch({
      type:"REMOVE_TRACK_ID",
      trackId: data.favItem.trackId
    })
    db.collection('users').doc(user?.uid).collection('fav').doc(data.id).delete();
    
  }
  return (
      <Card 
        hoverable
        style={{ width: 240 ,padding:'1.5em',margin:'1em'}}
        cover={<img alt="example" src={data.favItem.imageUrl}/>}
        >
        <Cent>
        <Button onClick={setCurrentMusic} >Play</Button>
        <Button onClick={removeFromFav} danger>Remove Fav</Button>
        </Cent>
        <Meta title={data.favItem.title} description={dateFormat(data.favItem.date, "mmmm dS, yyyy")}/>
      </Card>
  )
}
export default Card2;
const Cent= styled.div`
  display:flex;
  justify-content:space-between;
  padding:0.5em`;
