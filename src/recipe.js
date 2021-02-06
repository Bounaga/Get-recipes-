import React from 'react';
import './recipe.css';

const Recipe = (props)   => {
    return(
        <div className='recipe'>
            <h1>{props.title}</h1>
            <p>{props.calories} <span className='calories'>calories</span></p>
            <h2> ingredients : </h2>
            <ol className='indredients'> 
                {props.ingredients.map( ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol> 
           
            <img    src={props.url}
                    alt=''
                    className='image'></img>
        </div>
    );
}

export default Recipe;