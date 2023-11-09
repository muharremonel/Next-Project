import ChartGraphic from '@/app/presentation/components/ChartGraphic'
import CircleProgressBar from '@/app/presentation/components/CircleProgressBar'
import ExpandableTitle from '@/app/presentation/components/ExpandableTitle'
import LoadingComponent from '@/app/presentation/components/Loading'
import Popup from '@/app/presentation/components/PopUp'
import Table from '@/app/presentation/components/Table'
import EducationCard from '@/app/presentation/components/educationComponents/EducationCard'
import { Education, EnrolledEducations } from '@/interfaces'
import { convertCurriculumToArray, flattenCurriculum, formatDate, withFadeInAnimation } from '@/utils'
import React from 'react'

const AnimatedCircleProgressBar = withFadeInAnimation(CircleProgressBar);
const AnimatedChart = withFadeInAnimation(ChartGraphic);

const columns = [{ header: "Dersin Adı", accessor: "name" }, { header: "Yüklenme Tarihi", accessor: "publishDate" }, { header: "İzlenme Tarihi", accessor: "watchDate" }, { header: "Türü", accessor: "type" }, { header: "İzlenme Türü", accessor: "watchType" }]

const Index = ({ educationData, studentEducation }: { educationData: Education, studentEducation: EnrolledEducations }) => {
  const { category, title } = educationData || {}
  const { completionRate, enrollmentDate, certificate } = studentEducation || {}

  const tableContent = flattenCurriculum(educationData?.curriculum, studentEducation)

  return (educationData && studentEducation) ? (
    <div className='flex flex-col gap-12 py-4'>
      <EducationCard name={title} registrationDate={formatDate(enrollmentDate)} completionRate={completionRate} category={category} certificate={certificate ? 'Var' : 'Yok'} totalTime={0} />
      <div className='flex gap-12 w-full h-full'>
        <div className='flex flex-col h-full cardcontainer gap-12 w-5/12 items-center justify-center'>
          <p className='font-semibold self-start'>Genel Başarı Durumu</p>
          <AnimatedCircleProgressBar progress={completionRate} size={300} strokeWidth={50} circleColor="#EEE" progressColor="#222d68" duration={'1'} />
        </div>
        <div className='flex flex-col cardcontainer gap-12 w-7/12 items-center'>
          <p className='font-semibold self-start'>Platformda Geçirdiği Süre</p>
          <AnimatedChart
            data={[13, 20, 30, 20, 20, 60, 7]}
            labels={['P', 'S', 'Ç', 'P', 'C', 'C', 'P']}
          />
        </div>
      </div>
      <div className='cardcontainer flex flex-col gap-10'>
        <p className='font-semibold self-start text-lg'>Dersleri İzleme Durumu</p>
        <ExpandableTitle data={convertCurriculumToArray(educationData?.curriculum, studentEducation)} />
      </div>
      <div className='cardcontainer flex flex-col gap-10'>
        <p className='font-semibold self-start text-lg'>Dersleri İzleme Durumu</p>
        <Table columns={columns} filteredData={tableContent} dataLength={tableContent?.length} />
      </div>
    </div>
  ) : <Popup noBackground isOpen={true} onClose={() => { }}>
  <LoadingComponent />
</Popup>
}

export default Index