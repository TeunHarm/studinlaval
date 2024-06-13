'use client'

import dynamic from "next/dynamic";
import {ReactNode} from "react";

export default function LaCarte() {
    // @ts-ignore
    const MapCont = dynamic(() => import('@/app/map/map'), {
        ssr: false,
    });
    // @ts-ignore
    const MapMarkers = dynamic(() => import('@/app/map/mapMarkers'), {
        ssr: false,
    });
    
    return (
        <main className={"flex-grow flex"}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />

            <div className={"relative h-auto w-full"}>
                {
                    // @ts-ignore
                    <MapCont>
                        <MapMarkers></MapMarkers>
                    </MapCont>
                }
            </div>
        </main>
    )
}