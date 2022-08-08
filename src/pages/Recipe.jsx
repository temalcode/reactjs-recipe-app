import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'


function Recipe() {

    let params = useParams()
    const[recipe, setRecipe] = useState({})
    useEffect(() => {
        getData(params.id)
    }, [params.id])

    console.log(recipe);

    const[activeTab, setActiveTab] = useState("instructions")

    async function getData(id){
        let localRecipe = localStorage.getItem(params.id)
        if(localRecipe){
            setRecipe(JSON.parse(localRecipe))
        } else{
            let response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            let responseJSON = await response.json()
            setRecipe(responseJSON)
            localStorage.setItem(params.id, JSON.stringify(responseJSON))
        }
    }


  return (
    <Wrapper>
        <Image>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
        </Image>
        <Details>
            <div>
                <Button className={activeTab === 'instructions' ? 'activated' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients' ? 'activated' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
            </div>
            <Info>
                {activeTab === 'instructions' && (
                    <div>
                        <p dangerouslySetInnerHTML={{__html: recipe.summary}}></p>
                        <p dangerouslySetInnerHTML={{__html: recipe.instructions}}></p>
                    </div>
                )}

                {activeTab === 'ingredients' && (
                <ul>
                    {recipe.extendedIngredients.map((ingredient) => {
                        return(
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )
                    })}
                </ul>
                )}

            </Info>
        </Details>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;

    .activated{
            background: linear-gradient(35deg, #494949, #313131);
            color: white;
    }
`
const Image = styled.div`
    flex: 1;
    p{
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 3rem;
    }
    img{
        width: 75%;
    }
`

const Details = styled.div`
    flex: 1;
    div{
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
    }
`

const Button = styled.button`
    border: solid 2px black;
    color: black;
    padding: 0.7rem 2rem;
    font-weight: bolder;
    background-color: white;
    cursor: pointer;
`

const Info = styled.div`
    div{
        flex-direction: column;

    }

`

export default Recipe