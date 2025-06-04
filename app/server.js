const express = require('express');
const app = express();
const PORT = 3000;

app.get('/status', (req, res) => {
    res.status(200).json({status: "Running"});
});

app.get('/data', (req, res) => {
    res.status(200).json({message: "Hello world!"});
});

app.listen(PORT, () => {
    console.log(`Example API running on port ${PORT}`);
});
