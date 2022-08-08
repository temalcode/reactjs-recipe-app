import {GiNoodles, GiChopsticks} from 'react-icons/gi'
import {FaPizzaSlice, FaHamburger} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import React from 'react'

function Category() {
  return (
    <Wrapper>
        <SLink to={'/cuisine/Italian'}>
            <FaPizzaSlice/>
            <p>Italian</p>
        </SLink>
        <SLink to={'/cuisine/American'}>
            <FaHamburger/>
            <p>American</p>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
            <GiNoodles/>
            <p>Thai</p>
        </SLink>
        <SLink to={'/cuisine/Chinese'}>
            <GiChopsticks/>
            <p>Chinese</p>
        </SLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
   display: flex;
   margin-bottom: 3rem;
   gap: 1rem;
   justify-content: center;
`

const SLink = styled(NavLink)`
    background: linear-gradient(35deg, #494949, #313131);
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
        color: white;
        text-decoration: none;
        font-size: 0.7rem;
    }
    svg{
        color: white;
    }

    &.active{
        background: linear-gradient(to right, #f27121, #e94057);
        text-decoration: none;
    }
`



export default Category