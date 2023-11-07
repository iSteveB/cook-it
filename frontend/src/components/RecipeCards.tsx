import { Recipe } from "../types";
import { AiOutlineHeart} from 'react-icons/ai'

interface Props {
    recipe: Recipe
    onClick: ()=>void;
    onFavButtonClick: (recipe: Recipe)=>void;
}

const RecipeCards = ({recipe, onClick, onFavButtonClick}: Props) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <img src={recipe.image} alt={recipe.title}/>
            <div className="recipe-card-title">
                <span onClick={(event)=>{
                    event.stopPropagation();
                    onFavButtonClick(recipe)
                }}>
                    <AiOutlineHeart size={25} />
                </span>
                <h3>{recipe.title}</h3>
            </div>
        </div>
    );
};

export default RecipeCards;