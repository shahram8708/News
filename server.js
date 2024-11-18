const express = require('express');
const axios = require('axios');
const NewsAPI = require('newsapi');
const app = express();

const newsapi = new NewsAPI('API_Key'); 

app.use(express.static('public'));

app.get('/news', async (req, res) => {
    const { query } = req.query; 
    try {
        let response;
        if (query) {
            response = await newsapi.v2.everything({
                q: query,
                language: 'en',
            });
        } else {
            response = await newsapi.v2.topHeadlines({
                country: 'us',
                language: 'en',
            });
        }
        res.send(response.articles);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
