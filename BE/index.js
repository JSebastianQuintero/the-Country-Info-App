const express = require("express");
const axios = require("axios");
const app = express();
const port = 8000;

app.get("/countries", async (req, res) => {
        try {
                const response = await axios.get(
                        "https://date.nager.at/api/v3/AvailableCountries"
                );
                res.json(response.data);
        } catch (error) {
                res.status(500).send("Error fetching available countries");
        }
});

app.get("/countries/:countryCode", async (req, res) => {
        const { countryCode } = req.params;
        console.log(
                `looking for country information with code: ${countryCode}`
        );
        try {
                const countryInfoResponse = await axios.get(
                        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
                );
                const borderCountries = countryInfoResponse.data.borders;
                res.json(borderCountries);
        } catch (error) {
                res.status(500).send("Error fetching country information");
        }
});

app.listen(port, () => {
        console.log(`Country API listening on port ${port} :D`);
});
