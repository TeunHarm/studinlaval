'use client'
import Image from "next/image";
import {eventComing, EventInfo, eventPassed, eventToday, getEvents, sortEvents} from "@/app/eventManager";
import Link from "next/link";

export default function LaListe() {
    const results = sortEvents(getEvents());

    return (
        <main className={"flex flex-grow flex-col"}>
            <div className={"border-t-2 border-b-2 border-gray-400 dark:border-gray-600 mx-[10%] p-5 my-10 md:my-16 text-center"}>
                <h2 className={"text-3xl md:text-4xl font-bold mb-5"}>Tous les événements du moment</h2>
                <p className={"text-xl md:text-2xl"}>Découvre ici une liste de tous les événements à venir dans les différentes associations de Laval.</p>
            </div>

            <div className={"flex flex-row flex-wrap place-content-around mx-[1rem] lg:mx-[15%]"}>
                {
                    results.length > 0 ?
                        results.map((data, index) => <EventItem key={index} eventInfo={data}/>)
                        :
                        <p className={"text-xl md:text-2xl m-auto text-gray-800 dark:text-gray-200"}>Pas encore d&lsquo;événements à venir.</p>
                }
            </div>
        </main>
    )
}

function EventItem({eventInfo}: {eventInfo: EventInfo}) {
    const isPassed = eventPassed(eventInfo);
    const isOpen = eventComing(eventInfo) && !isPassed;
    const isOneDay = eventInfo.start.getDate() == eventInfo.end.getDate() && eventInfo.start.getMonth() == eventInfo.end.getMonth();
    const endsToday = eventToday(eventInfo);
    
    let timeUntil: number;
    if (new Date() > eventInfo.start)
        timeUntil = Math.ceil((eventInfo.end.getTime() - (new Date()).getTime()) / 1000 / 60 / 60 / 24);
    else
        timeUntil = Math.ceil((eventInfo.start.getTime() - (new Date()).getTime()) / 1000 / 60 / 60 / 24);

    return (
        <div className={"relative w-full md:w-[45%] bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6] rounded-xl shadow-lg shadow-gray-400 dark:shadow-gray-900 m-2 mb-5 p-[3px] ".concat(isPassed ? "from-gray-400 to-gray-600" : "")}>
            <div className={"flex flex-col h-full rounded-[0.65rem] p-2 bg-white bg-gradient-to-br from-white to-gray-100 dark:bg-none dark:bg-gray-700"}>                
                <h3 className={"mx-auto text-center mb-3 font-semibold text-2xl lg:text-3xl"}>{eventInfo.name}</h3>
    
                <div className={"flex-grow"}>
                    {
                        eventInfo.logo ?
                            <Image alt="Logo" src={eventInfo.logo ? eventInfo.logo : "/logo_white.png"} width={48} height={48} className={"p-2 float-left aspect-auto w-[72px] lg:w-[128px] ".concat(eventInfo.name.length < 20 ? "-mt-12" : (eventInfo.name.length < 80 ? "min-[2400px]:-mt-12" : ""))} />
                            : null
                    }
                    <div className={"flex -mt-2 lg:mt-0 mb-2"}>
                        <p className={"text-[#f28e77] font-medium text-sm md:text-base text-center place-self-center min-w-[2rem] border-[1.5px] rounded-xl border-gray-300 dark:border-gray-600 p-1 pb-0 mr-2 "}>{eventInfo.organiser}</p>
                        <p className={"text-[#f28e77] font-semibold text-sm md:text-base text-center place-self-center min-w-[2rem] border-[1.5px] rounded-xl border-gray-300 dark:border-gray-600 p-1 pb-0 ".concat(isPassed ? "text-red-500" : (isOpen ? "text-green-400" : ""))}>{isPassed ? "Passé" : (isOpen ? "En cours" : "A venir")}</p>
                    </div>
                    <p className={"text-justify text-base md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 text-ellipsis "}>{eventInfo.description}</p>
                </div>
                
                <div>
                    <p className={"mt-3 mx-2 mr-1 inline-block"}>
                        {
                            isOneDay ?
                                "Le " + eventInfo.start.toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"}) + "."
                            :
                                "Du " + eventInfo.start.toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"}) + " au " + eventInfo.end.toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"}) + "."
                        }
                    </p>
                    {
                        endsToday ?
                            <b className={"inline-block"}>Se termine aujourd&lsquo;hui.</b>
                        :
                            <p className={"inline-block"}>{(new Date()) > eventInfo.start ? "Il reste" : "Dans"} <b>{timeUntil}</b> jours.</p>
                    }
                </div>
    
                <div className={"mt-1 mx-2 flex flex-col md:flex-row place-content-between md:items-center"}>
                    {
                        eventInfo.reservation ?
                            <Link className={"text-base md:text-lg font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2"} href={(eventInfo.reservation.startsWith("http") ? "" : "https://") + eventInfo.reservation}>Informations / Billetterie</Link>
                        : 
                            <span/>
                    }
    
                    {
                        eventInfo.address ?
                        <Link className={"text-base lg:text-lg font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2"} href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(eventInfo.address) + "&travelmode=walking"} target="_blank">
                            {eventInfo.address}
                        </Link> : null
                    }
                </div>
            </div>
        </div>
    )
}
