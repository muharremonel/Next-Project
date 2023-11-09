
import React, {useEffect} from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";
import EducationCard from "@/app/presentation/pages/StudentPages/Home/components/EducationCard";
import { BASE_URL } from "@/config";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

SwiperCore.use([Pagination]);
interface EducationCardData {
    _id: string;
    title: string;
    viewCount: string;
    image: string;
    category: string;
    averageRating: number;
    isFollowing: boolean;
}


type PropositionsProps = {
    title?: string;
    moreButtonOnClick?: () => void;
    EducationCardsData: EducationCardData[];
}
const EducationCardsDataSample = [
    {
        _id: '651716e6dbb222156012b500?section=0&lesson=4',
        title: 'Hierarcy',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/5.png', 
        category: 'Oyun Geliştirme',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '65171772dbb222156012b502?section=2&lesson=4',
        title: 'Problem ve Muşteri',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/7.png', 
        category: 'Temel Girişimcilik',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '651716e6dbb222156012b500?section=0&lesson=5',
        title: 'Inspector',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/6.png', 
        category: 'Oyun Geliştirme',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '65171772dbb222156012b502?section=2&lesson=7',
        title: 'Gelirler ve Giderler',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/8.png', 
        category: 'Temel Girişimcilik',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '651716e6dbb222156012b500?section=0&lesson=1',
        title: 'Unity ve Visual Studio Kurulumu',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/3.png',  
        category: 'Oyun Geliştirme',
        averageRating: 4.5,
        isFollowing: true,
    },
    {
        _id: '65171772dbb222156012b502?section=1&lesson=0',
        title: 'Ekip ve Liderlik',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/1.png', 
        category: 'Temel Girişimcilik',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '651716e6dbb222156012b500?section=0&lesson=2',
        title: 'Unity Hub ve İlk Proje',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/4.png', 
        category: 'Oyun Geliştirme',
        averageRating: 3.7,
        isFollowing: true,
    },
    {
        _id: '65171772dbb222156012b502?section=1&lesson=2',
        title: 'Rollere Göre Gelişim',
        viewCount: '',
        image: 'https://demo.anibalbilisim.com/digithane/ana/2.png', 
        category: 'Temel Girişimcilik',
        averageRating: 3.7,
        isFollowing: true,
    },

];

const Propositions: React.FC<PropositionsProps> = ({ title, moreButtonOnClick, EducationCardsData = EducationCardsDataSample }) => {
    const router = useRouter();


    const handleLessonClick = (item: EducationCardData) => {
        if (item.isFollowing) {
            router.push(`/kayitli-ders-odasi/${item._id}`);
        } else {
            toast.error("Derse kaydınız bulunmamaktadır");
        }
    };
    const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 4,
            },
        }
    };

    return (
        <div className="w-full p-4 sm:p-8 flex flex-col gap-6">
            <div className="flex justify-between text-primary">
                <h2 className="text-xl md:text-3xl font-bold">
                    {title}
                </h2>
            </div>
            
            <div className="w-full overflow-visible">
                <Swiper {...swiperParams} className="propositions-swiper">
                    {EducationCardsData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="m-auto md:p-4 p-8 md:mb-14 mb-10 mt-6 grid place-items-center" onClick={() => handleLessonClick(item)}>
                                <EducationCard
                                    title={item.title}
                                    tags="Temel Seviye"
                                    views={item.viewCount}
                                    image={item.image}
                                    label={item.category}
                                    rating={item.averageRating}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination mt-5"></div>
                </Swiper>
            </div>
            
            <style jsx global>{`
               .propositions-swiper .swiper-pagination-bullet {
                background-color: rgb(249 165 4)!important;
                width: 11px !important;
                height: 11px !important;
                margin: 5px !important;
              }
              
              .propositions-swiper .swiper-pagination-bullet-active {
                background-color: orange !important;
              }
              
              .propositions-swiper .swiper-pagination {
                margin-top: 10px !important;
              } 
            `}</style>
        </div>
    );
}

export default Propositions;