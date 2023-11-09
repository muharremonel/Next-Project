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
            className={`h-[70px] shadow-xl text-white w-full flex items-center justify-center 
                 ${stream ? 'bg-warning' : 'bg-green'}`}
        >
            <div className={"flex gap-2 items-center"}>
                {stream ?
                    <div className={"flex gap-2 items-center"}>
                        <Playing />
                        Şu an canlı dersiniz var.
                        {/* <Link href={`ders-odasi/${eduId && eduId[0]}`}> */}

                        <Button variant={"contained"}
                            onClick={() => {
                                router.push("/ders-odasi/" + eduId.lessonId)
                            }}
                            style={{
                                backgroundColor: "#fff",
                                color: "#DF2826",
                                textTransform: "none",
                                borderRadius: "9999px"
                            }}>Derse git</Button>
                        {/* </Link> */}
                    </div>
                    :
                    <div className={"flex gap-2 items-center"}>
                        Eğitimlere kayıtlar <span className='font-bold'>01/11/2023</span> tarihinde başlayacaktır!
                    </div>
                }
            </div>
        </div>
    );
};

export default MyComponent;
