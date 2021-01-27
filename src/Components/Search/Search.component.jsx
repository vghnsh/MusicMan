import React,{useState} from 'react';
import {useStateValue} from '../../StateProvider';

import {Button, Input } from 'antd';
import {create} from 'apisauce';
import styled from "styled-components";

function Search() {
    
    const [input,setInput]= useState();
    const [,dispatch] = useStateValue();
    
    function press(){
        dispatch({
            type:'SET_CURRENT_MUSIC',
            currentMusic:null
          })
          dispatch({
            type:'SET_MUSIC_STATE',
            music:'stop'
          })
          dispatch({
            type:'SET_LOADING',
            isLoading:true
          })
          const apiClient= create({
            baseURL:'https://itunes.apple.com/search?term=',
          });
          apiClient.get(`${input}`)
          .then((sdata)=>(
            dispatch({
                type:'SET_SEARCH',
                search:sdata
            })
          ))
          .then(()=>(
            dispatch({
              type:'SET_LOADING',
              isLoading:false
            })
          ))
          .catch((e)=>console.log(e)); 
          setInput('');
      }
      const handleClick = (e)=>{
        press();
      };
        
      const handlePress=(e)=>{
        if(e.keyCode===13 || e.which === 13){
            press();
        }
      };

    return (
        <SearchF>
          <InputF>
            <Input
            placeholder="Search Your artist"
            allowClear
            size="large"
            value={input}
            onKeyDown={handlePress}
            onChange={(e)=>setInput(e.target.value)}
            />
          </InputF>
          <Button  style={{height:'2.8em'}}  onClick={handleClick} type="primary">Search</Button> 
        </SearchF>
    )
}
export default Search;

const SearchF = styled.div`
  position:sticky;
  top:4.7em;
  z-index:1;
  display: flex;
  justify-content: center;
  margin-top:2.5em;
  padding-bottom:3.3em;
  background-color: aliceblue;`;

const InputF = styled.div`
  width: 45%;`;