import React, { useEffect, useState } from "react";
import { Percent, PlayBlack, PlayRed } from "@/svgImports";
import { Chip } from "@mui/material";
import { useRouter } from 'next/router'
import toast from "react-hot-toast";
interface LessonProps {
    lesson: any;
    educationId: any;
    sectionIndex: any;
    lessonIndex: any;
    videoLink: any;
    isFollowing: any
}


export const LessonComponent: React.FC<LessonProps> = ({ lesson, educationId, videoLink, sectionIndex, lessonIndex, isFollowing }) => {
    const router = useRouter();
    console.log("isFollowing", isFollowing)
    // console.log("videoLink ->",videoLink)

    return (
        <div className="flex flex-col p-4 justify-between space-y-2">
            <div className="flex items-center justify-between mb-2">
                <div className={"flex gap-2 items-center"}>
                    <span className="font-light">{lesson.name}</span>

                    {lesson.type === "stream" ?
                        <Chip sx={{ backgroundColor: "#DF28261A", color: "#DF2826" }} label={"CANLI"} />
                        :
                        <div className={"flex items-center gap-1"}>
                            {/* <Percent/>
                            <div className={"text-green"}>
                                50
                            </div> */}
                        </div>
                    }
                </div>

                {lesson.type === "stream" ? (
                    <a href={lesson.link} className={"cursor-pointer"}>
                        <PlayRed />
                    </a>
                ) : (
                    <div className={"cursor-pointer"} onClick={() => {
                        isFollowing ? router.push("/kayitli-ders-odasi/" + educationId + '?section=' + sectionIndex + '&lesson=' + lessonIndex) : toast.error("derse kaydınız bulunmamaktadır")
                    }}>
                        <PlayBlack />
                    </div>
                )}
            </div>

            {lesson.quiz &&
                <div className={"flex justify-between pt-2"}>
                    <span className="text-gray-500 text-start pl-12">{lesson.quiz.name}</span>
                    <span className={"text-orange cursor-pointer transition-all hover:scale-105"}>Quiz Çöz</span>
                </div>
            }
            <hr className="text-primaryGray" />
        </div>
    );
}


