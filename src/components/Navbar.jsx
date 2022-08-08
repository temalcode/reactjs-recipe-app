import React from 'react'
import styled from 'styled-components'
import {Link} from'react-router-dom'
import {GiForkKnifeSpoon} from 'react-icons/gi' 

function Navbar() {
  return (
    <Wrapper>
        <SLink to={'/'}>
            <GiForkKnifeSpoon/>
            Delicious
        </SLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-family: 'Lobster', serif;
`

const SLink = styled(Link)`
    font-family: 'Lobster', serif;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
`

export default Navbar