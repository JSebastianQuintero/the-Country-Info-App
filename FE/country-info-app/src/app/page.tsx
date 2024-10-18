"use client";
import { CountryListComponent } from "@components/list";
import { useState } from "react";
import { Country } from "@interfaces/country";
import { clsx } from "clsx";

export default function Home() {
  const [selected, setSelected] = useState<Country | null>(null);

  return (
    <div className="grid grid-cols-12 grid-rows-8 p-4 w-full h-dvh">
      <div className={clsx("row-span-1", {
        "col-span-12": selected === null,
        "col-span-2": selected !== null
      })}>
        <h1 className="text-xl uppercase font-semibold text-center">
          List of countries
        </h1>
      </div>
      <div className={clsx("row-span-4 overflow-auto border", {
        "col-span-10 col-start-2": selected === null,
        "col-span-2 col-start-1": selected !== null
      })}>
        <CountryListComponent selectedCountry={selected} setCountry={setSelected} />
      </div>
      <span className={clsx("text-center p-1 dark:text-white/40 text-black/40", {
        "col-span-12 row-span-1": selected === null,
        "col-span-2 col-start-1": selected !== null
      })}>
        click on one country to see more info!
      </span>
      {selected && (
        <div className="col-span-10 col-start-3 row-start-1 row-span-8 p-4">
          
        </div>
      )}
    </div>
  );
}
