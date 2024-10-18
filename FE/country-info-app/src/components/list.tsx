"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BorderCountry, Country } from "@interfaces/country"
import Link from 'next/link'


export function CountryListComponent() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/countries/`);
            setCountries(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch countries');
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <div className="w-full flex flex-col divide-y-2 overflow-hidden">
            {countries.map((country: Country, index) => (
                <Link
                    key={`country${index}`}
                    className="p-3 capitalize hover:bg-black/10"
                    href={`/country/${country.countryCode}/${country.name}`}>
                    {country.name}
                </Link>
            ))}
            {error && <div className="text-red-500 w-full p-4 text-center">{error}</div>}
            {countries.length === 0 && !error && <div className='w-full p-4 text-center'>Loading...</div>}
        </div>
    );
}

}