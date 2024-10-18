"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from "@interfaces/country"

export function CountryListComponent(
    { selectedCountry, setCountry }:
        { selectedCountry: Country | null, setCountry: (country: Country | null) => void }
) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/countries/`);
            setCountries(response.data);
        } catch (err) {
            setError('Error fetching countries');
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <div className="w-full flex flex-col divide-y-2 overflow-hidden">
            {countries.map((country: Country, index) => (
                <button key={`country${index}`} className="p-3 capitalize hover:bg-black/10"
                    onClick={() => country === selectedCountry ? setCountry(null) : setCountry(country)}
                >{selectedCountry ? country.countryCode : country.name}
                </button>
            ))}
            {error && <div className="text-red-500 w-full p-4 text-center">{error}</div>}
            {countries.length === 0 && !error && <div className='w-full p-4 text-center'>Loading...</div>}
        </div>
    );
}