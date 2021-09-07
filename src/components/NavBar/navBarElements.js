import styled from 'styled-components'
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

export const Nav = styled(NavLink)`
  color: white;
  text-decoration: none;
`

export const ButtonS = styled(Button)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 2rem;
  
 
`

export const NavElemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 0.5rem;
`

export const counterBasket = styled.div`
  color: #e2e3e5;
  position: relative;
  padding: 0 4px;
  left: -4px;
  font-size: 12px;
  bottom: 4px;
  background-color: #007bff;
  border: 1px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`