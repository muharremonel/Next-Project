import React, { useState } from 'react';
import {Search, Profile, Play, Calendar, ChartPie, Certificate, Logout, Close, Produce} from '@/svgImports'; // SVG dosyalarını import edin.
import {BASE_URL} from "@/config";
import {SearchBar} from "@/app/presentation/components";
import {Button} from "@mui/material";
import Link from "next/link";
import router from 'next/router';
import SearchSave from '../../../SearchBar/SearchBar';
import UserAvatar from '../../../studentComponents/UserAvatar';


interface MobileMenuProps {
    categories: any[];
    isLogin: boolean;
    toggleMenu: () => void;
    setSearchTerm: (term: string) => void;
    logoutOnClick: any
    user: any
}

const MobileMenu: React.FC<MobileMenuProps> = ({logoutOnClick, categories, isLogin, toggleMenu, user }) => {
    
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.push(`/ara?query=${term}`);
    };
    return (
        <div className="md:hidden absolute top-full z-50 left-0 w-full bg-white shadow-2xl flex flex-col p-4 overflow-x-hidden">
            <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4">
                <div className="flex justify-between items-center ">
                    {isLogin && (
                        <div className="flex items-center gap-4 w-full">
                            {/*<div className={"transition-all hover:scale-105"}>
                            <UserAvatar user={user} className="h-8 w-8" />
                            </div>
                    <span className="text-md font-medium ">{user.firstname}</span>*/}
                        </div>
                    )}
                    <div className={"flex w-full justify-end"}>
                        <Close onClick={toggleMenu}/>
                    </div>
                </div>
                <div className={"flex w-full justify-center mb-2"}>
                <SearchSave
                        searchTerm={searchTerm}
                        setSearchTerm={(term: string) => {
                            setSearchTerm(term);
                            handleSearch(term);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-light mb-4">Kategoriler</h2>
                    <ul>
                        {categories?.map((category: any, index:number) => (
                            <Link key={index} href={category.href}>
                                <div  className={"flex mb-2"} onClick={toggleMenu}>
                                    <img src={`${BASE_URL}${category.icon}`} alt=""/>
                                    <li className=" text-sm font-light pl-4 cursor-pointer">{category.title}
                                    </li>
                                </div>
                            </Link>
                        ))}
                        <Link href={"/proje-uretim-merkezi"}>

                        <div className={"flex mb-2"} onClick={toggleMenu}>
                            <Produce/>
                            <li className=" text-sm font-light pl-4 cursor-pointer">Proje Üretim Merkezi
                            </li>
                        </div>
                        </Link>
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-light mb-4">Menü </h2>
                    <ul>
                            <div className={"flex items-center mb-2"} onClick={() => router.push("/profilim")}>
                                <Profile/>
                                <li className=" text-sm font-light pl-4 cursor-pointer">Profilim</li>
                            </div>
                    
                            <div className={"flex items-center mb-2"} onClick={() => router.push("/proje-uretim-merkezi/tum-basvurularim")}>
                                <Play/>
                                <li className=" text-sm font-light pl-4 cursor-pointer">Başvurularım</li>
                            </div>
                            <div className={"flex items-center mb-2"} onClick={() => router.push("/egitim-takvimim")}>
                                <Calendar/>
                                <li className=" text-sm font-light pl-4 cursor-pointer">Eğitim Takvimim</li>
                            </div>
                        
                      

                        <div className="flex flex-col gap-4 mb-6 mt-6">
                            <Button sx={{textTransform: "none"}} className={"w-full"} variant={"contained"}
                                    style={{backgroundColor: "#F29E51", borderRadius: "20px"}} onClick={toggleMenu}>Proje
                                Başvurusu Yap</Button>
                            <Link target={"_blank"}
                                  href={"https://www.kagithane.istanbul/baskan/baskana_mesaj/Baskana-Mesaj/24/0/0"}>
                                <Button sx={{textTransform: "none"}} className={"w-full"} variant={"contained"}
                                        style={{backgroundColor: "#222D68", borderRadius: "20px"}} onClick={toggleMenu}>Başkana
                                    Sor</Button>
                            </Link>
                        </div>

                        <div className={"flex items-center mb-2"} onClick={() => {
                            logoutOnClick()
                            toggleMenu()
                        }}>
                            <Logout/>
                            <li
                                className=" text-sm font-light pl-4 cursor-pointer">Çıkış
                                yap
                            </li>
                        </div>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MobileMenu;