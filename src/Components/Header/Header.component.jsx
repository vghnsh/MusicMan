import React from 'react';
import { useStateValue } from '../../StateProvider';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { auth } from '../../firebase';

function Header() {
  const [{ user, isSign }] = useStateValue();
  const history = useHistory();

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
    history.push("/");
  };

  return (
    <Head>
      <Logo>
        <Link to="/">
          <LogoIcon>♪</LogoIcon>
          <LogoText>MusicMan</LogoText>
        </Link>
      </Logo>

      <Nav>
        {isSign ? (
          <>
            <UserChip>{user?.displayName?.split(" ")[0]}</UserChip>
            <NavLink as={Link} to="/fav">Your Favorites</NavLink>
            <NavBtn onClick={signOut} danger>Logout</NavBtn>
          </>
        ) : (
          <>
            <NavLink onClick={() => alert('Please log in to use this feature')}>Your Favorites</NavLink>
            <NavLink as={Link} to="/Signin">Log In</NavLink>
            <NavBtnPrimary as={Link} to="/Signup">Sign Up</NavBtnPrimary>
          </>
        )}
      </Nav>
    </Head>
  );
}

export default Header;

const Head = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 200;
  background: #f0eefb;
  border-bottom: 1px solid #e8e6f4;
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
`;

const Logo = styled.div`
  a { display: flex; align-items: center; gap: 0.4rem; text-decoration: none; }
`;

const LogoIcon = styled.span`
  font-size: 1.4rem;
  color: #7c3aed;
`;

const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.02em;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const UserChip = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #7c3aed;
  background: #ede9fe;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  margin-right: 0.5rem;
`;

const NavLink = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #555;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
  &:hover { color: #7c3aed; background: #f5f3ff; }
`;

const NavBtn = styled.button`
  font-size: 0.82rem;
  font-weight: 600;
  color: #ef4444;
  background: transparent;
  border: 1px solid #fca5a5;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { background: #fef2f2; }
`;

const NavBtnPrimary = styled.a`
  font-size: 0.82rem;
  font-weight: 700;
  color: #fff;
  background: #7c3aed;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
  &:hover { background: #6d28d9; color: #fff; }
`;
