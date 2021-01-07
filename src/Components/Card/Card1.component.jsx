import React from 'react';
import dateFormat from 'dateformat';
import {Card,Button} from 'antd';
import {useStateValue} from '../../StateProvider';
import styled from "styled-components";
import {HeartFilled,HeartOutlined} from '@ant-design/icons';
import {db} from '../../firebase';
function Card1({data}) {
  const { Meta } = Card;
  const [,dispatch] = useStateValue();
  const [{user,isSign,trackId}]= useStateValue();

  const setCurrentMusic=()=>{
    dispatch({
      type:"ADD_TO_FAV",
      fav:data
    })
    dispatch({
        type:"SET_CURRENT_MUSIC",
        currentMusic:data
    })
  };
  const addToFav=()=>{
    if(isSign){
      db.collection('users').doc(user?.uid).collection('fav').doc().set({
        imageUrl:data.artworkUrl100,
        title:data.collectionName,
        date:data.releaseDate,
        trackId:data.trackId,
        currentMusic:data
      })
    }
    else{
      alert('Please logIn to use that feature')
    }  
  }
    //console.log(trackId);
  return (
      <Card 
        hoverable
        style={{ width: 240 ,padding:'1.5em',margin:'1em'}}
        cover={<img alt="example" src={data.artworkUrl100}/>}
        >
        <Cent>
        <Button onClick={setCurrentMusic} >Play</Button>
        
        {isSign ? 
            trackId.includes(data.trackId) ?
            <HeartFilled style={{fontSize:'1.5em'}}/>
            :
            <HeartOutlined style={{fontSize:'1.5em'}} onClick={addToFav}/>
            :
            <HeartOutlined style={{fontSize:'1.5em'}} onClick={addToFav}/>
        }
        </Cent>
        <Meta title={data.collectionName} description={dateFormat(data.releaseDate, "mmmm dS, yyyy")}/>
      </Card>
  )
}
export default Card1;
const Cent= styled.div`
  display:flex;
  justify-content:space-between;
  padding:0.5em`;
