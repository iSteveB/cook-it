import { Recipe } from "../types";

interface Props {
    recipe: Recipe
}

const RecipeCards = ({recipe}: Props) => {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title}/>
            <div className="recipe-card-title">
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
};

export default RecipeCards;