import Link from "next/link";
import {Button} from "@mui/material";
import React from "react";

export default function MobileUnLogin(props: { onClick: () => void, onClick1: () => void }) {
    return <div className="flex flex-col gap-4 mb-6 z-50">
        <Link href={"/giris"}>
            <Button className={"w-full"} variant={"contained"}
                    sx={{textTransform: "none"}}
                    style={{backgroundColor: "#222D68", borderRadius: "20px"}}
                    onClick={props.onClick}>Giriş
                yap</Button>
        </Link>
        <Link href={"/kayitol"}>
            <Button sx={{textTransform: "none"}} className={"w-full"} variant={"outlined"} style={{borderRadius: "20px"}}
                    onClick={props.onClick1}>Kayıt ol</Button>
        </Link>
    </div>;
}