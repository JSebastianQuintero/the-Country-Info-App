require('dotenv').config();
const express = require("express");
const axios = require("axios");
var cors = require('cors')
const app = express();
const port = 8000;

app.use(cors())

const nagerDateUrl = process.env.NAGER_DATE_URL;
const postmanUrl = process.env.POSTMAN_URL;

app.get("/countries", async (req, res) => {
    try {
        const response = await axios.get(`${nagerDateUrl}/AvailableCountries`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching available countries");
    }
});

app.get("/countries/:countryCode", async (req, res) => {
    const { countryCode } = req.params;
    console.log(`looking for country information with code: ${countryCode}`);
    try {
        const countryInfoResponse = await axios.get(
            `${nagerDateUrl}/CountryInfo/${countryCode}`
        );
        const borderCountries = countryInfoResponse.data.borders;

        const populationResponse = await axios.post(`${postmanUrl}/population`, {
            country: countryInfoResponse.data.commonName,
        });
        const populationData = populationResponse.data.data.populationCounts;

        const flagResponse = await axios.post(`${postmanUrl}/flag/images`, {
            iso2: countryCode,
        });
        const flagUrl = flagResponse.data.data.flag;

        const countryData = {
            borderCountries,
            populationData,
            flagUrl,
        };

        res.json(countryData);
    } catch (error) {
        res.status(500).send("Error fetching country information");
    }
});

app.listen(port, () => {
    console.log(`Country API listening on port ${port} :D`);
});
