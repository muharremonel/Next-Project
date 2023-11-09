// SectionComponent.tsx
import React from "react";
import {LessonComponent} from "@/app/presentation/pages/StudentPages/Lesson/components/Curriculum/Lesson";
import { ArrowDown } from "@/svgImports";

interface SectionProps {
    section: any;
    isActive: boolean;
    onClick: () => void;
    order: number;
    educationId:any;
    isFollowing:any
}

export const SectionComponent: React.FC<SectionProps> = ({section, order, isActive, onClick,educationId,isFollowing}) => {
    // console.log("order -> ", order)
    return (
        <div className="rounded-md p-5">
            <div onClick={onClick} className="flex justify-between">
                <h2 className="cursor-pointer text-xl text-primary font-semibold hover:text-gray-600">
                    {/* {order + 1}.  */}{section.name} 
                </h2>
                <ArrowDown/>
            </div>
            {isActive && (
                <div className="mt-4 space-y-2">
                    {section.lessons.map((lesson: any,index:any) => (
                        <LessonComponent key={lesson.name} lesson={lesson} educationId={educationId} sectionIndex={order} lessonIndex={index} videoLink={lesson.link} isFollowing={isFollowing} />
                    ))}
                </div>
                
            )}
        </div>
    );
}