import React, { useEffect } from "react";
import { create } from "apisauce";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar.component";
import { useStateValue } from "../../StateProvider";
import Card1 from "../Card/Card1.component";

function Main() {
  const [{ isLoading, search, user }] = useStateValue();
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const apiClient = create({ baseURL: "/" });
    apiClient
      .get("search", { term: "music", media: "music", entity: "song" })
      .then((sdata) => dispatch({ type: "SET_SEARCH", search: sdata }))
      .catch((e) => console.log(e));
  }, [dispatch, user?.uid]);

  const songs = search?.data?.results?.filter((d) => d.kind === "song") || [];

  return (
    <PageWrap>
      <Sidebar />
      <Content>
        {isLoading ? (
          <LoadWrap>
            <Spinner />
            <LoadText>Loading music…</LoadText>
          </LoadWrap>
        ) : songs.length === 0 ? (
          <EmptyWrap>
            <EmptyIcon>🎵</EmptyIcon>
            <EmptyText>No tracks found</EmptyText>
          </EmptyWrap>
        ) : (
          <Grid>
            {songs.map((d, i) => (
              <Card1 key={i} data={d} />
            ))}
          </Grid>
        )}
      </Content>
    </PageWrap>
  );
}

export default Main;

const PageWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eeedf5;
`;

const Content = styled.main`
  margin-left: 190px;
  /* 60px header + 54px search bar */
  padding: 124px 1.5rem 110px;
  flex: 1;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

const LoadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid #e0deee;
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const LoadText = styled.p`
  color: #999;
  font-size: 0.88rem;
`;

const EmptyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  gap: 0.75rem;
`;

const EmptyIcon = styled.div` font-size: 2.5rem; `;
const EmptyText = styled.p` color: #999; font-size: 0.95rem; `;
