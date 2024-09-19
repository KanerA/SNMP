const express = require("express")

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("Server is Running on port: ", PORT);
});