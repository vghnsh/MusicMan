import React,{useEffect} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
//import Search from 'antd/lib/input/Search';
import Signin from './Components/SignIn/SignIn.component';
import Signup from './Components/SignUp/SignUp.component';
import Header from './Components/Header/Header.component';
import Search from './Components/Search/Search.component';
import Main from './Components/Main/Main.component';
import Player from './Components/Player/Player.component';
import {useStateValue} from './StateProvider';

import {auth} from './firebase';
import Fav from './Components/Fav/Fav.component';

import {db} from './firebase';
function App() { 
  const [,dispatch] = useStateValue();
  const [{user}]=useStateValue();
  
  useEffect(()=>{
    const unsubsribe= auth.onAuthStateChanged((authUser)=>{
      if(authUser){ 
        dispatch({   
          type:"SET_CURRENT_USER",
          user:authUser,
          isSign:true
      });
      }
      else{
        dispatch({
          type:"SET_CURRENT_USER",
          user:null,
          isSign:false         
      });   
      }
      return()=>{
        unsubsribe();
      };
    });
  },[dispatch]);
  
   useEffect(()=>{
     db.collection('users').doc(user?.uid).collection('fav').onSnapshot((snapshot)=>(
       snapshot.docs.map((m1)=>dispatch({
         type:"SET_TRACKID",
         trackId:m1.data().trackId
       }))
     ))
 },[user?.uid,dispatch])

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/Signin">
          <Signin/>
        </Route>
        
        <Route path="/Signup">
          <Signup/>
        </Route>

        <Route path="/Fav">
          <Header/>
          <Fav/>
          
        </Route>
        <Route path="/">
          <Header/>
          <Search/>
         
          <Main/>
        </Route>
      </Switch>
    </Router>
    <Player/> 
    </div>
    
  );
}

export default App;


