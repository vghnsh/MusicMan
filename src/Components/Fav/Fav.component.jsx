import React,{useEffect,useState} from 'react';
import styled from "styled-components";
import {useStateValue} from '../../StateProvider';
import Card2 from '../../Components/Cardfav/Card2.component';
import {db} from '../../firebase';
function Fav() {
    
    const [fav,setFav] =useState();
    const [{user,isSign}]= useStateValue();

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
                    fav?.length > 0 ?
                        fav?.map((d1,index)=>(
                            <Card2 key={index} data={d1}/>
                        )) 
                        :<Load><b><i>Favoutite is Empty</i></b></Load>
                :alert("Please LogIn to use this feature.")
            }     
            </FavMain>  
        </Content>
    )
}

export default Fav;
const Content = styled.div`
    display:flex;
    flex-direction:column;
    background-color: aliceblue;
`;

const FavMain = styled.div`
    display:flex;
    flex-flow: wrap;
    justify-content: center;
    padding: 1em;
     
`;

const Cent = styled.div`
    padding:1em;
    display:flex;
    justify-content:center;
    background-color: aliceblue;
    border-bottom:0.1px solid darkgrey`;

const Load = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 39em;`;