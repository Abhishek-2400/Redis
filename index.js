import express from "express";
import client from './client.js';  // Redis client to interact with Redis

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    try {
        const cachevalue = await client.get('cachevalue');
        if (cachevalue) {
            return res.json(JSON.parse(cachevalue)); // Parse the cached string back to JSON
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        await client.set('cachevalue', JSON.stringify(data)); // Stringify the JSON before storing
        await client.expire('cachevalue', 60);

        res.json({ data });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
