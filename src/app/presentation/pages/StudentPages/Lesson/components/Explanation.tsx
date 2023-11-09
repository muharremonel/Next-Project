import React from "react";
import {Education} from "@/interfaces";

type ExplanationProps={
    explanations:any
}
export default function Explanation({explanations}:ExplanationProps) {
    return <div className={"flex flex-col gap-8"}>
        <div className={"text-2xl font-bold"}>
            Açıklama
        </div>
        <div className={"pl-10 flex gap-16 flex-col"}>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl "}>
                    Eğitimin Amacı
                </div>
                {/*<div className={"divide-y-2 w-full h-full"}>*/}
                <div className={"font-light"}>
                    {explanations?.purpose}
                </div>
            </div>
            {/*</div>*/}
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl "}>
                    Eğitimin Özeti
                </div>
                {/*<div className={"divide-y-2 w-full h-full"}>*/}
                <div className={"font-light"}>
                    {explanations?.summary}
                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl "}>
                    Hedef Kitle
                </div>
                {/*<div className={"divide-y-2 w-full h-full"}>*/}
                <div className={"font-light"}>
                    {explanations?.targetAudience}
                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl "}>
                    Gereksinimler
                </div>
                {/*<div className={"divide-y-2 w-full h-full"}>*/}
                <div className={"font-light"}>
                    {explanations?.requirements}
                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"text-xl "}>
                    Kazanımlar
                </div>
                {/*<div className={"divide-y-2 w-full h-full"}>*/}
                <div className={"font-light"}>
                    {explanations?.gains}
                </div>
            </div>
        </div>


    </div>;
}