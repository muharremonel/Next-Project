import React from 'react';
import { useRouter } from "next/router";
import { Button } from "@/app/presentation/components";
import { Girisim } from '@/svgImports';
const Index = () => {
    const router = useRouter();
    const people = [
        {
            title: 'Girişimcilik',
            image: 'https://demo.anibalbilisim.com/digithane/egitim/3.webp',
            text: 'Girişimcilik, yenilikçi fikirleri hayata geçirme sanatıdır ve ekonomik kalkınmanın itici gücüdür. Dijital çağda, girişimciliğin tanımı ve sınırları genişlemiş, start-up kültürü globalleşmiş ve inovasyonun önemi katlanarak artmıştır. Girişimciler, sektörden bağımsız olarak, karşılaştıkları sorunlara yaratıcı çözümler üretmekte ve yeni iş modelleri oluşturmaktadırlar. Bu süreçte, risk alabilme, sürdürülebilir bir iş modeli geliştirebilme ve değişen piyasa koşullarına adapte olabilme yetenekleri kritik öneme sahiptir. Ancak bu yolculuk kolay değildir; başarılı bir girişimcinin arkasında sayısız deneme-yanılma, öğrenme ve yeniden başlama hikayeleri vardır. Girişimcilik ekosistemi, bu cesur ruhları desteklemekte, mentorluk, finansman ve eğitim olanaklarıyla onların yanında olmaktadır. Günümüzde, her bireyin içindeki girişimci ruhu keşfetmesi ve bu enerjiyle dünyayı daha iyi bir yer haline getirmesi umuduyla, girişimcilik, sadece bir iş yapma biçimi değil, aynı zamanda bir yaşam tarzı olarak kabul görmektedir.',
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
                                <Button type={"primary"} onClick={() => router.push('/ders/65171772dbb222156012b502')} text={"Derse Git"}/>
                           </div>
                       </div>
                       <div className="flex items-center justify-center p-5 w-full md:w-1/2 h-64 md:h-auto girisim">
                           <div className="intermediate-page">
                               <Girisim/>
                           </div>
                       </div>
                   </div>
               ))}
           </div>
    );
};

export default Index;
