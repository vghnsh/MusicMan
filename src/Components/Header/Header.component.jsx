import React from 'react';
import {useStateValue} from '../../StateProvider';
import styled from "styled-components";
import {Link} from 'react-router-dom';

import { useHistory } from "react-router-dom";
import {Button } from 'antd';

import {auth} from '../../firebase';
function Header() {
  const [,dispatch]= useStateValue();
  const [{user,isSign}]=useStateValue();
  const history = useHistory();

  const handle=()=>{
    if(isSign){
      dispatch({type:"SET_CURRENT_MUSIC",currentMusic:null})
      dispatch({type:'SET_CURRENT_STATE',music:null})
    }
    else{
      alert('Please LogIn to use this feature');
    }
    
    
  }

  const signOut=(event)=>{
    event.preventDefault();
    auth.signOut();
    history.push("/");
  };
    return (
        <Head>

            <Logo >
              <Link style={{color:'black'}} to='/'>
              <b>Music Man</b>
              </Link>
            
            </Logo>
            {
              isSign ? 
              <Navb>
                <NavItem>{user?.displayName}</NavItem>
                <NavItem><Link to='/fav' onClick={handle} >Your Favorite</Link></NavItem>
                <NavItem><Button onClick={signOut} type="primary" danger>Logout</Button></NavItem>
              </Navb>
              :
              <Navb>
                <NavItem><Link onClick={handle}>Your Favorite</Link></NavItem>
                <NavItem><Button><Link to='/Signin'>LogIn</Link></Button></NavItem>
                <NavItem><Button danger><Link to='/Signup'>SignUp</Link></Button></NavItem>
              </Navb>
            }

            <Link to='/fav'>

            </Link>
            <Link to='/SignIn'>

            </Link>
            <Link to='/'>
            </Link>
        </Head>
    )
}
export default Header;
const Head = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: 'Bree Serif', serif;
  background-color: aliceblue;
  @media screen and (max-width: 800px){
    flex-direction:column;
  }`;

const Logo = styled.div`
  display: flex;
  justify-content;flex-start;
  font-family: 'Bree Serif', serif;
  padding: 0 4em;
  font-size:2em;
  @media screen and (max-width: 800px){
    padding: 0;
    justify-content: center;
  }
  `;

const Navb = styled.div`
  display:flex;
  justify-content: space-evenly;
  
`;

const NavItem = styled.span`
  display:flex;
  padding: 1em 4em;
  font-size:1.2em;
  @media screen and (max-width: 800px){
    padding: 0 0  1.1em 0.6em
  }`;

