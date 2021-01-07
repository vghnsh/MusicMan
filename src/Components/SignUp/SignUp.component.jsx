import React,{useState} from 'react';
import {TextField ,Button} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import {auth} from '../../firebase';
import firebase from 'firebase';
import './Signup.style.scss';

import {Spin,Space} from 'antd';
import {useStateValue} from '../../StateProvider';

import styled from "styled-components";
function Signup() {
    const [mail, setMail]= useState('');
    const [password, setPassword]= useState('');
    const [uname, setUname]= useState('');
    const history = useHistory();
    const [{isLoading}] = useStateValue();
    const [,dispatch]= useStateValue();
    
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

    const signUp=(event)=>{
       
        event.preventDefault(); 
        dispatch({
              type:'SET_LOADING',
              isLoading:true
            })
    
        auth.createUserWithEmailAndPassword(mail, password)
        .then((authUser)=>{
        return authUser.user.updateProfile({
            displayName : uname
        })}).then(()=>dispatch({
          type:"SET_LOADING",
          isLoading:false
        }))
        .then(()=>{history.push("/")})
        .catch((error)=>alert(error.message)).then(()=>dispatch({
          type:"SET_LOADING",
          isLoading:false
        }));  
    };

    return (
      <div className='loghead'>
        {
          isLoading ?
          <Load>
            <Space>
              <Spin size="large" />
            </Space>
          </Load> 
          :
          <div className='signUp'>
            <div>
            <h1 className='title'>SignUP</h1>
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
                    label="UserName"
                    variant="outlined"
                    color="primary"
                    value={uname}
                    onChange={(e)=>setUname(e.target.value)}
                />

                <TextField
                    className='mail'
                    id="outlined-secondary"
                    label="E-mail"
                    variant="outlined"
                    color="primary"
                    value= {mail}
                    onChange={(e)=>setMail(e.target.value)}
                />
                
                <TextField
                    className='password'
                    type="password"
                    id="outlined-secondary"
                    label="Password"
                    variant="outlined"
                    color="primary"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            
           
            </form>
         
            <Button onClick={signUp}  className='signUPBTN'>
                SignUP 
            </Button>
            
            </div>
            </div>
        }
         

      </div>
       
            
        
    )
}

export default Signup;
const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39em;`;