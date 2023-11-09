import { educationService, studentService, getUserToken, mentorService } from '@/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../_app';
import { Search } from '@/svgImports';
import { Button } from '@/app/presentation/components';
import toast from 'react-hot-toast';
import QuizResultModal from '../modal/quizResultModal'

const Index = () => {
  const [quizInfo, setQuizInfo] = useState<any>()
  const [educationInfo, setEducationInfo] = useState<any>()
  const [studentAnswers, setStudentAnswers] = useState<any>([])
  const [studentId, setStudentId] = useState<any>()
  const [modalOpen, setModalOpen] = useState(false)
  const [quizResult, setQuizResult] = useState<any>()
  const router = useRouter()
  const api = useApi()
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { eduId, section, lesson } = router.query

  useEffect(() => {
    const joinAndFetchData = async () => {
      if (router.isReady) {
        const token = await getUserToken();
        const response = await api.getAuth()
        console.log(response)

        if (response?.status === "success") {
          if (response.data.user.type === "student") {
            let studentId = response?.data?.student?._id
            setStudentId(studentId)
            // router.push(`/profilim/${studentId}`)
          }
          if (response.data.user.type === "mentor") {
            toast.error("mentor quize giremez")
          }
        } else {
          if (window.confirm("Öğrenci profili bulunamadı!")) {
            router.push("/anasayfa")
          }
        }

        const education = await api.educationService.getEducation!(eduId);
        console.log("education -> ", education)
        if (education.status === "success") {
          let sectionFind = education.data.curriculum.sections.find((item: any, index: any) => item.id == section)
          if (sectionFind) {
            console.log("sectionFind", sectionFind)
            let lessonFind = sectionFind.lessons.find((item: any) => item.id == lesson)
            console.log("lessonFind", lessonFind)
            if (lessonFind) {
              let quiz = lessonFind.quiz
              console.log("quiz", quiz)
              setQuizInfo(quiz)
              let emptyAnswers = quiz.map((quizItem: any) => {
                return { questionId: quizItem.currentQuestion.id - 1, answerId: null }
              })
              setStudentAnswers(emptyAnswers)
            }
          }
        }
      }
    };

    const handleRouteChange = async () => {
      if (!window.confirm("Emin misiniz? Bu sayfadan ayrılırsanız, Quiz'e girmemiş olacaksınız.")) {
        router.events.emit('routeChangeError');
        throw 'Route change aborted.';
      } else {
        // await leaveStream();
        router.push("/ders/" + eduId)
      }
    };

    const intervalId = setInterval(async () => {
      // const token = await getUserToken();
      // await api.studentService.heartBeat!(roomId, token);
    }, 5000);

    joinAndFetchData();

    // router.events.on('routeChangeStart', handleRouteChange);

    // return () => {
    //   clearInterval(intervalId);
    //   router.events.off('routeChangeStart', handleRouteChange);
    // };

  }, [api, eduId, router, setEducationInfo]);

  const handleAnswers = (questionIndex: any, selectionIndex: any) => {
    console.log(questionIndex, selectionIndex)

    const newState = studentAnswers.map((obj: any) => {
      if (obj.questionId === questionIndex) {
        return { ...obj, answerId: selectionIndex };
      } else {
        return obj;
      }
    });

    setStudentAnswers(newState)
    console.log("studentAnswers", studentAnswers)

  }

  const completeQuiz = async (studentAnswers: any) => {
    let quizDataToSend = {
      studentId: studentId,
      educationId: eduId,
      lessonId: lesson,
      sectionId: section,
      studentAnswers: studentAnswers
    }

    let completedQuiz = await studentService.completeQuiz!(quizDataToSend)

    if (completedQuiz) {
      toast.success("quiz tamamlandı")
      setQuizResult(completedQuiz.data)
      openModal()
    }

    // if (completedQuiz.status === "error") {
    //   toast.error(completedQuiz.message)
    // }

    console.log("completedQuiz", completedQuiz)
  }
  return (
    <>
      {quizInfo && quizInfo.length > 0 ? quizInfo.map((quizItem: any, questionIndex: any,index:any) => {
        console.log("quizItem", quizItem)
        return <div className='mt-5' key={index}>
          <div className=" bg-white border border-gray-200 rounded-lg shadow w-100">
            <div id='blue-header' className='bg-primary text-white w-100'>
              <div className="p-6 flex gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29056 1.66663C7.42069 1.66663 6.55934 1.83796 5.75569 2.17084C4.95204 2.50373 4.22182 2.99164 3.60673 3.60673C2.99164 4.22182 2.50373 4.95204 2.17084 5.75569C1.83796 6.55934 1.66663 7.42069 1.66663 8.29056C1.66663 9.16042 1.83796 10.0218 2.17084 10.8254C2.50373 11.6291 2.99164 12.3593 3.60673 12.9744C4.22182 13.5895 4.95204 14.0774 5.75569 14.4103C6.55934 14.7432 7.42069 14.9145 8.29056 14.9145C9.16042 14.9145 10.0218 14.7432 10.8254 14.4103C11.431 14.1594 11.9948 13.8206 12.4991 13.4057L17.239 18.1455C17.4893 18.3959 17.8952 18.3959 18.1455 18.1455C18.3959 17.8952 18.3959 17.4893 18.1455 17.239L13.4057 12.4991C13.8206 11.9948 14.1594 11.431 14.4103 10.8254C14.7432 10.0218 14.9145 9.16042 14.9145 8.29056C14.9145 7.42069 14.7432 6.55934 14.4103 5.75569C14.0774 4.95204 13.5895 4.22182 12.9744 3.60673C12.3593 2.99164 11.6291 2.50373 10.8254 2.17084C10.0218 1.83796 9.16042 1.66663 8.29056 1.66663ZM6.24631 3.3553C6.89442 3.08685 7.58905 2.94868 8.29056 2.94868C8.99206 2.94868 9.6867 3.08685 10.3348 3.3553C10.9829 3.62376 11.5718 4.01724 12.0678 4.51328C12.5639 5.00932 12.9574 5.5982 13.2258 6.24631C13.4943 6.89441 13.6324 7.58905 13.6324 8.29056C13.6324 8.99206 13.4943 9.6867 13.2258 10.3348C12.9574 10.9829 12.5639 11.5718 12.0678 12.0678C11.5718 12.5639 10.9829 12.9574 10.3348 13.2258C9.6867 13.4943 8.99206 13.6324 8.29056 13.6324C7.58905 13.6324 6.89441 13.4943 6.24631 13.2258C5.5982 12.9574 5.00932 12.5639 4.51328 12.0678C4.01724 11.5718 3.62376 10.9829 3.3553 10.3348C3.08685 9.6867 2.94868 8.99206 2.94868 8.29056C2.94868 7.58905 3.08685 6.89442 3.3553 6.24631C3.62376 5.5982 4.01724 5.00932 4.51328 4.51328C5.00932 4.01724 5.5982 3.62376 6.24631 3.3553Z" fill="#ffffff" />
                </svg>
                <span>Soru {questionIndex + 1}</span>
              </div>
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-dark-500">{quizItem.currentQuestion.question}</h5>
              <div className="flex flex-col">
                {
                  quizItem.answers && quizItem.answers.length > 0 ? (
                    quizItem.answers.map((selection: any, selectionIndex: any) => {
                      return <>
                        <label>
                          <input type="radio" value={selectionIndex} name={questionIndex.toString()} id={selectionIndex} onChange={(e: any) => {
                            handleAnswers(questionIndex, selectionIndex)
                          }} />
                          <span className='pl-2'>{selection.text}</span>
                        </label>
                        <label></label>
                      </>
                    })
                  ) : (<div>Cevaplar alınamadı</div>)
                }

              </div>
            </div>

          </div>
        </div>
      }) : (<div className='flex flex-row justify-center text-center'>
        Quiz bilgisi alınamamıştır.
      </div>)}

      <div className="buttons flex flex-rows mt-5 mb-5 gap-5">
        {quizInfo && quizInfo.length > 0 ?
          <>
            <Button type={"secondary"} text={"vazgeç"} onClick={() => { }} />
            <Button type={"orange"} text={"Quizi Tamamla"} onClick={() => { completeQuiz(studentAnswers) }} />
          </> :
          <>
            <Button type={"primary"} text={"Geri Dön"} onClick={() => { }} />
          </>
        }

      </div>

      {modalOpen && <QuizResultModal onClose={closeModal} quizResult={quizResult} section={section} lesson={lesson} eduId={eduId} />}
    </>
  );
};

export default Index;