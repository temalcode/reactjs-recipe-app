import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

function Vegetarian() {

  const [vegetarianItems, setvegetarianItems] = useState([])
  useEffect(() => {
    setvegetarianRecipes()
  }, [])

  async function setvegetarianRecipes() {
    let localRecipes = localStorage.getItem('vegetarian')
    if (localRecipes) {
      let localJSON = JSON.parse(localRecipes)
      setvegetarianItems(localJSON)
    } else {
      let response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
      let responseJson = await response.json()
      let apiRecipies = responseJson.recipes
      setvegetarianItems(apiRecipies)
      localStorage.setItem('vegetarian', JSON.stringify(apiRecipies))
    }
  }

  return (
    <Wrapper>
      <h3>Vegetarian Recipies</h3>
      <Splide options = {{
        perPage: 4,
        arrows: false, 
        pagination: false,
        drag: 'free',
        gap: '1rem',
      }}>
      {vegetarianItems.map((item) => {
          return(
            <SplideSlide key={item.id}>
              <Card>
              <Link to={'recipe/'+item.id}>
                <Title>
                  <p>{item.title}</p>
                </Title>
                <img src={item.image} alt="vegeterian food" />
                <Gradient/>
                </Link>
              </Card>
            </SplideSlide>
          )
      })}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

const Card = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-top: 0.7rem;
  img{
    border-radius: 20px;
    object-fit: cover;
    width: 100%;
  }
`

const Title = styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: fit-content;
    z-index: 2;
  p{
    font-size: 1rem;
    color: white;
    text-align: center;
  }
`

const Gradient = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #3a000000, #000000b2 );
  border-radius: 20px;
`

export default Vegetarian