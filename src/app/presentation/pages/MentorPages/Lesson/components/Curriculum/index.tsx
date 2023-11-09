import React, { useState } from "react";
import SectionComponent from "./components/Section";
import { Button } from "@/app/presentation/components";
import AddLessonPopup from "./components/AddLessonPopup";
import AddQuizPopup from "./components/AddQuizPopup";
import EditQuizPopup from "./components/EditQuizPopup";
import EditLessonPopup from "./components/EditLessonPopup";


type CurriculumProps = {
    educations: any
    onChange: any
    onNext: (index: number) => void
    onPrev: (index: number) => void
}
export const Curriculum = ({ educations, onChange, onNext, onPrev }: CurriculumProps) => {
    const [sections, setSections] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [idCounter, setIdCounter] = useState<any>(0)
    const [currentSectionStateData, setCurrentSectionStateData] = useState()
    const [currentSectionName, setCurrentSectionName] = useState("")
    const [currentLessons, setCurrentLessons] = useState<any>([])
    const [isQuizPopupOpen, setIsQuizPopupOpen] = useState(false)
    const [isEditModeActive, setIsEditModeActive] = useState(false)
    const [willEditId, setWillEditId] = useState()
    const [addQuizToWhichLesson, setAddQuizToWhichLesson] = useState()
    const [editQuizToWhichLesson, setEditQuizToWhichLesson] = useState()
    const [editWhichLesson, setEditWhichLesson] = useState()
    const [lessonIdCounter, setLessonIdCounter] = useState(0)
    const [isQuizEditPopupOpen, setIsQuizEditPopupOpen] = useState(false)
    const [isLessonEditPopupOpen, setIsLessonEditPopupOpen] = useState(false)
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openQuizPopup = () => setIsQuizPopupOpen(true)
    const closeQuizPopup = () => setIsQuizPopupOpen(false)
    const openEditQuizPopup = () => setIsQuizEditPopupOpen(true)
    const CloseEditQuizPopup = () => setIsQuizEditPopupOpen(false)
    const openEditLessonPopup = () => setIsLessonEditPopupOpen(true)
    const closeEditLessonPopup = () => setIsLessonEditPopupOpen(false)

    const handleSaveSection = () => {
        setSections(prev => [...prev, { id: idCounter, name: currentSectionName, lessons: currentLessons }]);
        setIdCounter(idCounter + 1)
        setCurrentLessons([])
        setCurrentSectionName("")
    };
    const handleDeleteSection = (sectionId: number) => {
        const updatedSections = sections.filter((_, idx) => idx !== sectionId);
        setSections(updatedSections);
    };

    const handleUpdateSection = (id: number, section: any) => {
        setSections(prev => prev.map((s, idx) => idx === id ? section : s));
    };

    const handleSave = () => {
        onChange({ curriculum: { sections } });
    };

    const handleAddLesson = (lessonData: any) => {
        setCurrentLessons((currentLesson: any) => [...currentLesson, lessonData])
        setLessonIdCounter(lessonIdCounter + 1)
    }
    const handleAddQuiz = (quizData: any) => {
        
    }

    const handleSectionName = (value: any) => {
        setCurrentSectionName(value)
    }

    const activateSectionEdit = (section: any) => {
        setCurrentLessons(section.lessons)
        setCurrentSectionName(section.name)
        setIsEditModeActive(true)
    }


    const handleEdit = (id: any) => {
        let edittedContent = sections.map((section: any) => {
            if (section.id === id) {
                return { ...section, name: currentSectionName, lessons: currentLessons }
            } else {
                return section
            }
        })
        setSections(edittedContent)
    }

    const handleAddQuizToWhichLesson = (lesson: any) => {
        setAddQuizToWhichLesson(lesson)
        openQuizPopup()
    }

    const handleEditQuizToWhichLesson = (lesson: any) => {
        setEditQuizToWhichLesson(lesson)
        openEditQuizPopup()
    }

    const handleSaveQuizToLesson = (quiz: any, lessonId: any) => {
        let addQuiz = currentLessons.map((lesson: any) => {
            if (lesson.id === lessonId) {
                return { ...lesson, quiz: quiz }
            } else {
                return lesson
            }
        })
        setCurrentLessons(addQuiz)
    }

    const handleWhichLessonEdit = (lesson: any) => {
        setEditWhichLesson(lesson)
        openEditLessonPopup()
    }

    const handleSaveEdittedLesson = (editData: any, lessonId: any) => {
        let editLesson = currentLessons.map((lesson: any) => {
            if (lesson.id === editData.id) {
                return { ...lesson = editData }
            } else {
                return lesson
            }
        })
        setCurrentLessons(editLesson)
    }

    const handleWhichLessonDelete = (lessonId: any) => {
        let deleteLesson = currentLessons.filter((lesson: any) => lesson.id !== lessonId)
        setCurrentLessons(deleteLesson)
    }

    const handleWhichSectionDelete = (sectionId: any) => {
        let deleteSection = sections.filter((section: any) => section.id !== sectionId)
        setSections(deleteSection)
    }


    return (
        <>
            <div className="p-8 bg-white shadow-2xl flex flex-col gap-2">
                <div className="flex gap-4">
                    <div className="w-2/3 border-r p-3">
                        {/* güncel eklenecek olan ders bilgileri burada görüntülenecek */}
                        <div className="flex flex-col">

                            <div className="mt-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Bölüm
                                </label>
                                <input onChange={(e) => {
                                    handleSectionName(e.target.value)
                                }} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" value={currentSectionName} type="text" placeholder="Bölüm Adı" />
                            </div>
                            <br />
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Dersler
                                </label>
                            </div>

                            {currentLessons && currentLessons.length > 0 ? (
                                currentLessons.map((lesson: any, index: any) => {
                                    return <div className="mt-2 w-full p-4  bg-white border border-gray-200 hover:bg-slate-200 rounded-lg shadow" key={index}>
                                        <div className="flex flex-row justify-between">
                                            <div >
                                                <span className="font-bold">{index + 1}. Ders:</span> {lesson.lessonName}
                                            </div>
                                            <div className="flex gap-4">
                                                {lesson.quiz ? (
                                                    <span className="text-cyan-500 hover:text-yellow-500 cursor-pointer" onClick={() => handleEditQuizToWhichLesson(lesson)}>
                                                        Quiz Düzenle
                                                    </span>
                                                ) : (
                                                    <span className="hover:text-yellow-500 cursor-pointer" onClick={() => handleAddQuizToWhichLesson(lesson)}>
                                                        Quiz ekle +
                                                    </span>
                                                )}
                                                <span className="hover:text-yellow-500 cursor-pointer" onClick={() => handleWhichLessonEdit(lesson)} >
                                                    Düzenle
                                                </span>
                                                <span className="hover:text-red-500 cursor-pointer" onClick={() => handleWhichLessonDelete(lesson.id)} >
                                                    sil
                                                </span>

                                            </div>
                                        </div>

                                    </div>
                                })
                            ) : (
                                <p className="mt-2">Henüz bu bölüm için ders girilmedi</p>
                            )}


                            {isEditModeActive ? (
                                <div className="w-[30%] mt-5">

                                    <Button type={"orange"} text={"Ders Ekle +"} onClick={() => {
                                        openModal()
                                    }}></Button>
                                    <br />
                                    <Button type={"orange"} text={"Düzenlemeyi Kaydet"} onClick={() => {
                                        setIsEditModeActive(false)
                                        setCurrentLessons([])
                                        setCurrentSectionName("")
                                        handleEdit(willEditId)
                                    }}></Button>
                                    <br />
                                    <Button type={"red"} text={"Bölümü SİL"} onClick={() => {
                                        setIsEditModeActive(false)
                                        setCurrentLessons([])
                                        setCurrentSectionName("")
                                        handleWhichSectionDelete(willEditId)
                                    }}></Button>
                                </div>
                            ) : (
                                <div className="w-[30%] mt-5">
                                    <Button type={"primary"} text={"Ders Ekle +"} onClick={() => {
                                        openModal()
                                    }}></Button>
                                </div>
                            )}
                            {
                                !isEditModeActive && <>
                                    {/* <div className="w-[30%] mt-5">
                                        <Button type={"primary"} text={"Quiz Ekle +"} onClick={() => {
                                            openQuizPopup()
                                        }}></Button>
                                    </div> */}

                                    <div className="w-[30%] mt-5">
                                        <Button type={"orange"} text={"Bölümü Kaydet"} onClick={() => {
                                            console.log(sections)
                                            handleSaveSection()
                                        }}></Button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        {/* Eklenmiş Böllüm ve dersler burada görüntülenecek sağ taraf */}
                        {sections && sections.length > 0 ? (
                            sections.map((section,index) => {
                                console.log("section", section)
                                return <div key={index}>
                                    <div className="hover:bg-slate-200 border p-2 rounded cursor-pointer pt-2" id={"section-"+section.id} onClick={() => {
                                        activateSectionEdit(section)
                                        setWillEditId(section.id)
                                    }}>
                                        &#9679; {section.name}
                                        <div className="pl-5">
                                            {section.lessons.map((lesson: any,indexx:any) => {
                                                return <p key={indexx} className="pl-2">&#8594; {lesson.lessonName}</p>
                                            })}
                                        </div>
                                    </div>

                                </div>
                            })
                        ) : (<p> Henüz Bölüm Eklenmedi</p>)}
                    </div>
                </div>

                <div className={"flex justify-center p-4 md:justify-between"}>
                    <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                        <Button onClick={(() => onPrev(1))} type={"secondary"} text={"Geri Git"}/>
                    </div>
                    <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                        <Button onClick={() =>{
                            handleSave()
                            onNext(3)}} type={"primary"} text={"Devam Et"}/>
                    </div>
                </div>
            </div>

            {isModalOpen && <AddLessonPopup onChange={onChange} onClose={closeModal} lessonId={lessonIdCounter} addLesson={handleAddLesson} />}
            {isQuizPopupOpen && <AddQuizPopup onChange={onChange} onClose={closeQuizPopup} addQuiz={handleAddQuiz} section={currentSectionStateData} addQuizToWhichLesson={addQuizToWhichLesson} saveQuizToLesson={handleSaveQuizToLesson} />}
            {isQuizEditPopupOpen && <EditQuizPopup onChange={onChange} onClose={CloseEditQuizPopup} addQuiz={handleAddQuiz} editQuizData={editQuizToWhichLesson} section={currentSectionStateData} editQuizToWhichLesson={addQuizToWhichLesson} saveQuizToLesson={handleSaveQuizToLesson} />}
            {isLessonEditPopupOpen && <EditLessonPopup onChange={onChange} onClose={closeEditLessonPopup} lessonData={editWhichLesson} lessonId={lessonIdCounter} editLesson={handleSaveEdittedLesson} />}
        </>
    )
};
