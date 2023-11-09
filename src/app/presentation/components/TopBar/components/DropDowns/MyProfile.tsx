import React from 'react';
import {Calendar, Certificate, ChartPie, Logout, Play, Profile, Man} from "@/svgImports";
import Link from "next/link";
import { useRouter } from 'next/router';


type MyProfileProps = {
    logoutOnClick: any
    user: any
}
const MyProfile = ({logoutOnClick, user}: MyProfileProps) => {
    const router = useRouter();
    return (
        <div className="z-50 bg-white rounded-lg whitespace-nowrap px-4 py-2 divide-y divide-gray-200">
            {/* Avatar ve Kullanıcı Adı Bölümü */}
            <div className="w-full py-4 gap-2">
                <div className='max-w-xs overflow-hidden break-words'>
                    <span className="text-lg text-textGray font-medium">{user.firstname} {user.lastname}</span>
                </div>
            </div>

            <ul className="flex flex-col gap-2 py-4 text-textGray">
         
                    <div className="flex gap-4 items-center p-2" onClick={() => router.push("/profilim")}>
                        <Profile/>
                        <li className=" ml-2 cursor-pointer transition-all hover:scale-105">Profilim</li>
                    </div>
      
                <div className="flex gap-4 items-center p-2" onClick={() => router.push("/proje-uretim-merkezi/tum-basvurularim")}>
                    <Play/>
                    <li className=" ml-2 cursor-pointer transition-all hover:scale-105">Başvurularım</li>
                </div>
                <div className="flex gap-4 items-center p-2" onClick={() => router.push("/egitim-takvimim")}>
                    <Calendar/>
                    <li className=" ml-2 cursor-pointer transition-all hover:scale-105">Eğitim Takvimim</li>
                </div>

                {/* Manual Divider */}
                <div className="border-t border-gray-200"></div>

                <div className="flex items-center p-2 gap-4" onClick={logoutOnClick}>
                    <Logout/>
                    <li onClick={console.log} className="ml-2 cursor-pointer transition-all hover:scale-105">Çıkış yap
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default MyProfile;
