const express = require("express");
const bodyParser = require("body-parser");
const { getDataFromAgent, setDataOnAgent } = require("./snmpHelpers");

const app = express();

app.use(bodyParser.json());

const PORT = 3001;

//  ROUTES - get, set, health

app.get('/', async (req, res) => {
    if (!req.query) return res.sendStatus(400);
    const { oids } = req.query;
    if (!oids?.length) return res.sendStatus(400);
    const results = await getDataFromAgent(oids);
    res.json(results);
});

app.post('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const { data } = req.body;
    const results = await setDataOnAgent(data);
    res.json(results);
});

app.get('/all', async (req, res) => {

});

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("Server is Running on port: ", PORT);
});