import Image from 'next/image'
import Carrousel from "@/app/components/carrousel";
import {ListLocations} from "@/app/locationManager";
import {EventInfo, getEvents, sortEvents, upcomingEvents} from "@/app/eventManager";
import Link from "next/link";

export default function Home() {
    const placeOfTheWeek = [21, 9, 15, 19];
    
    return (
        <main className="flex-grow bg-white dark:bg-gray-800">
            <div className={"flex h-[300px] mx-auto justify-center"}>
                <Image src="/laval.jpg" alt="Laval" width={1} height={1} className={"absolute w-full h-[300px] object-title object-cover brightness-[0.65]"}/>
                <div className={"m-auto relative flex flex-row items-center"}>
                    <Image src={"/logo.png"} alt="Logo" width={128} height={128} className={"inline mt-1 md:mt-4 lg:mt-5 md:w-[192px] md:h-[192px] lg:w-[256px] lg:h-[256px] -mx-6 lg:mx-auto"}></Image>
                    <h1 className={"text-4xl md:text-6xl lg:text-8xl text-transparent text-center text-white font-bold"}>BIENVENUE CHEZ <p className={"block 2xl:inline whitespace-nowrap"}>STUD&#39;IN LAVAL</p></h1>
                </div>
            </div>
            
            <div className={"my-12 mx-auto md:px-6 w-11/12 md:w-2/3 border-t-[1px] border-b-[1px] border-gray-600 dark:border-gray-400 py-6 flex flex-col "}>
                <p className={"text-xl md:text-2xl text-justify md:text-left mb-3"}>
                    Envie de mieux connaitre Laval ? Ou alors de trouver le lieux parfait pour passer le temps ? Ou encore de découvrir des lieux pratiques au quotidien ?
                </p>
                <ul className={"mt-1 text-lg md:text-xl text-gray-700 dark:text-gray-300"}>
                    <li>Utilise <Link href="/list/" className={"font-medium underline"}>La Liste</Link> pour rapidement trouver les lieux qui t&lsquo;intéressent grâce aux filtres.</li>
                    <li>Utilise <Link href="/map/" className={"font-medium underline"}>La Carte</Link> pour trouver des lieux autour de toi.</li>
                    <li>Utilise <Link href="/events/" className={"font-medium underline"}>Les Événements</Link> pour accèder à la liste des tous les événements associatifs à venir.</li>
                </ul>
            </div>

            <Carrousel name="Les lieux de la semaine" reverse={false} gradient={"110deg, #f6bb41 0%, #f28e77 29%, #c84667 29.05%, #961144 100%"} items={placeOfTheWeek.map((id) => ListLocations()[id])}/>

            <div className={"my-12 mb-16 mx-auto w-11/12 md:w-2/3 border-b-[1px] border-gray-600 dark:border-gray-400 pb-6 flex flex-col"}>
                <div className={"flex mb-2"}>
                    <div className="h-[1px] flex-grow m-auto bg-gray-600 dark:bg-gray-400"></div>
                    <h1 className={"text-2xl md:text-4xl mx-4 md:mx-6"}>Ne ratez pas ces événements !</h1>
                    <div className="h-[1px] flex-grow m-auto bg-gray-600 dark:bg-gray-400"></div>
                </div>
                <div className={"flex flex-col lg:place-content-around lg:flex-row"}>
                    {
                        upcomingEvents(sortEvents(getEvents()), 2).map((e, ind) => <ComingEvent event={e} key={ind}/>)
                    }
                </div>
            </div>

            <div className={"my-12 mx-auto w-11/12 md:w-2/3 border-b-[1px] border-gray-600 dark:border-gray-400 pb-6 flex flex-col"}>
                <div className={"flex mb-2"}>
                    <div className="h-[1px] flex-grow m-auto bg-gray-600 dark:bg-gray-400"></div>
                    <h1 className={"text-2xl md:text-4xl mx-4 md:mx-6"}>Qui sommes nous ?</h1>
                    <div className="h-[1px] flex-grow m-auto bg-gray-600 dark:bg-gray-400"></div>
                </div>
                <div className={"flex flex-col lg:flex-row"}>
                    <p className={"text-xl md:text-2xl font-light md:ml-6 mt-3 text-justify md:text-left"}>Nous sommes un groupe de 4 étudiants de l&#39;ESIEA, ceci est notre projet qui vise à permettre aux nouveaux étudiants de mieux s&#39;intégrer dans la ville de Laval.</p>
                    <div className={"w-4/5 md:w-1/4 min-w-[14rem] mx-auto lg:mx-12 mt-6 md:mt-0 bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6] rounded-xl shadow-lg shadow-gray-400 dark:shadow-gray-900 p-[3px]"}>
                        <div className={"rounded-[0.65rem] flex flex-col p-3 bg-white bg-gradient-to-br from-white to-gray-100 dark:bg-none dark:bg-gray-800"}>
                            <p className={"pb-4 font-medium text-lg lg:text-xl text-center"}>En cas de question, de suggestion ou autre, n&#39;hésitez pas à nous contacter par email.</p>
                            <Link className={"mx-auto p-2 pb-1 text-lg border-2 border-blue-500 hover:border-blue-400 hover:bg-blue-500/40 transition-colors rounded-xl"} href={"mailto:studinlaval@gmail.com"}>Contactez-nous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

function ComingEvent({event}: {event: EventInfo}) {    
    return (
        <div
             className={"bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6] rounded-xl shadow-lg shadow-gray-400 dark:shadow-gray-900 mt-2 lg:w-[45%] p-[3px]"}>
            <div
                className={"flex flex-col w-full h-full p-2 rounded-[0.65rem] bg-white bg-gradient-to-br from-white to-gray-100 dark:bg-none dark:bg-gray-800"}>
                <b className={"mx-auto text-xl lg:text-2xl"}>{event.name}</b>
                <p className={"flex-grow my-2 text-base lg:text-xl text-justify text-ellipsis line-clamp-5"}>{event.description}</p>
                {
                    ((new Date()) > event.start) ?
                        (
                            <div className={"text-base lg:text-xl"}>
                                <div className={"flex flex-row-reverse md:flex-row items-center"}>
                                    <div
                                        className={"ml-auto md:ml-0 md:mr-2 border-2 border-blue-500 bg-blue-400 rounded-xl p-1 pb-0.5"}>En
                                        cours
                                    </div>
                                    <p>Jusqu&#39;au {event.end.toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}.</p>
                                    {
                                        ((new Date()).getDate() == event.end.getDate() && (new Date()).getMonth() == event.end.getMonth()) ?
                                            <b className={"inline-block ml-1"}>Se termine aujourd&lsquo;hui.</b>
                                            :
                                            <p className={"inline-block ml-1"}>Il
                                                reste <b>{Math.ceil((event.end.getTime() - (new Date()).getTime()) / 1000 / 60 / 60 / 24)}</b> jours.
                                            </p>
                                    }
                                </div>
                            </div>
                        )
                        :
                        <p className={"text-base lg:text-xl"}>Le {event.start.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}.
                            Dans <b>{Math.ceil((event.start.getTime() - (new Date()).getTime()) / 1000 / 60 / 60 / 24)}</b> jours.
                        </p>
                }
            </div>
        </div>
    );
}
