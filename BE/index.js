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
    console.log(`looking for country information with code: ${countryCode}`);
    try {
        const countryInfoResponse = await axios.get(
            `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
        );
        const borderCountries = countryInfoResponse.data.borders;

        const populationResponse = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/population",
            {
                country: countryInfoResponse.data.commonName,
            }
        );
        const populationData = populationResponse.data.data.populationCounts;

        const flagResponse = await axios.post("https://countriesnow.space/api/v0.1/countries/flag/images", {
            iso2: countryCode
        });
        const flagUrl = flagResponse.data.data.flag;

        const countryData = {
            borderCountries,
            populationData,
            flagUrl
        };

        res.json(countryData);
    } catch (error) {
        res.status(500).send("Error fetching country information");
    }
});

app.listen(port, () => {
    console.log(`Country API listening on port ${port} :D`);
});
