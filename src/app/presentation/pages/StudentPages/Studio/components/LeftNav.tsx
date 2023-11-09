import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { File } from "@/svgImports";
import {Button} from "@/app/presentation/components";

export default function LeftNav() {
    const router = useRouter();
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/studyo-basvuru" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/studyo-basvuru" ? "active" : ""}`}>
                    <File/> 
                    <span className='ml-3'>Tüm Başvurularım</span>
                </Link>
            </div>
            <div className="h-0 my-2 border border-solid border-t-0 border-gray-400 opacity-25" />
            <div className={"w-auto mt-5 m-auto"}>
                <Button type={"orange"} onClick={() => router.push('/studyo-basvuru-formu')} text={"Stüdyo Başvurusu Yap"}/>
            </div>
        </div>
    );
};
