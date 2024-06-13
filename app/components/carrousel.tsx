'use client'

import {Montserrat} from "next/font/google";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {PlaceInfo} from "@/app/locationManager";

const inter = Montserrat({ subsets: ['latin'] })


export default function Carrousel({name, reverse, gradient, items} : {name: string, reverse: boolean, gradient: string, items: {}[]}) {
    return (
        /*<div className={"bg-gray-300 dark:bg-gray-700 h-[200px] p-2 mx-[15%] rounded-2xl border-2 border-gray-400 dark:border-gray-600 drop-shadow-lg"}>
            <h3 className={"text-center text-2xl font-semibold"}>{name}</h3>
        </div>*/
        
        <div className={"w-full my-6 h-auto 2xl:h-[350px] p-5 flex flex-col 2xl:grid shadow-lg shadow-none shadow-gray-400 dark:shadow-black"} style={{background: "linear-gradient(" + gradient + ")", gridTemplateColumns: (reverse ? "auto 30%" : "30% auto")}}>
            <div className={"2xl:m-auto pb-5 2xl:pb-[10rem] flex flex-row " + (reverse ? "order-1 2xl:pl-20" : "2xl:pr-20")}>
                <h3 className={inter.className.concat(" text-white font-bold text-2xl lg:text-4xl 2xl:text-5xl tracking-wider ").concat(reverse ? "text-right" : "text-left")} /*style={{textShadow: "1.5px 1.5px 5px rgba(200,200,200,0.45), -1.5px -1.5px 5px rgba(20,20,20,0.8)"}}*/>{name.toUpperCase()}</h3>
            </div>
            
            <div className={"flex flex-wrap 2xl:flex-nowrap place-content-around items-center"}>
                {
                    // @ts-ignore
                    items.map((data, ind) => <Item key={ind} itemInfo={data}/>)
                }
            </div>
        </div>
    );
}

function Item({itemInfo} : {itemInfo: PlaceInfo}) {
    const router = useRouter();
    
    return (
        <div className={"flex flex-col p-4 mb-5 2xl:mb-0 border-4 border-white rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:to-gray-300 shadow-lg shadow-black/50"} /*style={{boxShadow: "1.5px 1.5px 15px rgba(200,200,200,0.45), -1.5px -1.5px 5px rgba(20,20,20,0.8)"}}*/>
            <div className={"flex flex-col w-[100px] h-[129px] md:w-[150px] md:h-[172px] 2xl:w-[200px] 2xl:h-[258px] place-content-center"}>
                <Image className={"place-self-center mb-2 aspect-auto 2xl:w-[96px]"} src={itemInfo.icon ? itemInfo.icon : "/logo_white.png"} alt="Icon" width={48} height={48} />
                <div className={"text-center dark:text-black leading-3"}>
                    <b className={"text-sm 2xl:text-base"}>{itemInfo.name}</b>
                    <p className={"text-xs 2xl:text-base text-ellipsis overflow-hidden line-clamp-3"}>{itemInfo.description}</p>
                </div>
            </div>
            <b className={"mx-auto font-semibold -mb-3 text-blue-400 hover:text-blue-300 text-sm 2xl:text-base underline cursor-pointer"} onClick={() => {router.push("/list?place="+itemInfo.id)}}>En savoir plus</b>
        </div>
    );
}