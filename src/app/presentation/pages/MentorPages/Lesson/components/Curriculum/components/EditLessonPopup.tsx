import React, { useState } from "react";
import { Close } from "@/svgImports";
import FileUploader from "../../GeneralInformations/components/FileUploader";
import { Button } from "@/app/presentation/components";

interface LessonProps {
  // onUpdate: (id: number, section: any) => void;
  // onDelete: (sectionId: number) => void;
  onClose: () => void;
  editLesson: any;
  // id: number;
  // sectionData: any;
  onChange: any;
  // setLessonType: any;
  // lessonType: any;
  // educations: any
  lessonId:any;
  lessonData:any

}



const AddLessonPopup: React.FC<LessonProps> = ({ onClose, editLesson,lessonData }) => {
  const [lessonName, setLessonName] = useState<string>()
  const [lessonRecord, setLessonRecord] = useState<any>()
  const [liveLessonDate, setLiveLessonDate] = useState<any>()
  const [liveLessonTime, setLiveLessonTime] = useState<any>()
  const [lessonType, setLessonType] = useState<string>()
  const [link, setLink] = useState("");
  const [usefulLink,setUsefulLink] = useState<string>("")
  const [lessonDataToSave,setLessonDataToSave] = useState(lessonData)

  const getResponseFromUploader = (response: any) => {
    setLessonRecord(response?.watchableLink)
  }

  const handleLessonType = (type: any) => {
    setLessonType(type)
    if (type === "record") {
      setLiveLessonDate("")
      setLiveLessonTime("")
    }

    if (type === "stream") {
      setLessonRecord("")
    }
  }

  const handleLesson = (key:any,value:any) => {
    setLessonDataToSave({ ...lessonDataToSave, [key]: value })
  }

  const handleEditLesson = () => {
    console.log("lessonDataToSave edit -->",lessonDataToSave)
    editLesson(lessonDataToSave)
    setLessonName("")
    setLessonRecord("")
    setLiveLessonDate("")
    setLiveLessonTime("")
    setLessonType("")
    setLink("")
    onClose()
  }

  const handleClosePopUp = () => {
    setLessonName("")
    setLessonRecord("")
    setLiveLessonDate("")
    setLiveLessonTime("")
    setLessonType("")
    setLink("")
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl">
        <div className="bg-white border p-8 w-4/5 h-2/3 rounded shadow-lg overflow-y-auto">
          <div className={"flex flex-col justify-between "} >
            <div className="w-full flex justify-between align-center">
              <div>
                <span>Ders Düzenle (ders bilgileri)</span>
              </div>
              <div className="cursor-pointer" onClick={() => handleClosePopUp()}>
                <Close />
              </div>
            </div>
            <br />
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ders Adı
              </label>
              <input onChange={(e) => {
                handleLesson("lessonName",e.target.value)
              }} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" value={lessonDataToSave.lessonName} type="text" placeholder="Ders Adı" />

            </div>
            <br />
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ders Türü
              </label>
              <div className={"flex gap-4"}>
                <div className={"flex gap-1"}>
                  <input type="radio" name={`type-stream`} value="stream" checked={lessonDataToSave.lessonType === "stream"}
                    onChange={(e) => handleLesson("lessonType",e.target.value)} />
                  <div>Canlı</div>
                </div>
                <div className={"flex gap-1"}>
                  <input type="radio" name={`type-record`} value="record" checked={lessonDataToSave.lessonType === "record"}
                    onChange={(e) => handleLesson("lessonType",e.target.value)} />
                  <div>Kayıt</div>
                </div>
              </div>
            </div>
            <br />
            {lessonDataToSave.lessonType === "stream" && <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ders Tarihi
              </label>
              <input
              value={lessonDataToSave.liveLessonDate}
               onChange={(e) => {
                handleLesson("liveLessonDate",new Date(e.target.value))
              }} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" type="date" placeholder="Ders Adı" />
              <br />
              <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
                Ders Saati
              </label>
              <input
              value={lessonDataToSave.liveLessonTime}
              
              onChange={(e) => {
                handleLesson("liveLessonTime",e.target.value)
              }} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" type="time" placeholder="Ders Adı" />

            </div>}
            <br />
            {lessonDataToSave.lessonType === "record" && <div className={"w-full h-full p-4"}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Dosya Ekle
              </label>
              <FileUploader
                name={"file"}
                sendResponse={getResponseFromUploader}
                video
                serverProcessUrl={"education_video?educationId=asd&lessonId=dsa&mentorId=mmm"} />
            </div>}
            <br/>
            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Faydalı Link
              </label>
              <input
              value={lessonDataToSave.usefullLink}
              onChange={(e) => {
                handleLesson("usefullLink",e.target.value)
              }} className="shadow appearance-none border w-full rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="section" type="text" placeholder="Faydalı Link" />

            </div>

              <br />
            <Button type={"orange"} text={"Düzenlemeyi Kaydet"} onClick={() => {
              handleEditLesson()
            }}></Button>

          </div>
        </div>
      </div>
    </>
  )
}
export default AddLessonPopup