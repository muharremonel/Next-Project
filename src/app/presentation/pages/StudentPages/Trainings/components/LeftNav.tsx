import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Progres, SideTick, Outlined, Test, Notebook, ChartPie, Certificate, } from "@/svgImports";

export default function LeftNav() {
    const router = useRouter();
    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/devam-ettigim-egitimler" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/devam-ettigim-egitimler" ? "active" : ""}`}>
                    <Progres/> 
                    <span className='ml-3'>Devam Ettiğim Eğitimler</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/tamamladigim-egitimler" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/tamamladigim-egitimler" ? "active" : ""}`}>
                    <SideTick/> 
                    <span className='ml-3'>Tamamladığım Eğitimler</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/favorilerim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/favorilerim" ? "active" : ""}`}>
                    <Outlined/> 
                    <span className='ml-3'>Favorilerim</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/testlerim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/testlerim" ? "active" : ""}`}>
                    <Test/> 
                    <span className='ml-3'>Testlerim</span>
                </Link>
            </div>
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/notlarim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/notlarim" ? "active" : ""}`}>
                    <Notebook/> 
                    <span className='ml-3'>Notlarım</span>
                </Link>
            </div>
            <div className="h-0 my-2 border border-solid border-t-0 border-gray-400 opacity-25 mt-5 mb-5" />
            <div className="mt-4 flex justify-start items-center cursor-pointer text-grey hover:text-primary rounded">
                <Link href="/egitimler/sertifikalarim" 
                       className={`flex items-center p-2 w-full ${router.pathname === "/egitimler/sertifikalarim" ? "active" : ""}`}>
                    <Certificate/> 
                    <span className='ml-3'>Sertifikalarım</span>
                </Link>
            </div>
        </div>
    );
};
