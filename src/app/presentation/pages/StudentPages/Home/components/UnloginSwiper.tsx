import React from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { BASE_URL } from "@/config";
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { Cyber, Girisim, Unity } from '@/svgImports';
import { useRouter } from 'next/router';
SwiperCore.use([Pagination, Autoplay]);

interface SwiperComponentProps {
    images: any;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ images }) => {

    const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 50,
      
        pagination: {
            el: '.start-swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index: number, className: string) {
                return `<span class="${className}"></span>`;
            },
        },
    };
    const router = useRouter();
    return (
        <div className="w-full relative">

            {images ? (
                <>
                    <Swiper {...swiperParams} className="start-swiper rounded-xl h-full">
                    {/* {images?.map((item: any, index: number) => ( */}
                        <SwiperSlide key={"unloginswiper"}>
                            {/* {item.href && item.href !== "" ? ( */}
                                <Link href="https://digithane.tech/kayitol">
                                    <img 
                                        className="w-full h-full object-cover cursor-pointer" 
                                        src={"https://demo.anibalbilisim.com/digithane/test1.png"} 
                                        // alt={`Slide ${index}`} 
                                    />
                                </Link>
                            {/* ) : (
                                <img className="w-full h-full object-cover" src={`${BASE_URL}/${item.webImage}`} alt={`Slide ${index}`} />
                            )} */}
                        </SwiperSlide>
                    {/* ))} */}

                    </Swiper>
                        <div className="start-swiper-pagination absolute mt-5 left-0 right-0 mx-auto w-max"></div>
                </>
            ) : (
                <Skeleton sx={{ borderRadius: '20px', }} variant="rounded" width={'100%'} height={400} />
            )}

            <style jsx global>{`
                .start-swiper-pagination .swiper-pagination-bullet {
                    background-color: rgb(249 165 4)!important;
                    width: 11px !important;
                    height: 11px !important;
                    margin: 5px !important;
                  }
                  
                  .start-swiper-pagination .swiper-pagination-bullet-active {
                    background-color: orange !important;
                  }
                  
                  .start-swiper-pagination .swiper-pagination {
                    margin-top: 20px !important;
                  }
                
            `}</style>
            </div>
    );
}

export default SwiperComponent;
