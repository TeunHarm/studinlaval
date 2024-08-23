'use client'

import {MapContainer, TileLayer} from "react-leaflet";
import {ReactNode} from "react";

export default function Map({children}: {children: ReactNode}) {
    return (
        <MapContainer center={[48.071, -0.772]} zoom={14} maxBounds={[[47.999719, -0.915644], [48.131638, -0.626433]]} scrollWheelZoom={true} className={"w-full h-full"} style={{flexGrow: 1}}>
            <TileLayer
                //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                //url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
                url={"https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=" + process.env.NEXT_PUBLIC_MAPTILER_KEY}
                minZoom={13}
                maxZoom={20}
            />
            {
                children
            }
        </MapContainer>
    );
}