import type { Metadata } from 'next'
import Image from 'next/image'
import {League_Spartan, Oxanium} from 'next/font/google'
import './globals.css'

import Header from "@/app/header";
import Link from "next/link";
import {ReactNode} from "react";

//const globalFont = Oxanium({ subsets: ['latin'] })
const globalFont = League_Spartan({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Stud'in Laval",
    description: 'Découvre ou redécouvre les meilleurs coins de Laval et ses environs.',
}

export default function RootLayout({ children, }: { children: ReactNode }) {
    const voteURL: string = "";
    
    return (
        <html lang="en" className={"scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-transparent"}>
        <body className={globalFont.className.concat(" min-h-screen flex flex-col bg-white dark:bg-gray-800 dark:!bg-none scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-track-transparent")} style={{backgroundSize: "40px 40px", backgroundImage: "radial-gradient(#DDD, 1px, transparent 0px)"}}>
            <Header/>
            {children}
            <div className={"bg-gray-300 dark:bg-gray-900 flex flex-row p-2 place-items-center"}>
                <p className={"w-full text-xs md:text-base"}>Ce site vous est proposé par des étudiants de l&lsquo;Esiea.</p>
                { voteURL !== "" ? <Link href={voteURL} className={"w-full text-center text-lg font-semibold transition-colors hover:text-blue-400"}>📝 Votez pour le guide étudiant ! 👍</Link> : null }
                <div className={"md:w-full flex place-content-end"}>
                    <Link className={"mr-2 flex flex-row items-center"} href="https://www.instagram.com/studinlaval/">
                        <p className={"mr-2 hidden md:block hover:text-blue-400"}>Suivez nous sur instagram</p>
                        <Image src="/media/Instagram_Glyph_Gradient.png" alt="Instagram" width="20" height="20"/>
                    </Link>
                </div>
            </div>
        </body>
        </html>
    )
}
