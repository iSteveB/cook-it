import { FormEvent, useState, useRef } from 'react';
import './App.css';

import * as api from './api';
import { Recipe } from './types';
import RecipeCards from './components/RecipeCards';
import RecipeModal from './components/RecipeModal';

const App = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
        undefined
    );
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
        const nextPage = pageNumber.current + 1;
        try {
            const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
            setRecipes([...recipes, ...nextRecipes.results]);
            pageNumber.current = nextPage;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleSearchSubmit(e)}>
                <input
                    type='text'
                    required
                    placeholder='Enter a search term...'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
            {recipes.map((recipe) => {
                return (
                    <RecipeCards
                        recipe={recipe}
                        onClick={() => {
                            setSelectedRecipe(recipe);
                        }}
                    />
                );
            })}
            <button className='view-more-button' onClick={handleViewMoreClick}>
                View More
            </button>

            {selectedRecipe ? (
                <RecipeModal
                    recipeId={selectedRecipe.id.toString()}
                    onClose={() => setSelectedRecipe(undefined)}
                />
            ) : null}
        </div>
    );
};

export default App;
