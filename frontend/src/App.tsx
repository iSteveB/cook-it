import { FormEvent, useState, useRef, useEffect } from 'react';
import './App.css';

import * as api from './api';
import { Recipe } from './types';
import RecipeCards from './components/RecipeCards';
import RecipeModal from './components/RecipeModal';

type Tabs = 'search' | 'favorites';

const App = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
        undefined
    );
    const [selectedTab, setSelectedTab] = useState<Tabs>('search');
    const [favoritesRecipes, setFavoritesRecipes] = useState<Recipe[]>([]);
    const pageNumber = useRef(1);

    useEffect(() => {
        const fetchFavoritesRecipes = async () => {
            try {
                const getFavoriteRecipes = await api.getFavoriteRecipes();
                setFavoritesRecipes(getFavoriteRecipes.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFavoritesRecipes();
    }, []);

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

    const addFavoriteRecipe = async (recipe: Recipe) => {
        try {
            await api.addFavoriteRecipe(recipe);
            setFavoritesRecipes([...favoritesRecipes, recipe])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='tabs'>
                <h1 onClick={() => setSelectedTab('search')}>Recipe Search</h1>
                <h1 onClick={() => setSelectedTab('favorites')}>Favorites</h1>
            </div>

            {selectedTab === 'search' && (
                <>
                    <form onSubmit={(e) => handleSearchSubmit(e)}>
                        <input
                            type='text'
                            required
                            placeholder='Enter a search term...'
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
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
                                onFavButtonClick={addFavoriteRecipe}
                            />
                        );
                    })}
                    <button
                        className='view-more-button'
                        onClick={handleViewMoreClick}>
                        View More
                    </button>
                </>
            )}

            {selectedTab === 'favorites' && (
                <div>
                    {favoritesRecipes.map((recipe) => 
                        <RecipeCards
                            recipe={recipe}
                            onClick={() => setSelectedRecipe(recipe)}
                            onFavButtonClick={()=> undefined}
                        />
                    )}
                </div>
            )}

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
