import {Calendar, Certificate, ChartPie, Logout, Play, Profile} from "@/svgImports";
import React from "react";

export default function MobileLogin(props: { onClick: () => Promise<void> }) {
    return <div className="mb-6 z-50">
        <h2 className="text-xl font-light mb-4">Menü </h2>
        <ul>
            <div className={"flex items-center"}>
                <Profile/>
                <li className="mb-2 text-sm font-light pl-4 cursor-pointer">Profilim</li>
            </div>
            <div className={"flex items-center"}>
                <Play/>
                <li className="mb-2 text-sm font-light pl-4 cursor-pointer">Derslerim</li>
            </div>
            <div className={"flex items-center"}>
                <Calendar/>
                <li className="mb-2 text-sm font-light pl-4 cursor-pointer">Ders
                    Takvimim
                </li>
            </div>
            {/*<div className={"flex items-center"}>*/}
            {/*    <ChartPie/>*/}
            {/*    <li className="mb-2 text-sm font-light pl-4 cursor-pointer">İstatistiklerim*/}
            {/*    </li>*/}
            {/*</div>*/}

            <div className={"flex items-center"}>
                <Certificate/>
                <li className="mb-2 text-sm font-light pl-4 cursor-pointer">Sertifikalarım</li>
            </div>
            <div className={"flex items-center"}>
                <Logout/>
                <li onClick={props.onClick}
                    className="mb-2 text-sm font-light pl-4 cursor-pointer">Çıkış
                    yap
                </li>
            </div>
        </ul>
    </div>;
}