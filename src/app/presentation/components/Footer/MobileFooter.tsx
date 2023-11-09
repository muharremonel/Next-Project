import React from 'react';
import {CircleLogo, DigithaneFooter, Facebook, Instagram, Youtube} from "@/svgImports";
import GoogleMap from "./GoogleMap";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const MobileFooter = () => {
    return (
        <div className="w-full bg-primary h-full p-10 flex flex-col gap-8">
            {/* Logos */}
            <div className="w-full flex justify-between gap-2 mb-6">
                <DigithaneFooter className=""/>
                <CircleLogo className=""/>
            </div>
            {/* Text */}
            <div className="text-white mb-6">
            Digithane, geleceğin teknoloji liderlerini yetiştirmek ve Kâğıthane’yi inovasyon merkezi haline getirmek için önemli bir adımdır. Bu merkezde, yenilikçi fikirlerini hayata geçirmek isteyen girişimcilerimize rehberlik edecek bir ekibimiz bulunmaktadır. Ayrıca, oyun geliştirme alanında uzmanlarımızın yönlendirmesiyle oyun sektörüne ilgi duyanlara destek sunacak ve siber güvenlik ile kodlama konularında eğitimler düzenleyeceğiz.
            </div>
            {/* Links */}
            <div className="w-full gap-8 mb-6">
                <div className={"w-full h-full flex flex-col text-white gap-2 mb-5"}>
                    <div className={"font-bold text-lg"}>İletişim</div>
                    <div className='leading-loose'>
                        <div className='flex items-center gap-6'>
                                <AddLocationAltIcon/>
                            Merkez, Cendere Cad. No:10, <br /> 34406 Kâğıthane/İstanbul
                        </div> <br />
                        <div className='flex items-center gap-6'>
                                <PhoneIcon/>
                                02128906222
                        </div><br />
                        <div className='flex items-center gap-6'>
                                <EmailIcon/>
                                info@digithane.com.tr
                        </div>
                    </div>
                </div>
                 <div className={"w-full h-full flex flex-col text-white mb-5"}>
                    <GoogleMap />
                 </div>
                 
            </div>
            {/* Icons */}
            <div className="w-full flex justify-center items-center gap-4">
                <div className="bg-white rounded-full p-3">
                    <Instagram/>
                </div>
                <div className="bg-white rounded-full p-3">
                    <Facebook/>
                </div>
                <div className="bg-white rounded-full p-3">
                    <Youtube/>
                </div>
            </div>
        </div>
    );
};

export default MobileFooter;
