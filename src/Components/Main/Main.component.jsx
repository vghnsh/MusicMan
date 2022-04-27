import React, { useEffect } from "react";
import { Spin, Space } from "antd";
import { create } from "apisauce";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar.component";
import { useStateValue } from "../../StateProvider";
import Card1 from "../Card/Card1.component";

function Main() {
  const [{ isLoading, search, user }] = useStateValue();
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const apiClient = create({
      baseURL:
        "https://api.allorigins.win/raw?url=https://itunes.apple.com/search?term=music",
    });
    apiClient
      .get()
      .then((sdata) =>
        dispatch({
          type: "SET_SEARCH",
          search: sdata,
        })
      )
      .catch((e) => console.log(e));
  }, [dispatch, user?.uid]);

  return (
    <Maindiv>
      <Background>
        <Sidebar />
      </Background>
      {isLoading ? (
        <Load>
          <Space>
            <Spin size="large" />
          </Space>
        </Load>
      ) : (
        <Row>
          {search?.data?.results
            ?.filter((d1) => d1.kind === "song")
            .map((d1, index) => (
              <Card1 key={index} data={d1} />
            ))}
        </Row>
      )}
    </Maindiv>
  );
}
export default Main;

const Maindiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  background-color: aliceblue;
`;

const Background = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  padding: 1em;
  padding-left: 11em;
  @media screen and (max-width: 800px) {
    padding-left: 9em;
  }
`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39em;
`;
