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
                <Link href="/proje-uretim-merkezi/projelerim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/proje-uretim-merkezi/projelerim" ? "active" : ""}`}>
                    <File/> 
                    <span className='ml-3'>Onaylanan Projelerim</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/proje-uretim-merkezi/taslaklar" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/proje-uretim-merkezi/taslaklar" ? "active" : ""}`}>
                    <File/> 
                    <span className='ml-3'>Taslaklar</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/proje-uretim-merkezi/tum-basvurularim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/proje-uretim-merkezi/tum-basvurularim" ? "active" : ""}`}>
                    <File/> 
                    <span className='ml-3'>Tüm Başvurularım</span>
                </Link>
            </div>
            <div className="h-0 my-2 border border-solid border-t-0 border-gray-400 opacity-25" />
            <div className={"w-auto mt-5 m-auto"}>
                <Button type={"orange"} onClick={() => router.push('/proje-basvuru-formu')} text={"Proje Başvurusu Yap"}/>
            </div>
        </div>
    );
};
