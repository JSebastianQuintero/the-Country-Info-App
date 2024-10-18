"use client"
import { useParams } from 'next/navigation';
import { CountryData } from "@interfaces/country";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BorderCountryListComponent } from '@/components/list';
import { PopulationChart } from "@components/graph"
import Link from 'next/link';

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
                    <div className='grid grid-cols-12'>
                        <ul className="col-span-12 lg:col-span-4 p-1">
                            <div className="border">
                                <h2 className='text-lg font-bold p-3 text-center border-b'>Border Countries</h2>
                                <BorderCountryListComponent countries={countryData.borderCountries} />
                            </div>
                                <span className='text-center block text-black/40 dark:text-white/40'>You can click on other countries</span>
                        </ul>
                        <div className='col-span-12 lg:col-span-8 p-1'>
                            <div className='border p-2'>
                                <PopulationChart populationData={countryData.populationData} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full pt-4 flex justify-center'>
                        <Link className='p-3 border rounded hover:bg-black/10 dark:hover:bg-white/10' href={"/"}>Country list</Link>
                    </div>
                </div>
            )}
            {error && <div className="text-red-500 w-full p-4 text-center">{error}</div>}
        </div>
    );
}