import React ,{useEffect} from 'react';
import {Spin,Space} from 'antd';
import {create} from 'apisauce';
import styled from "styled-components";
import {useStateValue} from '../../StateProvider';
import Card1 from '../Card/Card1.component';
import Player from '../Player/Player.component';

function Main() {
  const [{isLoading,search,user}]=useStateValue();
    const [,dispatch]=useStateValue();
    
  useEffect(()=>{
    const apiClient= create({
      baseURL:'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=eminem',
    });
    apiClient.get()
    .then((sdata)=> dispatch({
        type:'SET_SEARCH',
        search:sdata
    }))
    .catch((e)=>console.log(e));
  },[dispatch,user?.uid]);
    return (
    <Maindiv>    
      {
        isLoading ?
        <Load>
          <Space>
            <Spin size="large" />
          </Space>
        </Load>  
        :
        <div>
          <Row>
          {
            search?.data?.results?.filter((d1)=> d1.kind === 'song').map((d1,index)=>(
              <Card1 key={index} data={d1}/>
            ))    
          } 
          </Row> 
        <Player/> 
        </div>
      }
    </Maindiv>
    )
}
export default Main;

const Row = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding: 1em;`;

const Maindiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: aliceblue;`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39em;`;



