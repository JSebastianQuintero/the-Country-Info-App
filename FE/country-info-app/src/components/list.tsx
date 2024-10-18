export function ListComponent({list}: {list: string[]}) { 
    return (
        <div className="w-full border flex flex-col divide-y-2 overflow-hidden">
            {list.map((item, index) => (
                <button key={`country${index}`} className="p-3 capitalize hover:bg-black/10">{item}</button>
            ))}
        </div>
    );
}