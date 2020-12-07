import React from 'react';
import dateFormat from 'dateformat';
import {Card} from 'antd';

function Card1({data}) {
  const { Meta } = Card;
    return (
        <Card 
              hoverable
              style={{ width: 240 ,padding:'1.5em',margin:'1em'}}
              cover={<img alt="example" src={data.artworkUrl100}/>}
              >
              <Meta title={data.artistName} description={dateFormat(data.releaseDate, "mmmm dS, yyyy")}/>
        </Card>
    )
}
export default Card1;
