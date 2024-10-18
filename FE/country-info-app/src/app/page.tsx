import { ListComponent } from "@components/list";

export default function Home() {
  return (
    <div className="grid grid-cols-12 p-4 w-full max-h-dvh">
      <div className="col-span-12">
        <h1 className="text-xl uppercase font-semibold text-center">
          List of countries
        </h1>
      </div>
      <div className="col-span-10 col-start-2">
        <ListComponent list={["argentina", "brasil"]}></ListComponent>
      </div>
      <span className="col-span-12 text-center dark:text-white/40 text-black/40">click on one country to see more info!</span>
    </div>
  );
}
