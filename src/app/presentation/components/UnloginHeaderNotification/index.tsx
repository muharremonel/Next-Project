import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import { Playing } from "@/svgImports";
import Link from "next/link";
import { useRouter } from 'next/router';
import { BASE_URL } from '@/config';

interface MyComponentProps {
    stream: boolean;
    eduId: any
}

const MyComponent: React.FC<MyComponentProps> = ({ stream, eduId }) => {
    const router = useRouter()
    return (
        <div
            className={`h-[70px] shadow-xl text-white w-full flex items-center justify-center bg-primary`}>
            <div className={"flex gap-2 items-center"}>
                    <div className={"flex gap-2 items-center"}>
                        {"Digithane'ye kayıtlar başlamıştır!"}
                    </div>
                
            </div>
        </div>
    );
};

export default MyComponent;
