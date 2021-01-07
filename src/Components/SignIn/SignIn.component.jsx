import React, { useState } from 'react';
import './Signin.style.scss';
import {TextField ,Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import {auth} from '../../firebase';
import {Spin,Space} from 'antd';
import {useStateValue} from '../../StateProvider';
import styled from "styled-components";

function Signin() {
    const [mail, setMail]= useState('');
    const [password, setPassword]= useState('');
    const history = useHistory();
    const [,dispatch]= useStateValue();
    const [{isLoading}] =useStateValue();

    const signInWithGoogle = () => {     
        const provider =new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({propmt:'select_account'});
        auth.signInWithPopup(provider)
        .then(()=>dispatch({
          type:"SET_LOADING",
          isLoading:false
        }))
        .then(()=>{history.push("/")})
        .catch((error)=>alert(error.message)).then(()=>dispatch({
          type:"SET_LOADING",
          isLoading:false
        }));
          
    };
    const signIn=(event)=>{
      event.preventDefault(); 
      dispatch({
            type:'SET_LOADING',
            isLoading:true
          })
    
    auth.signInWithEmailAndPassword(mail,password)
    .then(()=>dispatch({
      type:"SET_LOADING",
      isLoading:false
    }))
    .then(()=>{history.push("/")})
    .catch((error)=>alert(error.message)).then(()=>dispatch({
      type:"SET_LOADING",
      isLoading:false
    }));
    setMail('');
    setPassword('');
    };

    return (
      <div className="loghead">
        {
          isLoading ?
          <Load>
            <Space>
              <Spin size="large" />
            </Space>
          </Load> 
          :
          <div className='signin'>
            <div>
            <h1 className='title'>SignIN</h1>
            </div>
            
            <div className='signDiv'>
            <Button onClick={signInWithGoogle} className='GoogleSign'>
                Sign In with Google (Recommanded)
            </Button>

            <p className='center'>or</p>
    
            <form className='signForm' noValidate autoComplete="off">
                <TextField
                    className='mail'
                    id="outlined-secondary"
                    label="E-mail"
                    variant="outlined"
                    color="primary"
                    value={mail}
                    onChange={(e)=>setMail(e.target.value)}
                />
                
                <TextField
                    className='password'
                    type='password'
                    id="outlined-secondary"
                    label="Password"
                    variant="outlined"
                    color="primary"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            
           
            </form>
            <Button onClick={signIn}  className='signBTN'>
                Sign In 
            </Button>
            
           <div className="gosign center">
           <Link className='link' to='/SignUP'>
               Go to SignUP 
            </Link>
           </div>
          
          </div>
            
        </div>
        }
        
      </div>
        
    )
}

export default Signin;
const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39em;`;