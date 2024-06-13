import {PlaceInfo, FormatHour, ListLocations} from "@/app/locationManager";
import {createRef, useState} from "react";
import Image from "next/image";
import {ImageGallery} from "@/app/components/gallery";
import Link from "next/link";

export function ListPopup({placeId, onClosed}: {placeId: number, onClosed: Function}) {
    const place = ListLocations()[placeId];
    
    const [openImage, setOpenImage] = useState("");
    
    return (
        <div id={"closer"} className={"fixed top-0 left-0 bottom-0 right-0 flex bg-gradient-radial from-black/60 dark:from-black/80 to-black/40 transition-opacity duration-300 ".concat(placeId >= 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")} onClick={(e) => ((e.target as Element).id == "closer") ? onClosed() : null}>
            {
                placeId < 0 ? null :
                <div className={"relative flex flex-col text-xl m-auto w-[95%] md:w-1/3 md:min-w-[750px] max-h-[70%] p-2 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600 dark:shadow-gray-950 border-4 rounded-xl border-gray-300 dark:border-gray-700"}>
                    <div className={"absolute top-1 left-1"}>
                        {
                            (place.rating != undefined && place.rating >= 0) ? (
                                [1, 2, 3, 4, 5].map((val) => <Image key={val} alt={"rating"} src={(place.rating || -1)+1 > val ? "/star_full.svg" : "/star.svg"} width={24} height={24} className={"inline w-[16px] md:w-[24px] aspect-square"}/>)
                            ) : null
                        }
                    </div>
                    <b className={"block mb-2 text-2xl md:text-3xl text-center"}>{place.name}</b>
                    <p className={"absolute top-1 right-2 cursor-pointer"} onClick={() => onClosed()}>X</p>
                    
                    <div className={"flex flex-col -mr-1.5 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-transparent"}>
                        {
                        (place.gallery && place.gallery.length > 0) ?
                        <div className={"w-full my-1"}>
                            <ImageGallery items={place.gallery} opened={setOpenImage}/>
                        </div> : null
                        }
                            
                        <p>{place.description}</p>
    
                        {place.address ? <p className={"mt-4"}><b>Adresse : </b>{place.address}</p> : null}
                        {place.phone ? <p><b>Téléphone : </b>{place.phone}</p> : null}
                        {place.website ? <p><Link href={(place.website.startsWith("http") ? "" : "https://") + place.website} target="_blank" className={"text-blue-400 hover:text-blue-500 underline underline-offset-2"}>Accéder au site web</Link></p> : null}
        
                        <div className={"flex mt-4"}>
                            <div className={"flex-grow text-xl"}>
                                {
                                    (place.prices && place.prices.length > 0) ?
                                    <div className={"mb-4"}>
                                        <b className={"block mr-2"}>Tarifs: </b>
                                        <div className={"mx-2"}>
                                            {getPrices(place)}
                                        </div>
                                    </div> : null
                                }
        
                                <b className={"block"}>Horaires :</b>
                                <div className={"flex flex-col mx-2"}>
                                    {getHours(place)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                openImage != "" ?
                <div className={"absolute m-auto h-1/2 lg:h-2/3 top-0 bottom-0 left-0 right-0 p-2"}>
                    <Image src={openImage} alt={"Image"} height={600} width={600} className={"h-auto lg:h-full w-full lg:w-auto m-auto rounded-xl cursor-zoom-out"} onClick={() => setOpenImage("")}></Image>
                </div>
                : null
            }
        </div>
    )
}


function getPrices(placeInfo: PlaceInfo) {
    if (!placeInfo.prices) {
        return (
            <p className={"!m-0 !ml-1"}>Pas de tarifs</p>
        );
    }

    if (placeInfo.prices.length == 1) {
        return (
            <p>{placeInfo.prices[0]}</p>
        );
    }

    return (
        <div className={"mx-auto md:ml-0 dark:bg-gray-800 border-2 rounded-xl overflow-hidden border-gray-300 dark:border-gray-700"}>
            <table>
                <thead>
                <tr>
                    <td>
                        <b className={"block pl-2 text-base md:text-lg"}>Option</b>
                    </td>
                    <td className={"border-l-2 border-gray-300 dark:border-gray-600"}>
                        <b className={"block text-center text-base md:text-lg"}>Prix</b>
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    placeInfo.prices.map((price, ind) => (
                        <tr key={ind} className={"table-row border-spacing-1 ".concat(ind % 2 ? "bg-gray-200 dark:bg-gray-600" : "bg-gray-100 dark:bg-gray-700")}>
                            <td className={"w-full"}>
                                <b className={"pl-2 font-semibold text-black text-sm md:text-base dark:text-gray-200 pr-2"}>{price[0]}</b>
                            </td>
                            <td className={"px-2 border-l-2 border-gray-300 dark:border-gray-500"}>
                                <p className={"text-center whitespace-nowrap text-sm md:text-base"}>{price[1] +" €"}</p>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

function getHours(placeInfo: PlaceInfo) {
    if (!placeInfo.hours) {
        return (
            <b className={"text-red-500 font-medium"}>Horaires non recensés</b>
        );
    }

    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    /*return placeInfo.hours.map((dayHours, ind) => {
        return (
            <div key={ind} className={"grid w-auto"} style={{gridTemplateColumns: "10rem repeat(" + Math.max(dayHours.length/2, 1) + ", 10rem"}}>
                <b className={"text-base md:text-xl"}>{"• " + days[ind] + ":"}</b>
                {
                    (dayHours.length < 1) ?
                        <p className={"!m-0 text-red-400"}>{"Fermé"}</p>
                        :
                        dayHours.filter((hours, ind) => !(ind % 2)).map((hour, ind2) => (
                            <p key={ind} className={"!m-0 text-base md:text-xl"}>{FormatHour(hour) + " - " + FormatHour(dayHours[ind2*2+1])}</p>
                        ))
                }
            </div>
        );
    });*/

    return (
        <div className={"mx-auto md:ml-0 dark:bg-gray-800 border-2 rounded-xl border-gray-300 dark:border-gray-700"}>
            <table>
                <thead>
                <tr>
                    <td>
                        <b className={"block pl-2 text-base md:text-lg"}>Jour</b>
                    </td>
                    <td>
                        <b className={"block px-2 text-base md:text-lg"}>Horaires</b>
                    </td>
                </tr>
                </thead>
                <tbody>
                {
                    placeInfo.hours.map((dayHours, ind) => (
                        <tr key={ind} className={"table-row border-spacing-1 w-full "/*.concat(ind % 2 ? "bg-gray-300 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-700")*/}>
                            <td className={"pr-5"}>
                                <b className={"pl-2 font-semibold text-black max-w-[50vw] text-sm md:text-base dark:text-gray-200"}>{days[ind]}</b>
                            </td>
                            {
                                (dayHours.length < 1) ?
                                <td className={"px-2"}>
                                    <p className={"text-red-400 text-sm md:text-base"}>{"Fermé"}</p>
                                </td>
                                :
                                (
                                    (dayHours[0] == 0 && dayHours[1] == 24) ?
                                    <td className={"px-2"}>
                                        <p className={"text-sm md:text-base"}>{"Journée entière"}</p>
                                    </td>
                                    :
                                    dayHours.filter((hours, ind) => !(ind % 2)).map((hour, ind2) => (
                                        <td key={ind2} className={"px-2"}>
                                            <p className={"text-sm md:text-base"}>{FormatHour(hour) + " - " + FormatHour(dayHours[ind2*2+1])}</p>
                                        </td>
                                    ))
                                )
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
