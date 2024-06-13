'use client'

import {useState} from "react";
import Image from "next/image"

export function ImageGallery({items, opened}: {items: string[], opened: (url: string)=>void}) {
    let [current, setCurrent] = useState(0);
    
    let move = (delta: number) => {
        let newInd = current + delta;
        while (newInd < 0)
            newInd += items.length;
        newInd = newInd % items.length;
        setCurrent(newInd);
    }
    
    return (
        <div className={"flex flex-col h-full place-content-center"}>
            <div className={"flex flex-grow place-content-center"}>
                <button className={"mx-2 font-semibold text-xl text-black dark:text-white ".concat(items.length == 1 ? "hidden" : "")} onClick={() => move(-1)}>&#60;</button>
                <GalleryItem url={items[current]} opened={opened}/>
                <button className={"mx-2 font-semibold text-xl text-black dark:text-white ".concat(items.length == 1 ? "hidden" : "")} onClick={() => move(1)}>&#62;</button>
            </div>
            <div className={"flex place-content-center ".concat(items.length == 1 ? "hidden" : "")}>
                {
                    items.map((url, ind) => <p key={ind} className={"text-xl font-bold ".concat(ind == current ? "text-black dark:text-white" : "text-gray-500")}>•</p>)
                }
            </div>
        </div>
    );
}

function GalleryItem({url, opened}: {url: string, opened: (url: string)=>void}) {
    let [ready, setReady] = useState(false);

    return (
        <div className={"h-[100px] lg:h-[200px] w-1/2 relative"}>
            <Image src={url} alt={"Image"} width={200} height={200} priority={true} className={"block w-auto h-full rounded-xl mx-auto cursor-zoom-in ".concat(ready ? "" : "opacity-0")} onClick={() => opened(url)} onLoad={() => {setReady(true);}} />
            {
            ready ? null :
            <div className={"absolute flex top-0 w-full h-full bg-black/40 rounded-xl"}>
                <p className={"m-auto font-bold"}>Chargement</p>
            </div>
            }
        </div>
    )
}
