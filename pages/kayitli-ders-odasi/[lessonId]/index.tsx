import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Accordion from "@/app/presentation/components/Accordion";
import { educationService, mentorService } from '@/api';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { useApi } from '../../_app';
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@/config";

const Index = () => {
    const router = useRouter()
    const { lessonId, section, lesson } = router.query
    // console.log(section, lesson)
    const [educationInfo, setEducationInfo] = useState<any>()
    const [accordions, setAccordion] = useState<any>()
    const [sectionIndex, setSectionIndex] = useState<any>(section)
    const [lessonIndex, setLessonIndex] = useState<any>(lesson)
    const [selectedVideoLink, setSelectedVideoLink] = useState<any>()
    const [videoList, setVideoList] = useState<any>()
    const api = useApi()
    useEffect(() => {

        if (router.isReady) {

            // setEducationId(router.query.roomId as String)
            (async () => {
                const videoListget = await getVideoFunction()
                if (videoListget && videoListget.status === "success") {
                    setVideoList(videoListget.data.items)
                    console.log(videoList)
                } else {
                    toast.error("Video Listesi Alınamadı")
                    setVideoList([])
                }
                setLessonIndex(lesson)
                setSectionIndex(section)
                const education = await educationService.getEducation!(lessonId)
                if (education?.status === "success") {
                    setEducationInfo(education.data)
                    setAccordion(education.data.curriculum.sections)
                    if (sectionIndex && lessonIndex) {
                        if (sectionIndex <= education.data.curriculum.sections.length - 1 || lessonIndex <= education.data.curriculum.sections[sectionIndex].lessons.length - 1) {
                            setSelectedVideoLink(education.data.curriculum.sections[sectionIndex].lessons[lessonIndex].link)
                        } else {
                            setSelectedVideoLink(education.data.curriculum.sections[0].lessons[0].link)
                            toast.error("bölüm bulunamadı")

                        }
                        // console.log("educationInfo",educationInfo)
                    }
                }
            })()
        }



    }, [lessonId, router, sectionIndex, lessonIndex, selectedVideoLink,])



    const getVideoFunction = async () => {
        return await axios.get(`${BASE_URL}/get_video`).then((response: AxiosResponse) => response.data);
    }
    // const [accordions, setAccordion] = useState([
    //     {
    //         key: 3,
    //         title: 'Bölüm 3',
    //         data: [
    //             {
    //                 content:"ders 7",
    //                 status:"undone",
    //                 videoLink:"1234"
    //             },
    //             {
    //                 content:"ders 8",
    //                 status:"undone",
    //                 videoLink:"1234"
    //             },
    //             {
    //                 content:"ders 9",
    //                 status:"undone",
    //                 videoLink:"1234"
    //             },
    //         ],
    //         isOpen: false
    //     },
    // ]);

    const toggleAccordion = (accordionkey: any) => {
        const updatedAccordions = accordions.map((accord: any) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

        setAccordion(updatedAccordions);
    };

    const handleVideoLink = (sectionIndex: any, lessonIndex: any) => {
        router.push("/kayitli-ders-odasi/" + educationInfo._id + '?section=' + sectionIndex + '&lesson=' + lessonIndex)
    }

    const goToQuiz = () => {
        router.push("/quiz/" + lessonId + "?section=" + section + "&lesson=" + lesson)
    }

    return (
        <>
            <div className='flex flex-col md:flex-row  '>
                <div className='w-100 md:w-3/4 bg-[#333]'>
                    {/* yayın bölümü start */}
                    {/* <iframe
                        src={selectedVideoLink}
                        // style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        className='w-full h-screen'
                    ></iframe> */}
                    <div className='h-[100%] w-[100%] pt-0 mt-0'>
                        {educationInfo && selectedVideoLink ? <>
                            <iframe

                                // src={`${selectedVideoLink}?autoplay=true&loop=false&muted=false&preload=true`}
                                src={`${selectedVideoLink}?autoplay=true&loop=false&muted=false&preload=true`}
                                loading="lazy"
                                id="kayitli-ders-iframe"
                                className='h-[100%] w-[100%] pt-0 mt-0'
                                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen>
                            </iframe>
                            {/* <video id="kayitli-ders-video" controls>
                                <source src={`${selectedVideoLink}?autoplay=true&loop=false&muted=false&preload=true`} />
                                Your browser does not support HTML5 video.
                            </video> */}
                        </> : <div className='w-100 flex flex-col justify-center align-center item-center'>
                            <CircularProgress />
                        </div>}

                    </div>
                    {/* yayın bölümü end */}
                </div>
                <div className='w-100 md:w-1/4 bg-[#333] text-white'>
                    {/* ders başlık bölümü start */}
                    <div className='m-2'>
                        <br />
                        <h1 className='font-bold'>{educationInfo && educationInfo.title}</h1>
                        <br />
                        <h4 className='text-[#D1D1D1]'>{educationInfo && educationInfo.category}</h4>
                        <br />

                    </div>
                    {/* ders başlık bölümü end */}
                    <hr />


                    {/* chat bölümü start */}

                    <div className='m-2 overflow-y-scroll h-[600px]'>

                        {accordions && accordions.length && accordions.map((accordion: any, index: any) => (
                            <>
                                <Accordion
                                    key={accordion.key}
                                    title={accordion.name}
                                    data={accordion.lessons}
                                    isOpen={accordion.isOpen}
                                    sectionIndex={index}
                                    goToQuiz={goToQuiz}
                                    videoList={videoList}
                                    toggleAccordion={() => toggleAccordion(accordion.key)}
                                    handleVideoLink={handleVideoLink} // accordion.videoLink gelecek
                                />
                                <hr />
                            </>
                        ))}
                    </div>
                    {/* chat bölümü end */}
                </div>
            </div>
        </>
    );
};


export default Index;