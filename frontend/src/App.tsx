import { FormEvent, useState, useRef } from 'react';
import './App.css';

import * as api from './api';
import { Recipe } from './types';
import RecipeCards from './components/RecipeCards';

const App = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const pageNumber = useRef(1);

    const handleSearchSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const fetchedRecipes = await api.searchRecipes(searchTerm, 1);
            setRecipes(fetchedRecipes.results);
            pageNumber.current = 1;
        } catch (error) {
            console.log(error);
        }
    };

    //Ajout 
    const handleViewMoreClick = async () => {
      const nextPage = pageNumber.current +1
      try {
        const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
        setRecipes([...recipes, ...nextRecipes.results]);
        pageNumber.current = nextPage;
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
                <input
                    type='text'
                    required
                    placeholder='Enter a search term...'
                    value={searchTerm}
                    onChange={(event)=> setSearchTerm(event.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
            {recipes.map((recipe) => {
                return (
                    <RecipeCards recipe={recipe}/>
                );
            })}
            <button className="view-more-button"
            onClick={handleViewMoreClick}>
              View More
            </button>
        </div>
    );
};

export default App;
