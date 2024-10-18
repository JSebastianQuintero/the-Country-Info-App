"use client"
import { useParams } from 'next/navigation';
import { CountryData } from "@interfaces/country";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BorderCountryListComponent } from '@/components/list';

export default function CountryPage() {
    const { countryCode, countryName } = useParams();
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/countries/${countryCode}`);
                setCountryData(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch country data');
            }
        };

        fetchCountryData();
    }, [countryCode]);

    return (
        <div>
            {countryData && (
                <div>
                    <div className="p-4 flex">
                        <h1 className='text-4xl font-bold uppercase text-center w-full'>
                        {countryName}
                        </h1>
                        <Image className='' src={countryData.flagUrl} alt={`${countryCode} flag`} width={70} height={70} />
                    </div>

                </div>
            )}
            {error && <div className="text-red-500 w-full p-4 text-center">{error}</div>}
        </div>
    );
}