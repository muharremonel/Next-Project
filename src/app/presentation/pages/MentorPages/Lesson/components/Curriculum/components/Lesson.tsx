// // Lesson.tsx
// import React, { useState } from "react";
//
// interface LessonProps {
//     onAdd: (lesson: any) => void;
//     sectionId: number;
// }
// export const Lesson: React.FC<LessonProps> = ({ onAdd, sectionId }) => {
//     const [name, setName] = useState("");
//     const [type, setType] = useState<"stream" | "record">("stream");
//     const [date, setDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [link, setLink] = useState("");
//
//     const handleAdd = () => {
//         const lesson: any = { name, type };
//         if (type === "stream") {
//             lesson.date = new Date(date);
//             lesson.startTime = startTime;
//             lesson.endTime = endTime;
//         } else {
//             lesson.link = link;
//         }
//         onAdd(lesson);
//         setName("");
//         setType("stream");
//         setDate("");
//         setStartTime("");
//         setEndTime("");
//         setLink("");
//     };
//
//     return (
//         <div className="p-4 border">
//             <input placeholder="Lesson Name" value={name} onChange={e => setName(e.target.value)} />
//             <div>
//                 <input type="radio" name={`type-${sectionId}`} value="stream" checked={type === "stream"} onChange={() => setType("stream")} /> Stream
//                 <input type="radio" name={`type-${sectionId}`} value="record" checked={type === "record"} onChange={() => setType("record")} /> Record
//             </div>
//             {type === "stream" ? (
//                 <>
//                     <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//                     <input placeholder="Start Time" value={startTime} onChange={e => setStartTime(e.target.value)} />
//                     <input placeholder="End Time" value={endTime} onChange={e => setEndTime(e.target.value)} />
//                 </>
//             ) : (
//                 <input type="file" onChange={e => setLink(e.target.value)} />
//             )}
//             <button onClick={handleAdd}>Add Lesson</button>
//         </div>
//     );
// };
//
//
// Lesson.tsx
import React, {useState} from "react";
import {Tick, Trash} from "@/svgImports";
import FileUploader from "@/app/presentation/pages/MentorPages/Lesson/components/GeneralInformations/components/FileUploader";
import {Button} from "@/app/presentation/components";
import Popup from "@/app/presentation/components/PopUp";
import QuizModal from "@/app/presentation/pages/MentorPages/Lesson/components/QuizModal/QuizModal";


interface LessonProps {
    onAddLesson: (lesson: any) => void;
    onAddQuiz: (quiz: any) => void;
    sectionId: number;
}

export const Lesson: React.FC<LessonProps> = ({onAddLesson, onAddQuiz, sectionId}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState<"stream" | "record">("stream");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [link, setLink] = useState("");
    const [bunny, setBunny] = useState("");
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [quizModalKey, setQuizModalKey] = useState(0);

    const handleAddLessonClick = () => {
        const lesson: any = {name, type};
        if (type === "stream") {
            lesson.date = new Date(date);
            lesson.startTime = startTime;
            lesson.endTime = endTime;
        } else {
            lesson.link = link;
            lesson.bunny = bunny;
        }
        onAddLesson(lesson);
        setName("");
        setType("stream");
        setDate("");
        setStartTime("");
        setEndTime("");
        setLink("");
    };

    const handleAddQuizClick = (quiz: any) => {
        onAddQuiz(quiz);
        setIsQuizModalOpen(false);
    };

    const resetQuizModal = () => {
        setQuizModalKey(prevKey => prevKey + 1);
    };

    const getResponseFromUploader = (response: any) => {
        setLink(response?.watchableLink)
    }
    // console.log({link})
    return (
        <div className="">

            <div className={" rounded-lg"}>
                <div className={"flex justify-between bg-gray-200 p-2 w-full rounded-t-lg "}>
                    <div className={"w-full items-center flex h-full"}>
                        <input placeholder="Ders ismi" value={name} onChange={e => setName(e.target.value)}
                               className="w-full p-2 bg-transparent focus:outline-none"/>
                    </div>

                    <div className={"flex gap-4 items-center"}>
                     
                    </div>
                </div>


                <div className="flex flex-col gap-2 p-6">
                    <div>Dersin Türü</div>
                    <div className={"flex gap-4"}>
                        <div className={"flex gap-1"}>
                            <input type="radio" name={`type-${sectionId}`} value="stream" checked={type === "stream"}
                                   onChange={() => setType("stream")}/>
                            <div>Canlı</div>
                        </div>
                        <div className={"flex gap-1"}>
                            <input type="radio" name={`type-${sectionId}`} value="record" checked={type === "record"}
                                   onChange={() => setType("record")}/>
                            <div>Kayıt</div>
                        </div>
                    </div>
                </div>
                {type === "stream" ? (
                    <div className={"p-8 flex flex-col gap-6"}>
                        <div className={"flex flex-col gap-2"}>
                            <div>Ders Tarihi</div>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)}
                                   className="w-full border p-2 mb-2 rounded-xl border-gray-200"/>

                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <div>Ders Saati</div>
                            <input placeholder="Start Time" value={startTime}
                                   onChange={e => setStartTime(e.target.value)}
                                   className="w-full border p-2 mb-2 rounded-xl"/>
                        </div>
                        {/*<input placeholder="End Time" value={endTime} onChange={e => setEndTime(e.target.value)}*/}
                        {/*       className="w-full border p-2 mb-2"/>*/}
                    </div>
                ) : (
                    // <input type="file" onChange={e => setLink(e.target.value)} className="w-full border p-2 mb-2"/>
                    <div className={"w-full h-full p-4"}>
                        <FileUploader
                            name={"file"}
                            sendResponse={getResponseFromUploader}
                            video
                            serverProcessUrl={"education_video?educationId=asd&lessonId=dsa&mentorId=mmm"}/>
                    </div>
                )}
                <div className={`w-full flex ${type !== "stream" ? "justify-between" : "justify-end"} p-6`}>
                    {type !== 'stream' &&
                        <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                            <Button type={"secondary"} text={"Quiz Ekle"} onClick={() => setIsQuizModalOpen(true)}/>
                        </div>
                    }

                    <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                        <Button type={"secondary"} text={"Ders Ekle"} onClick={handleAddLessonClick}/>
                    </div>
                </div>
                <Popup isOpen={isQuizModalOpen} onClose={() => setIsQuizModalOpen(false)}>
                    <QuizModal key={quizModalKey} onAdd={handleAddQuizClick} onClose={() => setIsQuizModalOpen(false)}/>
                </Popup>
            </div>
        </div>
    );
};