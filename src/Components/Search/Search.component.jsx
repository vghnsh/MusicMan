import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";
import { create } from "apisauce";
import styled from "styled-components";

function Search() {
  const [input, setInput] = useState("");
  const [, dispatch] = useStateValue();

  function press() {
    if (!input.trim()) return;
    dispatch({ type: "SET_CURRENT_MUSIC", currentMusic: null });
    dispatch({ type: "SET_MUSIC_STATE", music: "stop" });
    dispatch({ type: "SET_LOADING", isLoading: true });

    const apiClient = create({ baseURL: "/" });
    apiClient
      .get("search", { term: input, media: "music", entity: "song" })
      .then((sdata) => dispatch({ type: "SET_SEARCH", search: sdata }))
      .then(() => dispatch({ type: "SET_LOADING", isLoading: false }))
      .catch((e) => console.log(e));

    setInput("");
  }

  return (
    <SearchBar>
      <SearchIcon>🔍</SearchIcon>
      <SearchInput
        placeholder="Search artists, albums, tracks…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && press()}
      />
      <SearchBtn onClick={press}>Search</SearchBtn>
    </SearchBar>
  );
}

export default Search;

const SearchBar = styled.div`
  position: fixed;
  top: 60px;
  left: 190px;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: #eeedf5;
  border-bottom: 1px solid #e8e6f4;
`;

const SearchIcon = styled.span`
  font-size: 0.95rem;
  color: #aaa;
`;

const SearchInput = styled.input`
  flex: 1;
  background: #fff;
  border: 1px solid #e0deee;
  border-radius: 8px;
  padding: 0.55rem 1rem;
  font-size: 0.88rem;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  &::placeholder { color: #bbb; }
  &:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
`;

const SearchBtn = styled.button`
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #6d28d9; }
`;
