const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;

app.get("/countries", async (req, res) => {
    try {
        const response = await axios.get("https://date.nager.at/api/v3/AvailableCountries");
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching available countries");
    }
});

app.listen(port, () => {
    console.log(`Country API listening on port ${port} :D`);
});

