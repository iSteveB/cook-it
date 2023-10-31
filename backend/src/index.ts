import express from 'express';
import cors from 'cors';
import * as RecipeAPI from './recipe-api';

const app = express();

app.use(cors());

app.use(express.json());


app.get('/api/recipes/search', async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);

    const results = await RecipeAPI.searchRecipes(searchTerm, page);

    return res.json(results);
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;

    const results = await RecipeAPI.getRecipeSummary(recipeId);

    return res.json(results);
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})