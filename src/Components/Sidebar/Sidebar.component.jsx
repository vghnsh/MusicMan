import React from "react";
import styled from "styled-components";
import { create } from "apisauce";
import { useStateValue } from "../../StateProvider";
function Sidebar() {
  const [, dispatch] = useStateValue();

  const call = (api) => {
    dispatch({
      type: "SET_LOADING",
      isLoading: true,
    });
    const apiClient = create({
      baseURL:
        "https://api.allorigins.win/raw?url=https://itunes.apple.com/search?term=",
    });
    apiClient
      .get(`${api}`)
      .then((sdata) =>
        dispatch({
          type: "SET_SEARCH",
          search: sdata,
        })
      )
      .then(() =>
        dispatch({
          type: "SET_LOADING",
          isLoading: false,
        })
      )
      .catch((e) => console.log(e));
  };
  return (
    <Sidebar1>
      <ul style={{ listStyleType: "none", padding: "0.2em" }}>
        <ListitemHead>
          <b>
            <i>Genres</i>
          </b>
        </ListitemHead>
        <Listitem onClick={() => call("chill")}>Chill</Listitem>
        <Listitem onClick={() => call("jazz")}>Jazz</Listitem>
        <Listitem onClick={() => call("edm")}>EDM</Listitem>
        <Listitem onClick={() => call("classical")}>Classical</Listitem>
        <Listitem onClick={() => call("pop")}>Pop</Listitem>
      </ul>
    </Sidebar1>
  );
}

export default Sidebar;
const Sidebar1 = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 7em;
  text-align: left;
  font-size: 2em;
  font-family: "Roboto Slab", serif;
`;

const Listitem = styled.li`
  cursor: pointer;
  padding: 0.3em;
  &:hover {
    border: 0.1px solid grey;
    border-radius: 8%;
    background-color: #80808075;
  }
  @media screen and (max-width: 800px) {
    padding: 0.5em;
    font-size: 1.1rem;
  }
`;

const ListitemHead = styled.li`
  font-weight: bold;
  color: grey;
`;
