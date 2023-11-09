import React, {useState} from 'react';
import {Close, Edit, Tick, Trash} from "@/svgImports";
import {Button} from "@mui/material";

interface QuizModalProps {
    onAdd: (quiz: any) => void;
    onClose: () => void;
}
const QuizModal = ({onClose,onAdd}:QuizModalProps) => {
    const [questions, setQuestions] = useState([
        {title: "", options: [{value: "", isCorrect: false}], hasCorrectAnswer: false, showOnlyQuestion: false}
    ]);

    // const [isModalOpen, setIsModalOpen] = useState(true);  // varsayılan olarak modal açık olarak başlar


    const handleClearState = () => {
        setQuestions([{
            title: "",
            options: [{value: "", isCorrect: false}],
            hasCorrectAnswer: false,
            showOnlyQuestion: false
        }]);
    };

    const handleSaveQuiz = () => {
        const quiz = {
            name: "Quiz" ,
            question: questions
        };
        onAdd(quiz);
        handleClearState(); // State'i temizleyin
        onClose(); // Modalı kapat
    };


    const handleQuestionChange = (questionIndex: number, newText: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].title = newText;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, newValue: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].value = newValue;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map((option, idx) => ({
            ...option,
            isCorrect: idx === optionIndex
        }));
        updatedQuestions[questionIndex].hasCorrectAnswer = true;
        setQuestions(updatedQuestions);
    };

    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        const newOption = {value: "", isCorrect: false};
        updatedQuestions[questionIndex].options.push(newOption);
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            title: "",
            options: [{value: "", isCorrect: false}],
            hasCorrectAnswer: false,
            showOnlyQuestion: false
        }]);
    };


    const getBackgroundColor = (option: any, question: any) => {
        if (option.isCorrect) {
            return 'bg-green-200';
        }
        if (question.hasCorrectAnswer) {
            return 'bg-red-200';
        }
        return 'bg-white';
    };

    const deleteQuestion = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1);
        setQuestions(updatedQuestions);
    };


    const deleteOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };
    const toggleShowOnlyQuestion = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].showOnlyQuestion = !updatedQuestions[questionIndex].showOnlyQuestion;
        setQuestions(updatedQuestions);
    };

    return (
        <div className="p-8 bg-white rounded-lg">
            <h2 className="text-2xl text-primary font-bold mb-6">Quiz Ekle</h2>
            <div
                className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={onClose}
            >
                <Close className="w-6 h-6"/>
            </div>

            {questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl">{qIndex + 1}. Soru</h3>
                        <div className={"flex justify-center items-center gap-2"}>
                            {question.showOnlyQuestion ? (
                                <button
                                    className="p-2 rounded-full transition-all hover:scale-125"
                                    onClick={() => toggleShowOnlyQuestion(qIndex)}
                                >
                                    <Edit className="w-6 h-6"/>
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="p-2 rounded-full transition-all hover:scale-125"
                                        onClick={() => toggleShowOnlyQuestion(qIndex)}
                                    >
                                        <Tick className="w-6 h-6"/>
                                    </button>
                                    <button
                                        className="p-2 rounded-full transition-all hover:scale-125"
                                        onClick={() => deleteQuestion(qIndex)}
                                    >
                                        <Trash className="w-6 h-6"/>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <input
                        className="p-2 border mb-4 w-full"
                        value={question.title}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        placeholder="Soru metni"
                        disabled={question.showOnlyQuestion}
                    />

                    {!question.showOnlyQuestion && question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex justify-between items-center mb-2">
                            <input
                                className={`p-2 border mr-2 flex-grow ${getBackgroundColor(option, question)}`}
                                value={option.value}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                placeholder="Seçenek metni"
                            />

                            <button
                                className="p-2 rounded-full transition-all hover:scale-125"
                                onClick={() => handleCorrectOption(qIndex, oIndex)}
                            >
                                <Tick className="w-6 h-6" style={{color: option.isCorrect ? 'green' : 'gray'}}/>
                            </button>

                            <button
                                className="p-2 ml-2 rounded-full transition-all hover:scale-125"
                                onClick={() => deleteOption(qIndex, oIndex)}
                            >
                                <Trash className="w-6 h-6"/>
                            </button>
                        </div>
                    ))}
                    {!question.showOnlyQuestion && (
                        <button className="mt-2 p-2 bg-gray-200 text-black rounded" onClick={() => addOption(qIndex)}>
                            Seçenek Ekle
                        </button>
                    )}
                </div>
            ))}

            <button className="p-2 bg-gray-300 text-black rounded" onClick={addQuestion}>Soru Ekle</button>

            <div className={"flex justify-between w-full"}>
                <div className={"flex justify-between w-full"}>
                    <Button variant={"outlined"} style={{borderRadius:"20px"}} onClick={onClose}>Vazgeç</Button>
                    <Button variant={"contained"} style={{backgroundColor:"#222D68",borderRadius:"20px"}} onClick={handleSaveQuiz}>Kaydet</Button>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;