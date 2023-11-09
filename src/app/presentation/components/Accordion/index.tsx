export default function Accordion(props: any) {

console.log("props",props)
    return (
        <div className=" rounded-md mb-1">
            <button
                className="w-full p-4 text-left  
                           hover:bg-gray-300 transition duration-300"
                onClick={props.toggleAccordion}
            >
                {props.title}
                <span className={`float-right transform ${props.isOpen ?
                    'rotate-180' : 'rotate-0'} 
                                 transition-transform duration-300`}>
                    &#9660;
                </span>
            </button>
            {props.isOpen && (
                <>
                    <div className="p-4 ">
                        {props.data && props.data.map((lesson: any, index: any) => {
                            console.log("lesson",lesson)
                            let test = lesson.link.split("/")
                            console.log("test", test[test.length - 1])
                            console.log("videoList",props.videoList)
                            let videoTime = props.videoList && props.videoList.length > 0 ? props.videoList.find((video: any) => video.guid === test[test.length - 1]) : []
                            console.log("videoTime", videoTime)
                            const durduSaniye: number = videoTime.length;
                            const dakika: number = Math.floor(durduSaniye / 60);
                            const saniyeTemp: number = Math.floor(durduSaniye % 60);
                            const kesirliSaniye: string = (durduSaniye % 60 - saniyeTemp).toFixed(2);
                            const saniye = saniyeTemp *1 < 10 ? "0" + saniyeTemp : saniyeTemp 
                            console.log(`Video durdu: ${dakika} dakika ${saniyeTemp}.${kesirliSaniye} saniye`);
                            
                        // const url = lesson.link;

                        // // Son "/" karakterin konumunu bulma
                        // const lastSlashIndex = url.lastIndexOf("/");

                        // // URL'deki son "/" karakterinden sonraki kısmı alma
                        // const afterLastSlash = url.substring(lastSlashIndex + 1);

                        // console.log("afterLastSlash", afterLastSlash); // "page"

                        return (
                        <>
                            <div className="flex flex-row gap-[24px] justify-between mt-3">
                                {
                                    lesson.status === "done" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={lesson.status === "done" ? "text-[#9E9E9E] w-6 h-6" : lesson.status === "watching" ? "text-white  w-6 h-6" : "text-[#5B5B5B]  w-6 h-6"}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }

                                {
                                    lesson.status === "watching" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={lesson.status === "done" ? "text-[#9E9E9E] w-6 h-6" : lesson.status === "watching" ? "text-white  w-6 h-6" : "text-[#5B5B5B]  w-6 h-6"}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                }

                                {
                                    lesson.status === "undone" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={lesson.status === "done" ? "text-[#9E9E9E] w-6 h-6" : lesson.status === "watching" ? "text-white  w-6 h-6" : "text-[#5B5B5B]  w-6 h-6"}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                }
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={lesson.status === "done" ? "text-[#9E9E9E] w-6 h-6" : lesson.status === "watching" ? "text-[#5B5B5B]  w-6 h-6" : "text-white  w-6 h-6"}>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>

                                <div className="flex flex-row justify-start w-full">
                                    <p onClick={() => props.handleVideoLink(props.sectionIndex, index)} className={lesson.status === "done" ? "text-[#9E9E9E] cursor-pointer" : lesson.status === "watching" ? "text-[#5B5B5B] cursor-pointer" : "text-white cursor-pointer"}>{lesson.lessonName}</p> {/* dinamik renk class ı eklenecek */}
                                </div>
                                <p className={lesson.status === "done" ? "text-[#9E9E9E] w-6 h-6" : lesson.status === "watching" ? "text-[#5B5B5B] w-6 h-6" : "text-white  w-6 h-6"}>{dakika+ ":" +saniye}</p>
                            </div>
                            <div className="pl-10 pt-3 text-cyan-300" onClick={() => props.goToQuiz()}>
                            {lesson && lesson.quiz && <p>Quiz</p>}
                            </div>
                        </>
                        )
                        })}

                    </div>

                </>
            )}
        </div>
    );
};