import React, {useState} from "react";
import {Lesson as LessonComponent} from "./Lesson";
import {ArrowDown, Edit, Tick, Trash} from "@/svgImports";
import {Lesson, Quiz} from "@/interfaces";
import {Chip} from "@mui/material";
import ResourceModal from "@/app/presentation/pages/MentorPages/Lesson/components/Curriculum/components/ResourcePopup";

interface SectionProps {
    onUpdate: (id: number, section: any) => void;
    onDelete: (sectionId: number) => void;
    id: number;
    sectionData: any;
    onChange: any
    educations:any
}

const Section: React.FC<SectionProps> = ({onUpdate, onChange, onDelete, id, sectionData,educations}) => {
    const [name, setName] = useState(sectionData.name);
    const [items, setItems] = useState(sectionData.items || []);
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    console.log("sectionData",sectionData)
    console.log("educations",educations)
    console.log("items",items)
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleAddLesson = (lesson: Lesson) => {
        const updatedItems = [...items, lesson];
        setItems(updatedItems);
        onUpdate(id, {name, lessons: updatedItems});
    };

    const handleDeleteLesson = (lessonIndex: number) => {
        if (window.confirm("Bu dersi silmek istediğinizden emin misiniz?")) {
            const updatedItems = items.filter((_: any, index: any) => index !== lessonIndex);
            setItems(updatedItems);
            onUpdate(id, {name, lessons: updatedItems});
        }
    };


    const handleDeleteThisSection = () => {
        if (window.confirm("Bu bölümü silmek istediğinizden emin misiniz?")) {
            onDelete(id);
        }
    };


    const handleAddQuizToLastLesson = (quiz: Quiz) => {
        const updatedItems = [...items];
        if (updatedItems.length > 0) {
            const lastLesson = updatedItems[updatedItems.length - 1];
            lastLesson.quiz = quiz;
            setItems(updatedItems);
            onUpdate(id, {name, lessons: updatedItems});
        }
        // Not: Eğer hiç ders yoksa, bu quiz eklenemez.
        // Bu durumu kullanıcıya bildirmek için bir mesaj ya da uyarı gösterebilirsiniz.
    };

    console.log(sectionData)
    return (
        <div className="shadow rounded-xl p-3">
            <div className={"flex justify-between bg-gray-200 w-full p-2 rounded-t-xl"}>
                <div className={"w-full items-center flex h-full"}>
                    <input
                        placeholder="Bölüm ismi"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full p-2 bg-transparent focus:outline-none"
                    />
                </div>

                <div className={"flex gap-4 items-center"}>
                    {showLessonForm ? (
                        <Tick onClick={() => setShowLessonForm(false)}/>
                    ) : (
                        <Edit onClick={() => setShowLessonForm(true)}/>
                    )}
                    <Trash onClick={handleDeleteThisSection}/>
                </div>


            </div>


            <div className={"flex flex-col gap-4"}>
                {showLessonForm && items.map((item: any, index: number) => {
                    // if (item.type === "lesson") {
                    return (
                        <div key={index} className={"bg-primaryGray p-3 rounded-lg"}>
                            <div className={"flex items-center justify-between "}>
                                <div className={"flex gap-1"}>
                                    <div className={"font-bold text-primary"}>
                                        Ders {index + 1}:
                                    </div>
                                    <div>
                                        {item.quiz ? `${item.name} (Quiz)` : item.name}
                                    </div>
                                </div>
                                <div className={"flex items-center gap-4"}>
                                    <div className={"transition-all hover:scale-105 cursor-pointer"}
                                         onClick={openModal}>
                                        <Chip label={"+ Kaynak"}/>
                                    </div>
                                    {/*<div className={"cursor-pointer"}>*/}
                                    {/*    <Edit/>*/}
                                    {/*</div>*/}
                                    {/*<div className={"cursor-pointer"}>*/}
                                    {/*    <ArrowDown/>*/}
                                    {/*</div>*/}
                                    <div className={"cursor-pointer"} onClick={() => handleDeleteLesson(index)}>
                                        <Trash/>
                                    </div>
                                </div>
                            </div>
                            {
                                isModalOpen && (
                                    <ResourceModal data={educations} onChange={onChange} onClose={closeModal} open={isModalOpen}></ResourceModal>
                                )
                            }
                        </div>
                    );
                })
                }
            </div>
            {showLessonForm &&
                <LessonComponent onAddLesson={handleAddLesson} onAddQuiz={handleAddQuizToLastLesson} sectionId={id}/>}

        </div>
    );
};
export default Section;


