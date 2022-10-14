import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../store/UserStore";

const Navbar = () => {
  const { user = {} } = useContext(UserContext);
  const { name = "", _id: id = "", role } = user;

  return (
    <NavWrapper> 
      <NavList>
        <li><Link to={`/profile/${id}`}>Profile</Link></li>
        { role === 'Admin' ? <li><Link to={`/admin/${id}`}>Admin Panel</Link></li> : null }
        <li><Link to="/">Logout</Link></li>
        <li>{role}</li>
      </NavList>
      <h3>{name}</h3>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  max-width: 200px;
  width: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);

  h3 {
    padding: 1rem;
    text-align: center;
    display: block;
    width: 100%;
    font-size: 1.2rem;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background: #d8d8d8;
    }
  }

  @media (max-width: 768px) {
    max-width: unset;
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;

  li {
    display: block;
    padding: 0.2rem 1rem;
    /* background: #d8d8d8; */
    border-radius: 5px;
    margin: 0.3rem 0;
    color: #000;
    box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.2);

    &:last-child{
      margin-top: 1rem;
      box-shadow: none;
      background: #000;
      color: #fff;
      text-align: center;
      font-weight: 600;
    }

    &:hover {
      background: #000;
      color: #fff;
    }
  }
`;

export default Navbar;
