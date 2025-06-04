const express = require('express');
const app = express();

app.get('/status', (req, res) => {
    res.status(200).json({ status: "Running" });
});

app.get('/data', (req, res) => {
    res.status(200).json({ message: "Hello world!" });
});

module.exports = app;