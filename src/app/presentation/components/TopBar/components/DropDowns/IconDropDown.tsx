import React, {useState} from 'react';
import {SearchBar} from "@/app/presentation/components";
import {Search} from "@/svgImports";
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from 'next/router';
import SearchSave from '@/app/presentation/components/SearchBar/SearchBar';

const IconDropDown = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); 
    const router = useRouter()

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.push(`/ara?query=${term}`);
     };
     const handleButtonClick = () => {
        router.push('/proje-basvuru-formu');
      };
    return (
            <div
                className="absolute z-50 w-full h-full overflow-hidden noscrollbar"
                style={{left: "50%", transform: "translateX(-50%)"}}  // Burası değiştirildi
            >
                <div className="rounded-md bg-white p-4 shadow-xs">
                    <div className="py-1 flex flex-col gap-3">
                        <div className={"w-full flex justify-center"}>
                        <SearchSave 
                            searchTerm={searchTerm}
                            setSearchTerm={(term: string) => {
                                setSearchTerm(term);
                                handleSearch(term);
                            }}
                        />
                        </div>
                        <Button
                            variant={"contained"}
                            style={{backgroundColor: "#F29E51", borderRadius: "20px"}}
                            onClick={handleButtonClick}
                        >
                            Proje başvurusu yap
                        </Button>
                        <Link
                            target={"_blank"}
                            href={"https://www.kagithane.istanbul/baskan/baskana_mesaj/Baskana-Mesaj/24/0/0"}>
                            <Button
                                fullWidth
                                variant={"contained"}
                                style={{backgroundColor: "#222D68", borderRadius: "20px"}}
                            >
                                Başkana Sor
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default IconDropDown;