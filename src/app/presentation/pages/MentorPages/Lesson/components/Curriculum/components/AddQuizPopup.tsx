import React, { useState } from "react";
import { Close } from "@/svgImports";
import { Button } from "@/app/presentation/components";
import { ArrowDown, Edit, Tick, Trash } from "@/svgImports";
interface QuizProps {
  onClose: () => void;
  addQuiz: any;
  onChange: any;
  saveQuizToLesson:any;
  addQuizToWhichLesson:any;
  section:any;
}



const AddQuizPopup: React.FC<QuizProps> = ({ onClose, addQuiz,saveQuizToLesson,addQuizToWhichLesson }) => {
  const [questionList, setQuestionList] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState({ question: "", id: 0 })
  const [currentAnswers, setCurrentAnswers] = useState<any[]>([])
  const [currentAnswer, setCurrentAnswer] = useState({})
  const [questionCounter, setQuestionCounter] = useState(1)
  const [answerCounter, setAnswerCounter] = useState(1)
  const [isEditModeActive, setIsEditModeActive] = useState(false)
  const [storeEditingQuestionId, setStoreEditingQuestionId] = useState()

  const handleClosePopUp = () => {
    onClose()
  }

  const handleSaveQuiz = () => {
    saveQuizToLesson(questionList,addQuizToWhichLesson.id)
    onClose()
  }

  const addEmptyAnswerToCurrentAnswerList = () => {
    setCurrentAnswers([...currentAnswers, { text: "", isCorrectAnswer: false }])

  }

  const handleAddQuestionToQuestionList = () => {
    setQuestionList([...questionList, { currentQuestion, answers: currentAnswers }])

    setCurrentQuestion({ question: "", id: 0 })
    setCurrentAnswers([])
    setQuestionCounter(questionCounter + 1)
  }

  const handleCurrentQuestionText = (question: any) => {
    setCurrentQuestion({ ...currentQuestion, id: questionCounter, question: question })


  }
  console.log("currentQuestion", currentQuestion)
  console.log("currentAnswers", currentAnswers)
  console.log("questionList", questionList)

  const handleCurrentQuestionAnswers = (value: any, index: any) => {
    const newArray = currentAnswers.map((item: any, i: any) => {
      if (index === i) {
        return { ...item, text: value, id: index };
      } else {
        return item;
      }
    });
    setCurrentAnswers(newArray)
  }

  const handleCorrectAnswer = (index: any) => {
    const newArray = currentAnswers.map((item: any, i: any) => {
      if (index === i) {
        return { ...item, isCorrectAnswer: true, };
      } else {
        return { ...item, isCorrectAnswer: false, };
      }
    });
    setCurrentAnswers(newArray)
  }

  const handleDeleteAnswer = (id: any) => {
    console.log("id", id)
    let newArr = [...currentAnswers]

    newArr = newArr.filter(item => item.id !== id)
    // setCurrentAnswers(newArr)
    console.log("newArr", newArr)
    setCurrentAnswers(newArr)
    return newArr
    // console.log("currentAnswers",currentAnswers)
  }

  const editQuestion = (question: any) => {
    setCurrentQuestion(question.currentQuestion)
    setCurrentAnswers(question.answers)
    setStoreEditingQuestionId(question.currentQuestion.id)
    setIsEditModeActive(true)
  }

  const handleEdittedQuestion = () => {
    const newArray = questionList.map((item: any, i: any) => {
      if (item.currentQuestion.id === storeEditingQuestionId) {
        return { ...item, currentQuestion: currentQuestion, answers: currentAnswers };
      } else {
        return item;
      }
    });
    setQuestionList(newArray)
    setCurrentQuestion({ question: "", id: 0 })
    setCurrentAnswers([])
    setIsEditModeActive(false)
  }


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl">
        <div className="bg-white border p-8 w-4/5 h-2/3 rounded shadow-lg overflow-y-auto">
          <div className={"flex flex-col justify-between "} >
            <div className="w-full flex justify-between align-center">
              <div>
                <span>Quiz Ekle (Quiz bilgileri)</span>
              </div>
              <div className="cursor-pointer" onClick={() => handleClosePopUp()}>
                <Close />
              </div>
            </div>
            <br />
            <div className="flex">
              <div className="w-3/4 border-r pr-5">

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Soru
                </label>
                <input onChange={(e) => {
                  handleCurrentQuestionText(e.target.value)
                }} value={currentQuestion.question} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" type="text" placeholder={"Soru"} />
                <div className="mt-2 pl-3">
                  {currentAnswers && currentAnswers.length > 0 ? (
                    currentAnswers.map((answer, index) => {
                      return (
                        <div className="mt-2" key={index}>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            {index + 1}. Cevap
                          </label>
                          <div className="flex flex-row gap-3 align-center item-center">
                            <input onChange={(e) => {
                              handleCurrentQuestionAnswers(e.target.value, index)
                            }} value={answer.text} className={answer.isCorrectAnswer ? "bg-emerald-200 shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" : "bg-red-200 shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} id="section" type="text" placeholder={(index + 1) + "." + " Cevap"} />
                            <div className="cursor-pointer">
                              <Tick onClick={() => handleCorrectAnswer(index)} />
                            </div>
                            <div className="cursor-pointer">
                              <Trash onClick={() => setCurrentAnswers(handleDeleteAnswer(answer.id))} />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p>Henüz bu soru için bir cevap eklemediniz</p>
                  )}
                </div>
                <br />

                <div>
                  <Button type={"primary"} text={"Cevap Ekle +"} onClick={() => {
                    addEmptyAnswerToCurrentAnswerList()
                  }}></Button>
                </div>
                <br />
                {isEditModeActive ? (<div>
                  <Button type={"orange"} text={"Soruyu Düzenle"} onClick={() => {
                    handleEdittedQuestion()
                  }}></Button>
                </div>) : (
                  <div>
                    <Button type={"primary"} text={"Soruyu Kaydet +"} onClick={() => {
                      handleAddQuestionToQuestionList()
                    }}></Button>
                  </div>
                )}
                <br />
                <div>
                  <Button type={"primary"} text={"Quizi Kaydet"} onClick={() => {
                    handleSaveQuiz()
                  }}></Button>
                </div>
              </div>
              <div className="w-1/4">
                {/* sağ taraf */}
                {questionList && questionList.length > 0 ? (
                  questionList.map((question, index) => {
                    return (
                      <>
                        <div className="pl-2 mt-2 cursor-pointer hover:text-yellow-500" onClick={() => editQuestion(question)}>
                          <div className="bg-grey-100 hover:bg-grey-300 round">
                          <p>
                            {index + 1}. Soru
                          </p>
                          </div>

                        </div>

                      </>
                    )
                  })
                ) : (
                  <p>Henüz bir soru eklemediniz</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default AddQuizPopup