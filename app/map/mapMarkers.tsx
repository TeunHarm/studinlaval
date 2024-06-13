'use client'

import {useState} from "react";
import {getCategories} from "@/app/locationManager";
import {Dropdown} from "@/app/components/dropdown";
import L, {latLng} from "leaflet";
import {Marker, Popup} from "react-leaflet";
import PlaceDescriptor from "@/app/map/placeDescriptor";
import {PlaceInfo, ListLocations, FilterList, filter} from "@/app/locationManager";

export default function MapMarkers() {
    let [showFilters, setShowFilters] = useState(false);

    const types = getCategories();
    const tarifs = ["Variable", "Gratuit", "€", "€€", "€€€"];
    const localisations = ["Laval", "Périphérie"];
    const status = ["Ouvert", "Fermé"];

    const [search, setSearch] = useState("");
    const [selectedTypes, setTypes] = useState(types);
    const [selectedPrices, setPrices] = useState(tarifs.map((v, i) => i));
    const [selectedLocations, setLocations] = useState(localisations);
    const [selectedStatus, setStatus] = useState([0, 1]);

    let toggleFilters = () => {
        setShowFilters(!showFilters)
    };

    // @ts-ignore
    const locations = FilterList(ListLocations(), filter, {search: search, types: selectedTypes, prices: selectedPrices, locations: selectedLocations, status: selectedStatus}, -1);
    
    return (
        <div>
            {
                locations.map((placeInfo, ind) => {
                    const icon = placeInfo.icon ? placeInfo.icon : "/logo_white.png";
                    const myIcon = new L.Icon({
                        iconUrl: icon,
                        iconRetinaUrl: icon,
                        popupAnchor: [-0, -0],
                        iconSize: placeInfo.icon ? [40, 40] : [64, 64],
                        className: (placeInfo.icon ? ("border-2 border-gray-700 rounded-full bg-white p-0.5") : "")
                    });

                    return (
                        <Marker key={ind} position={latLng(placeInfo.lat, placeInfo.lon)} icon={myIcon}>
                            <Popup minWidth={200}>
                                <PlaceDescriptor placeInfo={placeInfo}></PlaceDescriptor>
                            </Popup>
                        </Marker>
                    );
                })
            }
            
            <button title={"Filtres"} className={"absolute top-20 left-[10px] w-[34px] h-[34px] z-[900] font-bold text-lg border-2 border-black/25 bg-white text-black rounded-md p-1 pb-0.5"} onClick={() => toggleFilters()}>
                🔍
            </button>
    
            <div className={"absolute z-[1001] top-2 left-2 bottom-2 right-5 lg:right-0 lg:w-[400px] h-fit ".concat(showFilters ? "" : "hidden")}>
                <div className={"w-full h-full cursor-auto bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6] rounded-xl shadow-lg shadow-gray-400 dark:shadow-gray-900 m-2 mb-5 p-[3px]"}>
                    <div className={"relative w-full h-full flex flex-col bg-white dark:bg-gray-800 p-1 rounded-[0.65rem]"}>
                        <p className={"mx-auto mb-2 text-xl md:text-2xl font-semibold"}>Filtrer la carte</p>
        
                        <input className={"m-2 p-2 mb-4 border-2 border-[#f28e77] rounded-lg bg-gray-200 dark:bg-gray-700 text-lg md:text-xl"} placeholder={"Recherche"} onChange={(val) => setSearch(val.target.value)} />
        
                        <div className={"flex flex-wrap place-content-center lg:flex-col lg:flex-nowrap"}>
                            <Dropdown className={"mx-2"} allText={"Tous les types"} items={types} changed={(val: number[]) => setTypes(val.map((v) => types[v]))} />
                            <Dropdown className={"mx-2"} allText={"Tous les prix"} items={tarifs} changed={(val: number[]) => setPrices(val)} />
        
                            <Dropdown className={"mx-2 "} items={localisations} changed={(val: number[]) => setLocations(val.map((v, i) => localisations[v]))} />
                            <Dropdown className={"mx-2"} items={status} changed={(val: number[]) => setStatus(val)} />
                        </div>
        
                        <button className={"absolute top-1 right-1 w-[20px] aspect-square text-base text-white font-bold"} onClick={() => toggleFilters()}>X</button>
                    </div>
                </div>
            </div>
        </div>
    );
}