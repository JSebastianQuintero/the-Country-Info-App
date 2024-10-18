export interface Country {
    countryCode: string;
    name: string;
}

export interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: string[] | null;
}

export interface PopulationData {
    year: number;
    value: number;
}

export interface CountryData {
    borderCountries: BorderCountry[];
    populationData: PopulationData[];
    flagUrl: string;
}
