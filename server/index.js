const express = require("express");
const bodyParser = require("body-parser");
const { getDataFromAgent, setDataOnAgent, getBulkDataFromAgent } = require("./snmpHelpers");

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    if (!req.query) return res.sendStatus(400);
    const { oids } = req.query;
    if (!oids?.length) return res.sendStatus(400);
    const results = await getBulkDataFromAgent(oids);
    res.json(results);
});

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("Server is Running on port: ", PORT);
});