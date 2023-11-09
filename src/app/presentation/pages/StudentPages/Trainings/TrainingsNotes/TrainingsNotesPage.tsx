import React from 'react';
import { TextTrash, TextEdit } from "@/svgImports";
import Link from "next/link";

type TrainingsPageProps = {
    title: string
    subject: string
    time: string
    mode1: string 
    mode2: string 
    PropositionCards?: React.ReactNode[]
}

const TrainingsNotesPage = ({title, subject, time, mode1, mode2}: TrainingsPageProps) => {
    return (
   
    <div className={"w-full shadow-xl bg-white mb-8 p-5 rounded-xl gap-8"}>
        <div className={"w-full mb-5 flex items-center"}>
            <div className={"w-full md:text-2xl text-1xl"}>
                {title}
            </div>
            <div className={"flex gap-3"}>
                <div className={"w-full"}>
                    <Link href={"/notlarim"}>
                        <TextEdit/>
                    </Link>
                </div>
                <Link href={"/egitimler/notlarim"}>
                    <TextTrash/>
                </Link>
            </div>
        </div>
        <div className={"mb-4"}>
            <h2 className={"text-xl"}>{mode1} / <span className={"text-grey"}>{mode2}</span></h2>
        </div>
        <div className={"mb-4"}>
            <button className='bg-primary-gray items-center font-light flex justify-center rounded-full px-4 py-2'>
                  {time}
            </button>
        </div>
        <div className='mb-2'>
            <span className='text-grey'>{subject}</span>
        </div>
    </div>
    );
};
export default TrainingsNotesPage