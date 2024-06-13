'use client'
import {usePathname, useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from "next/link";

export default function Header() {
    const router = useRouter();
    
    return (
        <div className={"sticky top-0 bg-[#4176ba] dark:bg-gray-900 p-2 z-50"}>
            <div className={"absolute top-0 bottom-0 flex place-items-center cursor-pointer"} onClick={() => router.push("/")}>
                <Image src="/logo.png" alt="Logo" width="64" height="64" className={"-m-3"}/>
                <p className={"font-semibold ml-2 text-xl text-white hidden lg:block"}>Stud&#39;in Laval</p>
            </div>
            <div className={"flex ml-8 place-content-center place-items-center"}>
                <HeadLink path="/" name="Accueil"/>
                <HeadSep/>
                <HeadLink path="/list/" name="La Liste"/>
                <HeadSep/>
                <HeadLink path="/map/" name="La Carte"/>
                <HeadSep/>
                <HeadLink path="/events/" name="Les Événements"/>
            </div>
            <span/>
        </div>
    );
}

// @ts-ignore
function HeadLink({path, name}) {
    const activePath = usePathname() || "/";
    const isActive = (activePath.endsWith("/") || activePath == "/" ? activePath : activePath + "/") == path;
    
    return (
        <div className={"relative"}>
            <Link href={path} className={"font-medium text-sm md:whitespace-nowrap md:text-xl lg:text-2xl transition-colors hover:text-[#faaf9d] ".concat(isActive ? "text-[#f28e77]" : "text-white")}>{name}</Link>
            {isActive ? <div className={"h-1 w-8 md:w-14 rounded-xl absolute mx-auto left-1 right-1 bg-gradient-to-br from-[#ffbb1b] to-[#ff25c6]"}></div> : null}
        </div>
    );
}

function HeadSep() {
    return (
        <p className={"text-gray-400 mx-auto md:mx-5 text-lg md:text-xl"} style={{fontFamily: "arial"}}>•</p>
    );
}

function toggleDarkMode() {
    if (window.localStorage.getItem("darkMode") == "true") {
        window.localStorage.setItem("darkMode", "false");
        document.body.classList.remove("dark");
    }
    else {
        window.localStorage.setItem("darkMode", "true");
        document.body.classList.add("dark");
    }
}