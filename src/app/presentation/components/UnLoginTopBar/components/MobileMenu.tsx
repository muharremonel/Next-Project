import React, {useState} from 'react';
import router from 'next/router';
import {Search, Logout, Close, Produce} from '@/svgImports';
import {BASE_URL} from "@/config";
import {SearchBar} from "@/app/presentation/components";
import {Button} from "@mui/material";
import Link from "next/link";
import SearchSave from '../../SearchBar/SearchBar';
interface MobileMenuProps {
    categories: any[];
    toggleMenu: () => void;
    setSearchTerm: (term: string) => void;

}

const MobileMenu: React.FC<MobileMenuProps> = ({categories, toggleMenu}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.push(`/ara?query=${term}`);
    };
    return (
        <div className="md:hidden absolute top-full z-50 left-0 w-full bg-white shadow-2xl flex flex-col p-4">
            <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4">
                <div className="flex justify-between items-center mb-6">
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
                        {categories?.map((category: any, index) => (
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

                    <ul>

                        <div className="flex flex-col gap-4 mb-6 mt-6">
                            <Link href={"/giris"}>
                                <Button sx={{textTransform: "none"}} className={"w-full"} variant={"contained"}
                                        style={{backgroundColor: "#F29E51", borderRadius: "20px"}} onClick={toggleMenu}>Giriş
                                    Yap</Button>
                            </Link>
                            <Link
                                href={"/kayitol"}>
                                <Button sx={{textTransform: "none"}} className={"w-full"} variant={"contained"}
                                        style={{backgroundColor: "#222D68", borderRadius: "20px"}} onClick={toggleMenu}>Kayıt
                                    Ol</Button>
                            </Link>
                        </div>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MobileMenu;