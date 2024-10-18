"use client";
import { CountryListComponent } from "@components/list";
import { useState } from "react";
import { Country } from "@interfaces/country";

export default function Home() {
  const [selected, setSelected] = useState<Country | null>(null);

  return (
    <div className="grid grid-cols-12 grid-rows-8 p-4 w-full h-dvh">
      <div className="col-span-12 row-span-1">
        <h1 className="text-xl uppercase font-semibold text-center">
          List of countries
        </h1>
      </div>
      <div className="col-span-10 col-start-2 row-span-4 overflow-auto border">
        <CountryListComponent selectedCountry={selected} setCountry={setSelected}/>
      </div>
      <span className="col-span-12 row-span-1 text-center p-1 dark:text-white/40 text-black/40">
        click on one country to see more info!
      </span>
    </div>
  );
}
