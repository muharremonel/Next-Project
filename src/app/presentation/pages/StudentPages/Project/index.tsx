import React from 'react';
import { useRouter } from "next/router";
import { Button } from "@/app/presentation/components";
import { Project } from '@/svgImports';

const Index = () => {
    const router = useRouter();

    const people = [
        {
            title: 'Proje Üretim Merkezi Nedir?',
            image: 'https://demo.anibalbilisim.com/digithane/egitim/proje-uretim-merkezi.png',
            text: 'Proje Üretim Merkezi, bir kuruluşun ya da kurumun projelerini daha etkin bir şekilde yönetebilmesi için merkezî bir yapı olarak tanımlanabilir. Bu yapı, projelerin planlama, tasarım, uygulama ve değerlendirme süreçlerini kapsayan bir dizi faaliyeti ve kaynağı koordine eder. Bu merkezin en belirgin özelliği, projenin başlangıcından sonuna kadar olan tüm evrelerini merkezi bir yönetim anlayışı ile ele almasıdır. Bu, kuruluşların kaynaklarını daha etkili bir şekilde kullanmalarına olanak tanır. Aynı zamanda, projeler arası tutarlılık ve standartlaştırma sağlayarak, farklı projelerde kullanılan yönetim metodolojilerinin, araçlarının ve tekniklerinin birbirine benzer olmasını garantiler. Eğitim ve gelişim de Proje Üretim Merkezinin önemli bir parçasıdır. Proje ekibi üyeleri, bu merkez vasıtasıyla sürekli olarak yeni eğitimlere tabi tutulabilirler. Böylece, ekibin bilgi ve becerileri sürekli olarak güncellenir ve geliştirilir.',
        },
    ];

    return (
           <div className='w-full h-full flex flex-col md:flex-row items-center'>
            {people.map((project, index) => (
                    <div key={index} className='flex w-full h-full flex-col-reverse md:flex-row'>
                        <div className='flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2 bg-white'>
                            <div className="text-center">
                                <div className='mb-10'>
                                <span className='md:text-5xl text-4xl mb-10 font-semibold'>{project.title}</span>
                                </div>
                                <div className='mb-10'>
                                    <p className='mt-4 text-justify text-lg mt-10 leading-relaxed'>{project.text}</p>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col gap-4  w-full mt-5">
                                <Button type={"orange"} onClick={() => router.push('/proje-basvuru-formu')} text={"Proje Başvurusu Yap"} />
                                <Button type={"primary"} onClick={() => router.push('/proje-uretim-merkezi/projelerim')} text={"İleri"}/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-5 w-full md:w-1/2 h-64 md:h-auto projects">
                            <div className="intermediate-page">
                            <Project/>
                            </div>
                        </div>
                    </div>
                ))}
           </div>
    );
};

export default Index;
