import {Rubik} from "next/font/google";
import {PlaceInfo, IsOpen, FormatHour} from "@/app/locationManager";
import Link from "next/link";

const inter = Rubik({ subsets: ['latin'] })

export default function PlaceDescriptor({placeInfo} : {placeInfo: PlaceInfo}) {
    const open = IsOpen(placeInfo);
    
    return (
    <div className={inter.className.concat(" flex flex-col min-w-[270px]")}>
        <b className={"block mb-3 text-center text-lg"}>{placeInfo.name}</b>

        <p className={"text-justify !m-0 !mb-3" + (placeInfo.description ? "" : "hidden")}>
            {placeInfo.description}
        </p>
        
        <div className={"flex flex-row items-start"}>
            <b>Adresse: </b>
            <span className={"w-2"}></span>
            <p className={"!m-0"}>{placeInfo.address}</p>
        </div>

        <span className={"h-1 " + (placeInfo.website ? "" : "hidden")}></span>
        <div className={"flex flex-row items-center " + (placeInfo.website ? "" : "hidden")}>
            <b>Site web: </b>
            <span className={"w-2"}></span>
            <Link className={"!m-0"} href={(placeInfo.website?.startsWith("http") ? "" : "https://") + placeInfo.website} target="_blank">{placeInfo.website ? placeInfo.website : ""}</Link>
        </div>

        <span className={"h-1 " + (placeInfo.phone ? "" : "hidden")}></span>
        <div className={"flex flex-row items-center " + (placeInfo.phone ? "" : "hidden")}>
            <b>Téléphone: </b>
            <span className={"w-2"}></span>
            <p className={"!m-0"}>{placeInfo.phone ? placeInfo.phone : ""}</p>
        </div>
        
        <div className={"mt-1 flex flex-row items-center"}>
            <b>Horaires: </b>
            <span className={"w-2"}></span>
            <p className={open ? "text-green-500 !m-0" : "text-red-400 !m-0"}>{open ? "Actuellement ouvert" : "Actuellement fermé"}</p>
        </div>
        <div className={"ml-3"}>
            {getHours(placeInfo)}
        </div>

        {/*<div className={"mt-1 flex " + (placeInfo.prices.length > 1 ? "flex-col" : "")}>
            <b>Tarifs: </b>
            {getPrices(placeInfo)}
        </div>*/}
        
        <div className={"flex flex-row mt-3"}>
            {
                placeInfo.address ?
                <Link className={"w-full mr-2"} href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(placeInfo.address) + "&travelmode=walking"} target="_blank">
                    <button className={"w-full bg-blue-100 transition-colors hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded active:pt-[0.55rem] active:pb-[0.45rem] active:bg-blue-600 active:border-blue-700"}>
                        <b className={"font-semibold tracking-wide"} style={{fontSize: "0.85rem"}}>Itinéraire</b>
                    </button>
                </Link>
                : null
            }
            <Link className={"w-full"} href={"/list?place="+placeInfo.id} target="_self">
                <button className={"w-full bg-blue-100 transition-colors hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded active:pt-[0.55rem] active:pb-[0.45rem] active:bg-blue-600 active:border-blue-700"}>
                    <b className={"font-semibold tracking-wide"} style={{fontSize: "0.85rem"}}>En savoir plus</b>
                </button>
            </Link>
        </div>
    </div>
    );
}

function getHours(placeInfo: PlaceInfo) {
    if (!placeInfo.hours) {
        return (
            <b className={"text-red-600"}>Pas d&lsquo;horaires</b>
        );
    }

    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    return placeInfo.hours.map((dayHours, ind) => {
        return (
            <div key={ind} className={"grid w-auto"} style={{gridTemplateColumns: "7rem repeat(" + Math.max(dayHours.length/2, 1) + ", 6rem"}}>
                <b>{"• " + days[ind] + ":"}</b>
                {
                    (dayHours.length < 1) ?
                        <p className={"!m-0 text-red-400"}>{"Fermé"}</p>
                        :
                        dayHours.filter((hours, ind) => !(ind % 2)).map((hour, ind2) => (
                            <p key={ind} className={"!m-0"}>{FormatHour(hour) + " - " + FormatHour(dayHours[ind2*2+1])}</p>
                        ))
                }
            </div>
        );
    });
}

function getPrices(placeInfo: PlaceInfo) {
    if (!placeInfo.prices) {
        return (
            <p className={"!m-0 !ml-1"}>Pas de tarifs</p>
        );
    }

    if (placeInfo.prices.length == 1) {
        return (
            <p className={"!m-0 !ml-1"}>{placeInfo.prices[0]}</p>
        );
    }

    return placeInfo.prices.map((price, ind) => {
        if (ind > 4) return;
        return (
            <div key={ind} className={"grid ml-3"} style={{gridTemplateColumns: "7rem 5rem"}}>
                <b>{"• " + price[0] + ":"}</b>
                <p className={"!m-0"}>{price[1] + " €"}</p>
            </div>
        )
    });
}