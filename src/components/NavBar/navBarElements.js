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