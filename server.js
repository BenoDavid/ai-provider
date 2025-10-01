const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8090;

app.use(bodyParser.json());
app.get('/', async (req, res) => {

    res.status(200).json({ msg: "Welcome to AI" });

});
app.post('/api/chat', async (req, res) => {
    try {
        const prompt = req.body.prompt || "Hello!";
        const resp = await axios.post('http://localhost:11434/api/generate', {
            model: "qwen2:0.5b",
            prompt: prompt,
            stream: false
        });
        res.json(resp.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Error talking to model" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
