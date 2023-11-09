import {President, Quote1, Quote2} from '@/svgImports'
import Image from 'next/image'
import React from 'react'
import president from "../../assets/PresidentCircle.png"

const Index = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center md:p-20 gap-5 md:gap-20'>
            <div className='flex flex-col items-center justify-center gap-8'>
                <p className='text-xl md:text-4xl font-bold'>Kaydınız Tamamlanmıştır</p>
                <p>Anasayfaya Yönlendiriliyorsunuz</p>
            </div>
            <div className={'w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover rounded-full overflow-hidden'}>
                <Image width={400} height={400} src={president} alt='president'/>
            </div>
            <div className='flex w-full max-w-[600px]'>
                <div className='h-full flex items-end'>
                    <Quote1/>
                </div>
                <p className='text-center text-sm'>{"Türkiye Yüzyılı'nın kapılarını araladığımız bugünlerde ülkemizin 2053 ve 2071 hedeflerine ulaşabilmesi adına Kağıthane Belediyesi olarak çalışmalarımızı kararlılıkla sürdürüyoruz. Geleceğin, teknolojiyle şekillendiğinin farkındayız. 'Digithane' projemiz, bu amaçla hayata geçirildi."}</p>
                <div className='h-full flex items-start'>
                    <Quote2/>
                </div>
            </div>
        </div>
    )
}

export default Index