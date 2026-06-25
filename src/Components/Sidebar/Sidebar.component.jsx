import React, { useState } from "react";
import styled from "styled-components";
import { create } from "apisauce";
import { useStateValue } from "../../StateProvider";

const genres = [
  { label: "Chill", key: "chill", emoji: "🌊" },
  { label: "Jazz", key: "jazz", emoji: "🎷" },
  { label: "EDM", key: "edm", emoji: "⚡" },
  { label: "Classical", key: "classical", emoji: "🎻" },
  { label: "Pop", key: "pop", emoji: "🌟" },
];

function Sidebar() {
  const [, dispatch] = useStateValue();
  const [active, setActive] = useState(null);

  const call = (genre) => {
    setActive(genre);
    dispatch({ type: "SET_LOADING", isLoading: true });
    const apiClient = create({ baseURL: "/" });
    apiClient
      .get("search", { term: genre, media: "music", entity: "song" })
      .then((sdata) => dispatch({ type: "SET_SEARCH", search: sdata }))
      .then(() => dispatch({ type: "SET_LOADING", isLoading: false }))
      .catch((e) => console.log(e));
  };

  return (
    <SidebarWrap>
      <SectionLabel>Genres</SectionLabel>
      {genres.map((g) => (
        <GenreItem key={g.key} active={active === g.key} onClick={() => call(g.key)}>
          <Emoji>{g.emoji}</Emoji>
          <span>{g.label}</span>
        </GenreItem>
      ))}
    </SidebarWrap>
  );
}

export default Sidebar;

const SidebarWrap = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 190px;
  height: calc(100vh - 60px - 90px);
  background: #eeedf5;
  padding: 1.25rem 0.75rem;
  border-right: 1px solid #e8e6f4;
  overflow-y: auto;
`;

const SectionLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aaa;
  padding: 0 0.5rem;
  margin-bottom: 0.6rem;
`;

const GenreItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  color: ${({ active }) => (active ? "#7c3aed" : "#444")};
  background: ${({ active }) => (active ? "#ede9fe" : "transparent")};
  transition: all 0.15s ease;
  &:hover { background: #f5f3ff; color: #7c3aed; }
`;

const Emoji = styled.span`
  font-size: 1rem;
  width: 1.4rem;
  text-align: center;
`;
