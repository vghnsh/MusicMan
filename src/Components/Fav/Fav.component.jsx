import React,{useEffect,useState} from 'react';
import styled from "styled-components";
import Player from '../../Components/Player/Player.component';
import {useStateValue} from '../../StateProvider';
import Card2 from '../../Components/Cardfav/Card2.component';

import { useHistory } from "react-router-dom";
import {db} from '../../firebase';
function Fav() {
    
    const [fav,setFav] =useState();
    const [{user,isSign}]= useStateValue();
    const history= useHistory();

    useEffect(()=>{
        db.collection('users').doc(user?.uid).collection('fav')
        .onSnapshot((snapshot)=>
        setFav(snapshot.docs.map((doc)=>(
            {
              id:doc.id,
              favItem:doc.data()
            }
          ))
     ));
        
    },[user?.uid]);
    
    return (
        <Content>
            
            <Cent>
               <b><i> Favourite Page</i></b>
            </Cent>
            <FavMain>
            {
                isSign ? 

                fav?.map((d1,index)=>(
                    <Card2 key={index} data={d1}/>
                )) 
                : history.push('./Signin')
            }
                 
            <Player/>
        </FavMain>  
        </Content>
        
    )
}

export default Fav;
const Content = styled.div`
    display:flex;
    flex-direction:column;
`;
const FavMain = styled.div`
    display:flex;
    flex-flow: wrap;
    justify-content: center;
    padding: 1em; 
    background-color: aliceblue;`;

const Cent = styled.div`
    display:flex;
    justify-content:center;
    background-color: aliceblue;`;
