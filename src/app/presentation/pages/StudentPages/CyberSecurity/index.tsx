import React from 'react';
import { useRouter } from "next/router";
import { Button, Footer } from "@/app/presentation/components";
import { Cyber } from '@/svgImports';

const Index = () => {
    const router = useRouter();
    const people = [
        {
            title: 'Siber Güvenlik',
            image: 'https://demo.anibalbilisim.com/digithane/egitim/2.webp',
            text: 'Siber güvenlik, dijitalleşen dünyamızda önemini her geçen gün artırıyor. Dijital dönüşümün getirdiği sayısız fırsatlar kadar beraberinde birçok siber tehdidi de getiriyor. Bu tehditlerle başa çıkmak ve bilgi varlıklarını korumak adına, şirketlerin, kurumların ve bireylerin siber güvenlik bilincine sahip olması hayati önem taşıyor. İşte tam bu noktada siber güvenlik eğitim platformları devreye giriyor. Bu platformlar, temel bilinçlendirmeden uzmanlık gerektiren konulara kadar geniş bir yelpazede eğitim imkanı sunuyor. Siber tehditlerin farkındalığını artırmak, uzmanlık kazandırmak ve bu alandaki güncel gelişmeleri takip etmek için siber güvenlik eğitim platformları, dijital dünyada güvende kalmamız için vazgeçilmez bir kaynaktır.',
        },
    ];

    return (
        <div className='w-full h-full flex flex-col md:flex-row items-center'>
        {people.map((project, index) => (
                <div key={index} className='flex w-full h-full flex-col-reverse md:flex-row'>
                    <div className='flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2 bg-white'>
                        <div className="text-center">
                            <div className='mb-10'>
                               <span className='md:text-6xl text-4xl mb-10 font-semibold'>{project.title}</span>
                            </div>
                            <div className='mb-10'>
                                <p className='mt-4 text-justify text-lg mt-10 leading-relaxed'>{project.text}</p>
                            </div>
                        </div>
                        <div className={"flex gap-4 w-72 mt-5"}>
                            <Button type={"primary"} onClick={() => router.push('/ders/6516d1f694fe97bb20ba8ccb')} text={"Derse Git"}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-5 w-full md:w-1/2 h-64 md:h-auto cyber">
                        <div className="intermediate-pages">
                            <Cyber/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
