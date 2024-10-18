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

const fetchCountryInfo = async (countryCode) => {
    try {
        const countryInfoResponse = await axios.get(
            `${nagerDateUrl}/CountryInfo/${countryCode}`
        );
        return countryInfoResponse.data;
    } catch (error) {
        console.error(`Error fetching country info for ${countryCode}`);
        return("Error fetching country information");
    }
};

const fetchPopulationData = async (countryName) => {
    try {
        const populationResponse = await axios.post(
            `${postmanUrl}/population`,
            { country: countryName },
            { headers: { "Content-Type": "application/json" } }
        );
        return populationResponse.data.data.populationCounts;
    } catch (error) {
        console.error(`Error fetching population data for ${countryName}`);
        return ("Error fetching population data");
    }
};

const fetchFlagUrl = async (countryCode) => {
    try {
        const flagResponse = await axios.post(
            `${postmanUrl}/flag/images`,
            { iso2: countryCode },
            { headers: { "Content-Type": "application/json" } }
        );
        return flagResponse.status === 200 ? flagResponse.data.data.flag : "";
    } catch (error) {
        console.error(`Error fetching flag for ${countryCode}:`);
        return("Error fetching flag");
    }
};


app.get("/countries/:countryCode", async (req, res) => {
    const { countryCode } = req.params;
    console.log(`Looking for country information with code: ${countryCode}`);
    
    try {
        const countryInfo = await fetchCountryInfo(countryCode);
        const borderCountries = countryInfo.borders;
        const populationData = await fetchPopulationData(countryInfo.commonName);
        const flagUrl = await fetchFlagUrl(countryCode);

        const countryData = {
            commonName: countryInfo.commonName,
            borderCountries,
            populationData,
            flagUrl,
        };

        res.json(countryData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching country information");
    }
});

app.listen(port, () => {
    console.log(`Country API listening on port ${port} :D`);
});
