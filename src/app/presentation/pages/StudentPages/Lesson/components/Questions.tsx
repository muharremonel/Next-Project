// QuestionsComponent.tsx
import React from 'react';
import {Button} from "@/app/presentation/components";

interface Props {
    questions: any;
    studentAvatar: string;
    studentName: string;
    teacherAvatar: string;
    teacherName: string;
    lesson: any
    onClickQuestion: any;
    onClickAnswer: any;
    isMentor: string
}

const QuestionsComponent: React.FC<Props> = ({
                                                 questions,
                                                 onClickQuestion,
                                                 isMentor,
                                                 onClickAnswer,
                                                 studentAvatar,
                                                 studentName,
                                                 teacherAvatar,
                                                 teacherName,
                                                 lesson
                                             }) => {
    const [newQuestion, setNewQuestion] = React.useState<string>("");
    const [newAnswer, setNewAnswer] = React.useState<string>("");
    const [localQuestions, setLocalQuestions] = React.useState<any[]>(questions || []);
    const [selectedQuestionId, setSelectedQuestionId] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleAddQuestion = () => {
        onClickQuestion(newQuestion);
        setNewQuestion("");  // Soru gönderildikten sonra newQuestion durumunu sıfırla
    };

    const handleAddAnswer = () => {
        onClickAnswer(newAnswer, selectedQuestionId);
        setNewAnswer("");  // Cevap gönderildikten sonra newAnswer durumunu sıfırla
    };


    const handleAnswerClick = (questionId: string) => {
        setSelectedQuestionId(questionId);

        inputRef.current?.focus();

        inputRef.current?.scrollIntoView({behavior: "smooth"});
    }

    // console.log("local", isMentor)

    return (
        <div className={"flex flex-col gap-8"}>
            <div className={"text-2xl font-bold"}>Soru Cevap</div>

            <div className="space-y-6">

                {questions && questions?.map((question: any, index: number) => (
                    <div key={index} className="flex flex-col">
                        {/* Öğrenci sorusu */}
                        <div className="flex items-start space-x-4">
                            <img src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"}
                                 alt="Öğrenci Avatar"
                                 className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-semibold">{question.askedBy ? question.askedBy : studentName}</p>
                                <p>{question.question ? question.question.questionText : question.questionText}</p>
                                {isMentor === "mentor" &&
                                    <p className="text-blue-500 cursor-pointer"
                                       onClick={() => handleAnswerClick(question.questionId)
                                       }>Yanıtla</p>}
                            </div>
                        </div>

                        {/*Öğretmen cevabı*/}
                        {question.answers &&
                            question.answers.map(
                                (item: any, index: number) =>
                                    (
                                        <div key={index}
                                             className="flex items-start space-x-4 justify-end mt-4">
                                            <div>
                                                <p className="font-semibold text-right">{item.answeredBy}</p>
                                                <p className="text-right">{item.answerText}</p>
                                            </div>
                                            <img src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"}
                                                 alt="Öğretmen Avatar"
                                                 className="w-12 h-12 rounded-full"/>
                                        </div>
                                    )
                            )
                        }
                    </div>
                ))}

                    <div className="flex flex-col items-center space-x-4 mb-4 gap-2">
                        <div className={"flex w-full gap-2"}>
                            <img src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"}
                                 alt="Öğrenci Avatar"
                                 className="w-12 h-12 rounded-full"/>
                            <input
                                ref={inputRef}
                                type="text"
                                value={isMentor === "mentor" ? newAnswer : newQuestion}
                                onChange={(e) => isMentor === "mentor" ? setNewAnswer(e.target.value) : setNewQuestion(e.target.value)}
                                placeholder="Sorunuzu buraya yazın..."
                                className="flex-grow border rounded-md p-2 text-sm md:text-md"
                                style={{flexShrink: 1, maxWidth: 'calc(100% - 3rem)'}}
                            />
                        </div>
                        <div className={"w-full flex justify-end"}>
                            <div className={"w-2/6"}>
                                <Button onClick={() => isMentor === "mentor" ? handleAddAnswer() : handleAddQuestion()}
                                        type={"primary"} text={"Yorum Ekle"}/>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );
}

export default QuestionsComponent;
