import Category from "@/app/presentation/components/Navbar/components/Category";
import { SearchBar } from "@/app/presentation/components";
import { Search } from "@/svgImports";
import Link from "next/link";
import { Button } from "@mui/material";
import React from "react";

export default function UnLogin(props: { onClick: () => void }) {
    return <div className="hidden md:flex w-full items-center">
        <div className="hidden md:flex w-full items-center">
            {/*<div className="relative ">*/}
            {/*    <div className="p-2 cursor-pointer flex items-center gap-2"*/}
            {/*         onClick={props.onClick}>*/}
            {/*        <Category/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="w-full flex justify-center">
                <SearchBar rounded={"full"} value={""} placeholder={"Ara"} svgIcon={Search}
                    setSearchTerm={console.log} />
            </div>
            <div className="flex w-full h-full items-center justify-end">
                <div className={"flex w-full h-full items-center md:gap-2 justify-center"}>
                    <Link href={"/giris"}>
                        <div className={"w-auto"}>
                            <Button sx={{textTransform: "none"}} style={{ backgroundColor: "#222D68", borderRadius: "20px" }}
                                variant={"contained"} onClick={console.log}>Giriş yap</Button>
                        </div>
                    </Link>
                    <Link href={"/kayitol"}>
                        <div className={"w-auto"}>
                            <Button sx={{textTransform: "none"}} style={{ borderRadius: "20px" }} variant={"outlined"}
                                onClick={console.log}>Kayıt ol</Button>
                        </div>
                    </Link>
                    <div className={"w-auto"}>
                        <Button sx={{textTransform: "none"}} style={{ backgroundColor: "#F29E51", borderRadius: "20px" }}
                            variant={"contained"} onClick={console.log}>Proje Başvurusu Yap</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}