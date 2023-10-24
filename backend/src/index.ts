import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async( req, res) => {
    res.json({message: 'success!'})
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})