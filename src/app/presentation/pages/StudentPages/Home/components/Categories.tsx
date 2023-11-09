import React from "react";
import CategoryCard from "@/app/presentation/pages/StudentPages/Home/components/CategoryCard";
import ProjectcreateCenter from "../../../../assets/projectCreateCenter.svg";
import {Skeleton} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import 'swiper/swiper-bundle.css';
import Link from "next/link";

SwiperCore.use([Pagination]);

type CategoriesProp = {
    cards?: any;
}

const Categories: React.FC<CategoriesProp> = ({ cards }) => {
    return (
        <div className="bg-primary w-full p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 rounded-xl overflow-visible">
            <div className="text-2xl sm:text-4xl text-white font-bold">Kategoriler</div>

            <div className="w-full h-full overflow-visible">
                {cards ? (
                <Swiper
                   slidesPerView={1}
                   spaceBetween={30}
                   pagination={{
                    el: '.swiper-pagination',
                       clickable: true,
                       dynamicBullets: true,
                   }}
                   breakpoints={{
                       640: { slidesPerView: 2 },
                       900: { slidesPerView: 3 },
                       1224: { slidesPerView: 4 },
                   }}
                   className="categories-swiper"
               >
                   {cards.map((item: any, index: number) => (
                       <SwiperSlide key={index}>
                           <Link href={item.href}>
                            <div className="">
                               <div className="w-full h-full grid place-items-center p-5 mb-8">
                                   <CategoryCard image={item.image} title={item.title} />
                               </div>
                            </div>
                           </Link>
                       </SwiperSlide>
                   ))}
                   
                   <SwiperSlide>
                       <Link href="/proje-uretim-merkezi">
                        <div className="w-full h-full grid place-items-center p-5 mb-8">
                            <div className="w-full h-full aspect-square bg-white rounded-2xl p-8 border-orange border-4 transition-all hover:scale-105 cursor-pointer flex flex-col">
                                <div className="flex-grow h-[168px] w-[200px] m-auto">
                                    <ProjectcreateCenter />
                                </div>
                                <div className="flex-shrink-0 h-1/5 whitespace-nowrap w-full text-center flex justify-center items-center text-lg md:text-lg lg:text-xl text-primary font-bold">
                                    Proje Üretim Merkezi
                                </div>
                                <div style={{
                                    backgroundColor: "rgba(242, 158, 81, 0.15)",
                                    borderRadius: "5px",
                                    color: "#F29E51"
                                }} className='flex gap-8 items-center m-auto px-6 mt-2 py-2 transition cursor-pointer'>
                                    Başvur
                                </div>
                            </div>
                        </div>
                       </Link>
                   </SwiperSlide>
                   
                   <div className="swiper-pagination"></div>
               </Swiper>
                ) : (
                    <div
                        className="w-full h-full flex place-items-center max-sm:overflow-x-auto noscrollbar sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-4">
                        <div
                            className={"w-full max-w-[300px] min-w-[200px] aspect-square rounded-2xl transition-all hover:scale-105 cursor-pointer"}>
                            <Skeleton sx={{bgcolor: 'white', borderRadius: '15px'}} variant="rounded" width={'100%'}
                                      height={'100%'}/>
                        </div>
                        <div
                            className={"w-full max-w-[300px] min-w-[200px] aspect-square rounded-2xl transition-all hover:scale-105 cursor-pointe max-lg:hidden"}>
                            <Skeleton sx={{bgcolor: 'white', borderRadius: '15px'}} variant="rounded" width={'100%'}
                                      height={'100%'}/>
                        </div>
                        <div
                            className={"w-full max-w-[300px] min-w-[200px] aspect-square rounded-2xl transition-all hover:scale-105 cursor-pointe max-sm:hidden"}>
                            <Skeleton sx={{bgcolor: 'white', borderRadius: '15px'}} variant="rounded" width={'100%'}
                                      height={'100%'}/>
                        </div>
                        <div
                            className={"w-full max-w-[300px] min-w-[200px] aspect-square rounded-2xl transition-all hover:scale-105 cursor-pointer max-md:hidden"}>
                            <Skeleton sx={{bgcolor: 'white', borderRadius: '15px'}} variant="rounded" width={'100%'}
                                      height={'100%'}/>
                        </div>
                    </div>
                )}
                </div>
    
                <style jsx global>{`
                    .categories-swiper .swiper-pagination-bullet {
                        width: 11px !important;
                        height: 11px !important;
                        background-color: rgb(249 165 4) !important;
                        margin: 5px;
                    }
    
                    .categories-swiper .swiper-pagination-bullet-active {
                        background-color: orange !important;
                    }
    
                    .categories-swiper .swiper-pagination {
                        margin-top: 10px !important;
                    }
    
                    .categories-swiper .swiper-container {
                        margin-bottom: 40px;
                    }
                `}</style>
            </div>
        );
    }
    
    export default Categories;
    
    
    
    
    
    
