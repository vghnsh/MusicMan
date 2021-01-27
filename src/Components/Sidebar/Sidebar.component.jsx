import React,{useState,useEffect} from 'react';
import styled from "styled-components";

import {create} from 'apisauce';

import {useStateValue} from '../../StateProvider';



function Sidebar() {
    const [,dispatch]=useStateValue();
    const chill="chill";
    const dance="dance";
    const hiphop="hiphop";
   
    const call=(api)=>{
        dispatch({
            type:'SET_LOADING',
            isLoading:true
          })
          const apiClient= create({
            baseURL:'https://itunes.apple.com/search?term=',
          });
          apiClient.get(`${api}`)
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
    }
   

    return (
        <Sidebar1>
            <ul style={{listStyleType:'none'}}>
               <li>
                    <button onClick={()=>call(chill)}>Chill</button>
                </li>
                <li>
                    <button onClick={()=>call(dance)}>Dance</button>
                </li>
                <li>
                    <button onClick={()=>call(hiphop)}>Hiphop</button>
                </li>
               <Listitem>EDM</Listitem>
               <Listitem>Pop</Listitem>
            </ul> 
        </Sidebar1>
    )
}

export default Sidebar;
const Sidebar1 = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    top:7em;
    text-align:left;
    font-size:2em;
    font-family: 'Roboto Slab', serif;
    
`;

const Listitem = styled.li`
cursor:poi
padding:0.3em;
    &:hover{
        border:0.1px solid grey;
        border-radius:8%;
        background-color:#80808075;
    }
`;