import React from "react";
import { Chip, Rating } from "@mui/material";
import { FilledStar, Group, OutlinedStar } from "@/svgImports";

type EducationCardProps = {
    label: string;
    title: string;
    tags: string;
    views: string;
    rating?: number;
    image: string;
    
};

const EducationCard: React.FC<EducationCardProps> = ({ label, title, tags, views, rating, image }) => {
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden transition-transform transform hover:scale-105 shadow-lg">
            <div className="relative">
                <img src={image} alt={title} className="w-full h-[170px] object-cover"/>
                <div className="absolute top-5 right-0 bg-white rounded-l-full px-2 py-1 text-sm shadow-xl">
                    {label}
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between h-40">
                <h3 className="text-sm md:text-base mb-2 line-clamp-2 md:line-clamp-3">
                    {title}
                </h3>
                <div className="flex justify-between items-center">
                    <Chip label={tags} className="text-xs"/>
                    <div className="flex gap-1">
                        <Rating name="read-only" value={rating} readOnly size="small"/>
                        <span className="text-primary ml-2">{views}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationCard;