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
        loop: true, 
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
        <div className="w-full h-full relative flex md:flex-row flex-col">
            <div className='md:w-3/4 w-full h-full'>
            {images ? (
                <>
                    <Swiper {...swiperParams} className="start-swiper rounded-xl h-full">
                    {images?.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            {item.href && item.href !== "" ? (
                                <Link href={item.href}>
                                    <img 
                                        className="w-full cursor-pointer slider-img"
                                        src={`${BASE_URL}/${item.webImage}`} 
                                        alt={`Slide ${index}`} 
                                    />
                                </Link>
                            ) : (
                                <img className="w-full slider-img" src={`${BASE_URL}/${item.webImage}`} alt={`Slide ${index}`} />
                            )}
                        </SwiperSlide>
                    ))}
                    </Swiper>
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
            <div className='md:w-1/4 w-full h-full px-2 margin-tops'>
                <div className='text-center shadow p-2 flex items-center justify-between rounded-xl mb-2 cyber cursor-pointer' onClick={() => router.push("/ders/6516d1f694fe97bb20ba8ccb")}>
                    <div className='w-32'>
                        <Cyber/>
                    </div>
                    <div>
                        <span className='font-bold text-lg text-white'>Siber Güvenlik</span>
                        <div className='items-center m-auto mt-2 px-6 text-white rounded-xl w-28 py-2' style={{backgroundColor:"#030748"}}>
                            Kayıt Ol
                        </div>
                    </div>
                </div>
                <div className='text-center shadow flex items-center justify-between rounded-xl px-4 py-2 mb-2 girisim cursor-pointer' onClick={() => router.push("/ders/65171772dbb222156012b502")}>
                    <div className='w-32'>
                        <Girisim/>
                    </div>
                    <div>
                        <span className='font-bold text-lg text-white text-end'>Girişimcilik</span>
                        <div className='items-center m-auto mt-2 px-6 text-white rounded-xl w-28 py-2' style={{backgroundColor:"#D5A76B"}}>
                            Kayıt Ol
                        </div>
                    </div>

                </div>
                <div className='text-center shadow flex items-center justify-between rounded-xl px-4 py-2 unity cursor-pointer' onClick={() => router.push("/ders/651716e6dbb222156012b500")}>
                    <div className='w-32'>
                        <Unity/>
                    </div>
                    <div>
                        <span className='font-bold text-lg text-white text-end'>Oyun Geliştirme</span>
                        <div className='flex justify-end'>
                            <div className='items-center mt-2 px-6 text-white rounded-xl py-2 w-28' style={{backgroundColor:"#C28DFF"}}>
                                Kayıt Ol
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SwiperComponent;
