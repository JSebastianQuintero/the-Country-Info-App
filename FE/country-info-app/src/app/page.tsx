import { CountryListComponent } from "@components/list";

export default function Home() {

  return (
    <div className="grid grid-cols-12 grid-rows-12 p-4 w-full h-dvh">
      <div className={`col-span-12 row-span-1`}>
        <h1 className="text-xl uppercase font-semibold text-center">
          List of countries
        </h1>
      </div>
      <div className={`col-span-10 col-start-2 row-span-10 overflow-auto border`}>
        <CountryListComponent/>
      </div>
      <span className={`col-span-12 row-span-1 text-center p-1 dark:text-white/40 text-black/40`}>
        click on one country to see more info!
      </span>
    </div>
  );
}
