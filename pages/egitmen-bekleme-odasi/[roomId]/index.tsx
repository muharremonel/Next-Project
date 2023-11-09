import { useRouter } from 'next/router';
import { StudentService, studentService,getUser } from '@/api';
import { Button, Input, SuccessfullySign } from "@/app/presentation/components";
import React, { useEffect, useState } from 'react';
import { useApi } from '../../_app';

// const findStudentsForClassroom = async (educationId:any) => {
//     return await studentService.getStudentsForClassroom(educationId)
// }

const Index = () => {
    const router = useRouter()
    const api = useApi();
    const { roomId } = router.query;
    const [studentList, setStudentList] = useState([])
    const [eduInfo, setEduInfo] = useState<any>()
    

    useEffect(() => {
        (async () => {
        console.log("akjsdsalkjd")
            console.log(router)
            if (router.isReady) {
                const test = await getUser()
                console.log("test", test)
                const studentList = await api.studentService.getStudentsInClassroom!(roomId)
                setStudentList(studentList.data)
                console.log("studentList",studentList)

                const educationInfo = await api.educationService.getEducation!(roomId)
                console.log("edu inf -> ",educationInfo)
                setEduInfo(educationInfo.data)
            }
        })();
    }, [router]);

    const startLesson = async () => {
        let userPhone = window.localStorage.getItem("UserPhone")
        const response = await api.educationService.startLesson!(roomId,userPhone)
        console.log(response)
        if(response === roomId){
            router.push("/ders-odasi/"+response)
        }
    }

    const endLesson = async () => {
        const response = await api.educationService.endLesson!(roomId)
        console.log(response)
    }

    return (
        <>
            {eduInfo ? <>
                <div className='mt-10 flex flex-col justify-center content-center align-middle items-center flex-wrap'>
                <div className='text-[#5B5B5B] font-bold'>
                    {eduInfo ? <p>{eduInfo.title}</p> : <></>}
                </div>
                <br />
                <div className='text-[#222222]'>
                    <p>{eduInfo ? eduInfo.category : <></>}</p>
                </div>
                <br />
                <div>
                    <Button type={"primary"} text={"Dersi Başlat"} onClick={startLesson} />
                </div>
            </div>
            <br />
            <div onClick={endLesson} className='flex flex-col justify-center align-bottom content-center items-center flex-wrap text-[#222D68] cursor-pointer'>
                <p className='underline cursor-pointer'>Dersten Çık</p>
            </div>
            <br />
            <br />
            <div className='card rounded bg-[#FFF] flex flex-col justify-center content-center items-center'>


                <div>
                    <div className="w-[30rem] max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl leading-none">Bekleme odasında {studentList.length} kişi var</h5>
                            <a href="#" className="text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </a>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <>
                                {studentList && studentList.length > 0 ? studentList.map((student:any) => {
                                    <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">
                                               {student?.user.firstName} / {student?.user.lastName}
                                            </p>

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>

                                        </div>
                                    </div>
                                </li>
                                }) : (
                                   <p></p>
                                )}
                                </>
                        
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            </> : <p>Yükleniyor</p>}
        </>
    );
};

export default Index;