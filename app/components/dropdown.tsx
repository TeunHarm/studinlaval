import {Dispatch, useState} from "react";

export function Dropdown({className, items, changed, single, allText = ""} : {className: string, items: string[], changed: Function, single?: boolean, allText?: string}) {
    const [selected, setSelected] = useState(single ? [0] : items.map((val, ind) => ind));
    const [show, setShow] = useState(false);
    const max = 5;
    
    let active = "";
    let count = 0;
    if (single) {
        active = items[selected[0]];
    }
    if (allText != "" && selected.length === items.length) {
        active = allText
    }
    else
    {
        items.forEach((item, ind) => {
            if (selected.includes(ind)) {
                count++;
                if (count === max) {
                    active += "..."
                }
                else if (count < max) {
                    active += item;
                    if (count < selected.length)
                        active += " • "
                }
            }
        });
    }
    
    const onChanged = (key: number, e: React.MouseEvent) => {
        if (single || e.shiftKey) {
            let updated = [key];
            setSelected(updated);
            changed(updated);
            return;
        }
        
        let updated = [...selected]
        if (updated.includes(key)) {
            if (updated.length > 1)
                updated.splice(updated.indexOf(key), 1);
        }
        else {
            updated.push(key);
        }
        setSelected(updated);
        changed(updated);
    };
    
    return (
        <div className={className.concat(" max-w-[max(49%,5rem)] lg:max-w-5xl")} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <button className={"border-2 border-[#f28e77] rounded-lg text-xs md:text-base bg-gray-200 dark:bg-gray-700 p-1 px-3 w-full whitespace-nowrap overflow-clip overflow-ellipsis"}>
                {active}
            </button>
            
            <div className={"pt-2 relative z-50 transition-opacity ".concat(show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
                <div className={"absolute w-min min-w-[max(150px,40%)] lg:min-w-[max(200px,40%)] right-0 md:left-0 p-1 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg shadow-gray-900 rounded-lg flex flex-col"}>
                    { items.map((item, ind) => <DropdownItem key={ind} ind={ind} name={item} active={selected.includes(ind)} callback={onChanged} />) }
                </div>
            </div>
        </div>
    )
}

function DropdownItem({ind, name, active, callback} : {ind: number, name: string, active: boolean, callback: (ind: number, e: React.MouseEvent)=>void}) {    
    return (
        <button className={"hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg"} onClick={(e: React.MouseEvent) => callback(ind, e)}>
            <div className={"flex"}>
                <p className={"flex-grow text-left pr-4 py-0.5"}>{name}</p>
                <span className={"min-w-[12px] text-blue-400 font-semibold"}> { active ? "✓" : "" } </span>
            </div>
        </button>
    )
}