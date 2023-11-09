import React, { useState } from 'react';
import { Close, Edit, Tick, Trash } from "@/svgImports";
// import { Button } from "@mui/material";
import BasariliSonucImg from '@/app/presentation/assets/basariliSonuc.png'
import BasarisizSonucImg from '@/app/presentation/assets/basarisizSonuc.png'
import Image from 'next/image';
import { Button } from '@/app/presentation/components';
import { useRouter } from "next/router";
interface QuizModalProps {
  onClose: () => void;
  quizResult: any | undefined;
  section: any;
  lesson: any;
  eduId: any;
}

const QuizResultModal: React.FC<QuizModalProps> = ({ onClose, quizResult, section, lesson, eduId }) => {
  const router = useRouter();
  console.log(quizResult)

  const turnBackToLesson = () => {
    router.push("/kayitli-ders-odasi/" + eduId + "/?section=" + section + "&lesson=" + lesson)

  }
  return (
  
    quizResult && quizResult.score && <>
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl backdrop-blur-sm bg-black/50">
      <div className="bg-white border p-8 w-4/5 h-2/3 rounded shadow-lg overflow-y-auto">
        <div className="flex flex-col justify-center align-center items-center">
          <div>
            <p className='text-4xl uppercase'>
              Quİz Sonucu
            </p>
          </div>
          <br />
          <div className="quiz-result-img">
            {quizResult && quizResult.score > 70 ? <Image src={BasariliSonucImg} alt="Default" className='rounded-xl' /> : <Image src={BasarisizSonucImg} alt="Default" className='rounded-xl' />}
          </div>
          <br />
          <div className='quiz-result'>
            {quizResult && quizResult.score > 70 ? <span>Alınan Puan: {quizResult.score?.toFixed(2)}</span> : <span className='text-3xl font-bold text-red-500'>Alınan Puan: {quizResult.score?.toFixed(2)}</span>}
          </div>
          <br />
          <div className='w-[200px]'>
            <div className='flex flex-row justify-between'>
              <span>Doğru Cevap:</span> <span className='text-emerald-500 font-bold'>{quizResult.correctAnswerCount}</span>
            </div>
            <div className='flex flex-row justify-between'>
              <span>Boş Cevap:</span> <span className=''>{quizResult.emptyAnswerCount}</span>
            </div>
            <div className='flex flex-row justify-between'>
              <span>Yanlış Cevap:</span> <span className='text-red-600 font-bold'>{quizResult.falseAnswerCount}</span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className='flex flex-row gap-5'>

          {quizResult.score < 70 && <Button type={"secondary"} text={"Quizi Tekrarla"} onClick={() => { window.location.reload() }} />}
          <Button type={"orange"} text={"Derse Dön"} onClick={() => { turnBackToLesson() }} />
        </div>
      </div>

    </div>

  </>
  
  )
}

export default QuizResultModal