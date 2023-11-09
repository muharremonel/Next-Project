import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../_app';

const Index = () => {
    const router = useRouter()
    const {roomId} = router.query
    const api = useApi()
    const [eduInfo,setEduInfo] = useState<any>()

    useEffect(()=>{
        (async () => {
            const edu = (await api.getEducation(roomId))
            if (edu && edu.data) {
                setEduInfo(edu.data);
            }
        })();
    },[])
    console.log("eduInfo -> ",eduInfo)
    return (
        <>
            <div className='flex flex-col md:flex-row'>
                <div className='w-100 md:w-3/4 bg-[#333]'>
                    {/* yayın bölümü start */}
                    <iframe
                        src="https://customer-u1038jje4rywe8s9.cloudflarestream.com/d12a70517b17453449fecc7564ae80f7/iframe"
                        // src='https://video.bunnycdn.com/play/159663/a9ff4a62-3acc-4f7a-8dda-e39051e887ad'
                        // style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                        className='w-full h-screen'
                    ></iframe>
                    {/* yayın bölümü end */}
                </div>
                <div className='w-100 md:w-1/4 bg-[#333] text-white'>
                    {/* ders başlık bölümü start */}
                    <div className='m-2'>
                        <br />
                        <h1 className='font-bold'>{eduInfo?.title}</h1>
                        <br />
                        <h4 className='text-[#D1D1D1]'>{eduInfo?.category}</h4>
                        <br />

                    </div>
                    {/* ders başlık bölümü end */}
                    <hr />
                  

                    {/* chat bölümü start */}

                    {/* <div className='m-2 '>
                        <div className='chat-item flex flex-col mb-[40px]'>
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">
                                                Neil Sims
                                            </p>

                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className=''>
                                <p className='text-[12px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem totam natus exercitationem vitae. Distinctio cumque odit quidem doloribus obcaecati similique, porro dolorem at laudantium a quis ullam vero sapiente quod, natus atque id consequuntur consequatur soluta hic eligendi tempore! Similique vel animi ipsum aut tempore quibusdam modi harum fugit facilis?</p>
                            </div>
                        </div>
                    </div> */}
                    {/* chat bölümü end */}
                </div>
            </div>
        </>
    );
};

export default Index;