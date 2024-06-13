'use client'
import {Dropdown} from '@/app/components/dropdown';
import {
    FilterList,
    getCategories,
    IsOpen,
    ListLocations,
    ListSorting,
    PlaceInfo,
    SortList,
    filter
} from "@/app/locationManager";
import {useEffect, useMemo, useRef, useState} from "react";
import {ListPopup} from "@/app/list/popup";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

export default function LaListe() {
    const router = useRouter();
    const searchParams = useSearchParams()
    
    const types = getCategories();
    const tarifs = ["Variable", "Gratuit", "€", "€€", "€€€"];
    const localisations = ["Laval", "Périphérie"];
    const status = ["Ouvert", "Fermé"];
    
    const sorts = ["Nom", "Prix croissant", "Prix décroissant", "Type"];
    
    const [search, setSearch] = useState("");
    const [selectedTypes, setTypes] = useState(types);
    const [selectedPrices, setPrices] = useState(tarifs.map((v, i) => i));
    const [selectedLocations, setLocations] = useState(localisations);
    const [selectedStatus, setStatus] = useState([0, 1]);
    
    const [selectedSort, setSort] = useState(0);
    
    const [openPlace, setOpenPlace] = useState(searchParams ? ((searchParams.get("place") || -1 ) as number) : -1);
    
    let [results, setResults] = useState(FilterList(SortList(ListLocations(), selectedSort), filter, {search: search, types: selectedTypes, prices: selectedPrices, locations: selectedLocations, status: selectedStatus}, 15));
    let [hasMore, setHasMore] = useState(results.length >= 15);
    let page = useRef(0);

    useMemo(() => {
        console.log("Nombre de lieux: " + ListLocations().length);
    }, [false]);

    useEffect(() => {
        page.current = 0;
        let res = FilterList(SortList(ListLocations(), selectedSort), filter, {search: search, types: selectedTypes, prices: selectedPrices, locations: selectedLocations, status: selectedStatus}, 15, 0);
        setResults(res);
        setHasMore(res.length >= 15)
    }, [search, selectedTypes, selectedPrices, selectedLocations, selectedStatus, selectedSort]);
    
    let getMore = () => {
        page.current = page.current + 1;
        let newRes = FilterList(SortList(ListLocations(), selectedSort), filter, {search: search, types: selectedTypes, prices: selectedPrices, locations: selectedLocations, status: selectedStatus}, 15, page.current);
        if (newRes.length <= 0) {
            setHasMore(false);
            return;
        }
        setResults(results.concat(newRes));
    }

    useEffect(() => {
        document.body.style.overflow = openPlace >= 0 ? "hidden" : "auto";
        //document.body.style.paddingRight = openPlace >= 0 ? "15.5px" : "0px";
        return () => {
            document.body.style.overflow = "auto";
            //document.body.style.paddingRight = "0px";
        };
    }, [openPlace]);
    
    return (
        <main className={"flex flex-grow flex-col"}>
            <div className={"flex flex-col p-1 pb-2 mx-[10%] bg-gray-100 dark:bg-gray-800 border-2 border-t-0 border-gray-300 dark:border-gray-700 rounded-b-xl mb-10"}>
                <input className={"m-2 p-2 mb-3 border-2 border-[#f28e77] rounded-lg bg-gray-200 dark:bg-gray-700 text-lg md:text-xl"} placeholder={"Recherche"} onChange={(val) => setSearch(val.target.value)} />
                <div className={" flex flex-row flex-wrap lg:flex-nowrap mx-2 justify-around lg:justify-start"}>
                    <div className={"w-full lg:w-min min-w-0 flex justify-between lg:justify-start md:mx-2 lg:mx-0"}>
                        <Dropdown className={"w-full lg:w-auto lg:flex-grow min-w-0"} items={types} changed={(val: number[]) => setTypes(val.map((v) => types[v]))} />
                        <Dropdown className={"w-full lg:w-auto lg:ml-4 min-w-0"} items={tarifs} changed={(val: number[]) => setPrices(val)} />
                    </div>
                    <div className={"w-auto flex-grow min-w-0 flex justify-around md:mx-2 lg:mx-0"}>
                        <Dropdown className={"w-full lg:w-auto lg:ml-4"} items={localisations} changed={(val: number[]) => setLocations(val.map((v, i) => localisations[v]))} />
                        <Dropdown className={"w-full lg:w-auto mx-1.5 lg:mx-4"} items={status} changed={(val: number[]) => setStatus(val)} />
                        <Dropdown className={"w-14 md:w-1/2 lg:w-36 ml-0 lg:ml-auto"} items={sorts} single changed={(val: number[]) => setSort(val[0])} />
                    </div>
                </div>
            </div>
    
            <div className={"flex flex-col mx-[1rem] lg:mx-[15%]"}>
                <InfiniteScroll
                    dataLength={results.length} //This is important field to render the next data
                    next={getMore}
                    hasMore={hasMore}
                    loader={<p className={"text-center my-4 mt-6 font-semibold text-lg"}>Chargement...</p>}
                    endMessage={
                        <p className={"text-center my-4 mt-6 font-semibold text-lg"}>
                            <b>Fin des résultats.</b>
                        </p>
                    }
                >
                {
                    results.map((data, index) => <Item key={index} placeInfo={data} onOpened={(ind: number) => {setOpenPlace(ind); /*router.replace("?place="+ind)*/}}></Item>)
                }
                </InfiniteScroll>
            </div>
    
            <div className={"absolute top-0 bottom-0 left-0 right-0 pointer-events-none"}>
                <ListPopup placeId={openPlace} onClosed={() => {setOpenPlace(-1); /*router.replace("/list")*/}} />
            </div>
        </main>
    )
}

function Item({placeInfo, onOpened}: {placeInfo: PlaceInfo, onOpened: Function}) {
    const isOpen = IsOpen(placeInfo);
    
    return (
        <div className={"bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6] rounded-xl shadow-lg shadow-gray-400 dark:shadow-gray-900 m-2 mb-5 p-[3px]"}>
            <div className={"flex flex-row rounded-[0.65rem] p-2 bg-white bg-gradient-to-br from-white to-gray-100 dark:bg-none dark:bg-gray-700"}>
                <Image alt="Logo" src={placeInfo.icon ? placeInfo.icon : "/logo_white.png"} width={48} height={48} className={"p-2 m-auto aspect-auto w-[54px] md:w-[72px] lg:w-[128px] absolute md:static mt-0 md:mt-auto"} />
                <div className={"flex-grow flex flex-col md:ml-2"}>
                    <div className={"flex mb-2 ml-[56px] md:ml-0 flex-col md:flex-row"}>
                        <h3 className={"font-semibold text-2xl lg:text-3xl mr-auto"}>{placeInfo.name}</h3>
                        <div className={"flex"}>
                            <p className={"text-blue-400 font-semibold text-sm md:text-base text-center place-self-center min-w-[2rem] border-[1.5px] rounded-xl border-gray-300 dark:border-gray-600 p-1 pb-0 ".concat((placeInfo.price == undefined || placeInfo.price < 0) ? "hidden" : "")}>{["Gratuit", "€", "€€", "€€€"][placeInfo.price || 0]}</p>
                            <p className={"text-gray-400 font-semibold text-sm md:text-base place-self-center text-right italic ml-2 border-[1.5px] rounded-xl border-gray-300 dark:border-gray-600 p-1 pb-0"}>{placeInfo.type}</p>
                        </div>
                    </div>
                    <p className={"flex-grow text-base md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 text-ellipsis line-clamp-3"}>{placeInfo.description}</p>
                    
                    <div className={"items-center flex flex-col md:grid grid-cols-3 w-full mt-4"}>
                        <div className={""}>
                            {   
                                (placeInfo.rating != undefined && placeInfo.rating >= 0) ? (
                                    [1, 2, 3, 4, 5].map((val) => <Image key={val} alt={"rating"} src={(placeInfo.rating || -1)+1 > val ? "/star_full.svg" : "/star.svg"} width={24} height={24} className={"inline"}/>)
                                ) : null
                            }
                        </div>
                        
                        <b className={"text-center font-medium text-base md:text-lg lg:text-xl ml-[10px] mr-[1rem] lg:-ml-[144px] underline underline-offset-2 text-blue-400 hover:text-blue-300 cursor-pointer"} onClick={() => onOpened(placeInfo.id)}>Voir plus d&rsquo;informations</b>
                        
                        <div className={"flex place-content-end"}>
                            <p className={"text-sm md:text-base lg:text-xl text-center ".concat(isOpen ? "text-green-400" : "text-red-400")}>{isOpen ? "Actuellement ouvert" : "Actuellement fermé"}</p>
                            {
                                placeInfo.address ?
                                    <Link className={"font-medium text-blue-400 hover:text-blue-300 ml-5 underline underline-offset-2 text-sm md:text-base lg:text-xl"} href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(placeInfo.address) + "&travelmode=walking"} target="_blank">
                                        Itinéraire
                                    </Link>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
