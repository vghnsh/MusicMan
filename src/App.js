import React ,{useState} from 'react';
import {Button, Input } from 'antd';
import 'antd/dist/antd.css';
import styled from "styled-components";
import {create} from 'apisauce';
import Card1 from './Card1';

function App() { 
  const [input,setInput]= useState();
  const [data,setData] = useState();
 
  const handleClick = ()=>{
    const apiClient= create({
      baseURL:'https://itunes.apple.com/search?term=',
    });
    apiClient.get(`${input}`)
    .then((sdata)=>setData(sdata))
    .catch((e)=>console.log(e));
  };

  return (
    <Main>
      <Head>
        <Title>
          <h1><b>Music Store</b></h1>
        </Title>
        <SearchF>
          <InputF>
            <Input
            placeholder="Search Your artist"
            allowClear
            size="large"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
          </InputF>
          <Button style={{height:'2.8em'}} onClick={handleClick} type="primary">Search</Button> 
        </SearchF>
      </Head>
        <Row>
        {
          data?.data?.results?.filter((d1)=> d1.kind === 'song').map((d1)=>(
            <Card1 key={d1.id} data={d1}/>
          ))    
        } 
        </Row>  
    </Main>
  );
}
export default App;

const Row = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding: 1em;`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: aliceblue;`;

const Title = styled.div`
  display: flex;
  justify-content: center;`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;`;

const SearchF = styled.div`
  display: flex;
  justify-content: center;`;

const InputF = styled.div`
  width: 45%;`;

