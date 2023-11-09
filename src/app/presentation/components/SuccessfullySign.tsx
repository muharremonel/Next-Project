import { President, Quote1, Quote2 } from '@/svgImports'
import Image from 'next/image'
import React from 'react'
import president from '../../../../src/app/presentation/assets/PresidentCircle.png'
import {sides} from "@floating-ui/utils";

type SuccessFullySignProps = {
    sign?:boolean
}
const SuccessfullySign = ({sign}:SuccessFullySignProps) => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-5  md:p-10 gap-5 md:gap-10'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='text-sm md:text-4xl font-bold'>{sign ? "Kaydınız Tamamlanmıştır" : "Giriş Tamamlanmıştır"}</p>
                <p className={"text-xs md:text-4xl"}>Anasayfaya Yönlendiriliyorsunuz</p>
            </div>
            <div className={'rounded-full'}>
                <Image src={president} alt='president' />
            </div>
            <div className='flex w-full max-w-[600px]'>
                <div className='h-full flex items-end'>
                    <Quote1 />
                </div>
                <p className='text-center text-xs md:text-sm'>{"Türkiye Yüzyılı'nın kapılarını araladığımız bugünlerde ülkemizin 2053 ve 2071 hedeflerine ulaşabilmesi adına Kağıthane Belediyesi olarak çalışmalarımızı kararlılıkla sürdürüyoruz. Geleceğin, teknolojiyle şekillendiğinin farkındayız. 'Digithane' projemiz, bu amaçla hayata geçirildi."}</p>
                <div className='h-full flex items-start'>
                    <Quote2 />
                </div>
            </div>
        </div>
    )
}

export default SuccessfullySign