import React, { useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function Popular() {
  const [popularItems, setPopularItems] = useState([])
  useEffect(() => {
    setPopularRecipes()
  }, [])

  async function setPopularRecipes() {
    let localRecipes = localStorage.getItem('popular')
    if (localRecipes) {
      let localJSON = JSON.parse(localRecipes)
      setPopularItems(localJSON)
    } else {
      let response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      let responseJson = await response.json()
      let apiRecipies = responseJson.recipes
      setPopularItems(apiRecipies)
      localStorage.setItem('popular', JSON.stringify(apiRecipies))
    }
  }


  return (
    <Wrapper>
      <h3>Popular Recipies</h3>
      <Splide options = {{
        perPage: 3,
        arrows: false, 
        pagination: false,
        drag: 'free',
        gap: '1rem',
      }}>
      {popularItems.map((item) => {
          return(
            <SplideSlide key={item.id}>
              <Card>
                <Link to={'recipe/'+item.id}>
                  <Title>
                    <p>{item.title}</p>
                  </Title>
                  <img src={item.image} alt="popular food" />
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
  margin-bottom: 3rem;
`

const Card = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: fit-content;
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

export default Popular