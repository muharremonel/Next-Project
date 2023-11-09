import React from "react";
import {BASE_URL} from "@/config";


type CategoryCardProps = {
    image?: any
    title?: string
    href?: string
}
const CategoryCard = ({ image, title }: CategoryCardProps) => {
    return (
        <div className="w-full h-full aspect-square bg-white rounded-2xl p-8 transition-all hover:scale-105 cursor-pointer flex flex-col">
            <div className="flex-grow">
                <img className="w-full h-[170px]  w-[200px]" src={`${BASE_URL}${image}`} alt="" />
            </div>
            <div className="flex-shrink-0 h-1/5 w-full flex justify-center items-center text-center text-xl md:text-xl lg:text-xl text-primary font-bold">
                {title}
            </div>
            <div style={{ backgroundColor: "rgba(242, 158, 81, 0.15)", borderRadius: "5px", color: "#F29E51" }} className='flex gap-8 items-center m-auto px-6 mt-4 py-2 transition cursor-pointer'>
                Kayıt Ol
            </div>
        </div>
    )
}
export default CategoryCard