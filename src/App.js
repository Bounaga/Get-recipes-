import React, { useEffect, useState }  from 'react';
import './App.css';
import Recipe from './recipe';

function App() {

  //  form logique
  const [search, setSearch] = useState('');

  const listner = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  }

  const [foodType, setFoodType] = useState('');

  const getFoodTypeOnSubmit = (e) => {
    e.preventDefault();
    setFoodType(search);
  }

  // API from https://developer.edamam.com/
  const APP_ID = '874d996b';
  const APP_KEY = 'c6385c0c4aa15aebe598d952783d5481';

  const [recipes, setRecipes] = useState([]);
  // this function runs 1st time when our website renders 
  // then it runs when any thing else (run function...)
  useEffect(()  =>  {
    // console.log('effect has run');
    // add this function to useEffect so it will fetch API  when our website renders 
    getRecipes();
   },  [foodType]); //these brackets make useEffect() run just  when our website renders if they are empty
                    // now it runs whet the var inside changes
  
  const getRecipes = async () => {
    //  use await when information we need takes time to come, like when we're using API
      const response = await fetch(`https://api.edamam.com/search?q=${foodType}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    // wait, when our response comes, store it as a json  
      const data = await response.json();
      setRecipes(data.hits);
      // console.log(data.hits);
   }


   return (
    <div className="App">
      <p className='title'> Type any food name to get it's recipe </p>
      <form   className='search-form'
              onSubmit={getFoodTypeOnSubmit}>
          <input  type='text'
                  className='search-bar'
                  value={search}
                  onChange={listner}
                  placeholder='ex: chicken'></input>
          <button type='submit'
                  className='glow-on-hover'>Search</button>
      </form>

      <div className='recipes'>
        {recipes.map(recipe => (
              <Recipe title={recipe.recipe.label}
                      calories = {recipe.recipe.calories}
                      url = {recipe.recipe.image}
                      ingredients = {recipe.recipe.ingredients}
                      key= {recipe.recipe.label} //just to remove an error showen in the console.
              />
        ))} 
      </div>
      
    </div>
  );
}

export default App;
