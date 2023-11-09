import React from 'react';
import { useRouter } from "next/router";
import { Button } from "@/app/presentation/components";
import { Unity } from '@/svgImports';

const Index = () => {
    const router = useRouter();
    const people = [
        {
            title: 'Oyun Geliştirme',
            image: 'https://demo.anibalbilisim.com/digithane/egitim/1.webp',
            text: 'Oyun geliştirme, dijital sanat ve teknolojinin birleştiği, yaratıcılığın sınırsızca ifade edildiği benzersiz bir alandır. Yıllar içinde, basit piksel tabanlı oyunlardan fotoğrafik gerçekçiliğe sahip karmaşık sanal gerçeklik deneyimlerine kadar büyük bir evrim geçiren bu sektör, teknolojik ilerlemelerle sınırlarını zorlamaya devam ediyor. Oyun geliştiricileri, sadece eğlenceli ve etkileyici oyunlar oluşturmakla kalmaz, aynı zamanda oyuncuları farklı dünyalara taşıyarak duygusal bağlantılar kurmalarını sağlar. Ancak oyun geliştirme süreci, grafik tasarımından ses mühendisliğine, oyun mekaniği tasarımından hikaye anlatıcılığına kadar birçok disiplini içerir ve bu, ekip çalışmasının önemini ortaya koyar. Yenilikçi oyun fikirleriyle başarılı bir oyun geliştirme süreci, sadece teknik bilgiyle değil, aynı zamanda yaratıcı vizyon, sabır ve tutkuyla da mümkündür. Gelişen teknolojilerle birlikte, artan sanal gerçeklik ve artırılmış gerçeklik platformları, oyun geliştiricilerine daha da sürükleyici deneyimler yaratma fırsatı sunmaktadır. Oyun geliştirme, sadece bir endüstri olarak değil, aynı zamanda bireylerin hikayelerini ve vizyonlarını paylaşmalarının bir aracı olarak da giderek daha fazla değer kazanıyor.',
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
                                <Button type={"primary"} onClick={() => router.push('/ders/651716e6dbb222156012b500')} text={"Derse Git"}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-5 w-full md:w-1/2 h-64 md:h-auto unity">
                            <div className="intermediate-pages">
                                <Unity/>
                            </div>
                        </div>
                    </div>
                ))}
          </div>

    );
};

export default Index;
