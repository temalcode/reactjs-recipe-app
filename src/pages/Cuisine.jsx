import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Cuisine() {

    let params = useParams()
    const[cuisine, setCuisine] = useState([])
    useEffect(() => {
        getData(params.type)
    }, [params.type])

    async function getData(type){
        let localCuisine = localStorage.getItem(params.type)
        if(localCuisine){
            setCuisine(JSON.parse(localCuisine))
        } else{
            let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}&number=12`)
            let responseJSON = await response.json()
            let responseRecipes = responseJSON.results
            setCuisine(responseRecipes)
            localStorage.setItem(params.type, JSON.stringify(responseRecipes))
        }
    }

  return (
    <Wrapper>
        {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                        <img src={item.image} alt={params.type + 'food'}/>
                        <p>{item.title}</p>
                    </Link>
                </Card>
            )
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
`
const Card = styled.div`
    overflow: hidden;
    height: fit-content;
    text-align: center;
    img{
        border-radius: 10px;
        width: 100%;
    }
`

export default Cuisine